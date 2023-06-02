import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../sagaApi/user";
import { AxiosError } from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as UserType,
    loading: true,
    error: undefined as AxiosError | undefined,
  },
  reducers: {
    fetchUserStart(state, _: PayloadAction<number>) {
      state.loading = true;
      state.error = undefined;
    },
    fetchUserSuccess(state, action: PayloadAction<UserType>) {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure(state, action: PayloadAction<AxiosError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
