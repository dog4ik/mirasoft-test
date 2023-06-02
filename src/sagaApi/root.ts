import { all } from "redux-saga/effects";
import axios from "axios";
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

export const fakeApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default function* rootSaga() {
  yield all([watchFetchPosts()]);
}
