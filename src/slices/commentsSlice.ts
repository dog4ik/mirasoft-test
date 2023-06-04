import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FakeCommentType } from "../sagaApi/root";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [] as FakeCommentType[],
    loading: false,
    error: undefined as AxiosError | undefined,
  },
  reducers: {
    fetchCommentsStart(state, _: PayloadAction<number>) {
      state.loading = true;
      state.error = undefined;
    },
    fetchCommentsSuccess(state, action: PayloadAction<FakeCommentType[]>) {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure(state, action: PayloadAction<AxiosError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
