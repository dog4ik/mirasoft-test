import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import { FakeCommentType, fakeApi } from "./root";
import {
  fetchCommentsFailure,
  fetchCommentsSuccess,
  fetchCommentsStart,
} from "../slices/commentsSlice";

async function fetchComments(id: number) {
  console.log("fetching comments");

  await new Promise((res) => setTimeout(res, 1000));
  const comments = await fakeApi.get<FakeCommentType[]>(
    `/posts/${id}/comments`
  );

  return comments.data;
}

function* fetchCommentsSaga(action: {
  payload: number;
}): Generator<any, void, FakeCommentType[]> {
  try {
    const response = yield call(fetchComments, action.payload);
    yield put(fetchCommentsSuccess(response));
  } catch (error) {
    if (error instanceof AxiosError) yield put(fetchCommentsFailure(error));
    else throw Error("This should never happen");
  }
}

function* watchFetchComments() {
  yield takeLatest(fetchCommentsStart, fetchCommentsSaga);
}

export default watchFetchComments;
