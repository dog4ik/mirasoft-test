import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FakeCommentType } from "../sagaApi/root";

type commentsStateType =
  | {
      comments: FakeCommentType[];
      isLoading: false;
      isError: false;
      error: undefined;
    }
  | {
      comments: undefined;
      isLoading: true;
      isError: false;
      error: undefined;
    }
  | {
      comments: undefined;
      isLoading: false;
      isError: false;
      error: undefined;
    }
  | {
      comments: undefined;
      isLoading: false;
      isError: true;
      error: AxiosError;
    };
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: undefined,
    isLoading: false,
    isError: false,
    error: undefined,
  } as commentsStateType,
  reducers: {
    fetchCommentsStart(state, _: PayloadAction<number>) {
      state.isLoading = true;
      state.comments = undefined;
      state.error = undefined;
      state.isError = false;
    },
    fetchCommentsSuccess(state, action: PayloadAction<FakeCommentType[]>) {
      state.isLoading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure(state, action: PayloadAction<AxiosError>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
