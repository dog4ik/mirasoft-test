import { all } from "redux-saga/effects";
import watchFetchPosts from "./posts";
import axios from "axios";
import watchFetchUser from "./user";
import watchFetchComments from "./comments";

export type FakePostType = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

export type FakeCommentType = {
  postId: string;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type FakeUserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fakeApi = axios.create({
  baseURL: BASE_URL,
});
export const fakeApiNoDelay = axios.create({
  baseURL: BASE_URL,
});

fakeApi.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, 500);
  });
});

export default function* rootSaga() {
  yield all([watchFetchPosts(), watchFetchUser(), watchFetchComments()]);
}
