import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FakeCommentType } from "../sagaApi/root";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [] as FakeCommentType[],
    isLoading: false,
    isError: false,
    error: undefined as AxiosError | undefined,
  },
  reducers: {
    fetchCommentsStart(state, _: PayloadAction<number>) {
      state.isLoading = true;
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
