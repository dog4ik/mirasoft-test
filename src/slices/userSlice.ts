import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../sagaApi/user";
import { AxiosError } from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as UserType,
    isLoading: true,
    error: undefined as AxiosError | undefined,
    isError: false,
  },
  reducers: {
    fetchUserStart(state, _: PayloadAction<number>) {
      state.isLoading = true;
      state.error = undefined;
      state.isError = false;
    },
    fetchUserSuccess(state, action: PayloadAction<UserType>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    fetchUserFailure(state, action: PayloadAction<AxiosError>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
