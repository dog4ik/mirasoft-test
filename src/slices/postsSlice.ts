import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostsType } from "../sagaApi/posts";
import { AxiosError } from "axios";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as PostsType,
    filteredPosts: [] as PostsType,
    loading: true,
    error: undefined as AxiosError | undefined,
  },
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchPostsSuccess(state, action: PayloadAction<PostsType>) {
      state.loading = false;
      state.posts = action.payload;
      state.filteredPosts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<AxiosError>) {
      state.loading = false;
      state.error = action.payload;
    },
    findPosts(state, action: PayloadAction<string>) {
      state.filteredPosts =
        state.posts.filter((post) =>
          post.title
            .trim()
            .toLowerCase()
            .includes(action.payload.trim().toLowerCase())
        ) ?? [];
    },
    sortPosts(state, action: PayloadAction<"asc" | "desc" | "none">) {
      switch (action.payload) {
        case "asc":
          state.filteredPosts.sort();
          break;
        case "desc":
          state.filteredPosts.sort().reverse();
          break;
        case "none":
          state.filteredPosts = state.posts;
          break;
      }
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  sortPosts,
  findPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
