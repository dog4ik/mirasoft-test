import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import { FakePostType, FakeUserType, fakeApi } from "./root";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../slices/userSlice";

async function fetchUser(id: number) {
  const user = await fakeApi
    .get<FakeUserType>(`/users/${id}`)
    .then((res) => res.data);
  const userPosts = await fakeApi
    .get<FakePostType[]>(`/users/${user.id}/posts`)
    .then((res) => res.data);
  return { ...user, posts: userPosts };
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

function* fetchUsersSaga(action: {
  payload: number;
}): Generator<any, void, UserType> {
  try {
    const response = yield call(fetchUser, action.payload);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    if (error instanceof AxiosError) yield put(fetchUserFailure(error));
    else throw Error("This should never happen");
  }
}

function* watchFetchUser() {
  yield takeLatest(fetchUserStart, fetchUsersSaga);
}

export type UserType = UnwrapPromise<ReturnType<typeof fetchUser>>;

export default watchFetchUser;
