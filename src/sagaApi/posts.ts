import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosError } from "axios";
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from "../slices/postsSlice";
import { FakePostType, FakeUserType } from "./root";

const fakeApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

async function fetchPosts() {
  await new Promise((res) => setTimeout(res, 1000));
  const posts = await fakeApi.get<FakePostType[]>("/posts");
  const userMap: Record<string, FakeUserType> = {};
  const result = [];
  for (let i = 0; i < posts.data.length; i++) {
    const post = posts.data[i];
    if (!userMap[post.userId]) {
      const user = await fakeApi
        .get<FakeUserType>(`users/${post.userId}`)
        .then((res) => res.data);
      userMap[post.userId] = user;
    }
    const user = userMap[post.userId];
    result.push({ ...post, userName: user.username, userEmail: user.email });
  }
  return result;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

function* fetchPostsSaga(): Generator<any, void, PostsType> {
  try {
    const response = yield call(fetchPosts);
    yield put(fetchPostsSuccess(response));
  } catch (error) {
    if (error instanceof AxiosError) yield put(fetchPostsFailure(error));
    else throw Error("This should never happen");
  }
}

function* watchFetchPosts() {
  yield takeLatest(fetchPostsStart.type, fetchPostsSaga);
}

export type PostsType = UnwrapPromise<ReturnType<typeof fetchPosts>>;

export default watchFetchPosts;
