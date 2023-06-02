import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
import { FakeUserType, fakeApi } from "./root";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../slices/userSlice";

async function fetchUser(id: number) {
  await new Promise((res) => setTimeout(res, 1000));
  const user = await fakeApi.get<FakeUserType>(`/users/${id}`);
  return user.data;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

function* fetchUsersSaga(action: {
  payload: number;
}): Generator<any, void, FakeUserType> {
  try {
    const response = yield call(fetchUser, action.payload);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    if (error instanceof AxiosError) yield put(fetchUserFailure(error));
    else throw Error("This should never happen");
  }
}

function* watchFetchUser() {
  yield takeEvery(fetchUserStart, fetchUsersSaga);
}

export type UserType = UnwrapPromise<ReturnType<typeof fetchUser>>;

export default watchFetchUser;
