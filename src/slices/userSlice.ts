import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../sagaApi/user";
import { AxiosError } from "axios";

type userStateType =
  | {
      user: UserType;
      isLoading: false;
      isError: false;
      error: undefined;
    }
  | {
      user: undefined;
      isLoading: true;
      isError: false;
      error: undefined;
    }
  | {
      user: undefined;
      isLoading: false;
      isError: true;
      error: AxiosError;
    };

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    isLoading: true,
    error: undefined,
    isError: false,
  } as userStateType,
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
