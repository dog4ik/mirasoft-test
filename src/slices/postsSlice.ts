import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostsType } from "../sagaApi/posts";
import { AxiosError } from "axios";

type PostType = PostsType[number];
type postsStateType =
  | {
      posts: PostsType;
      filteredPosts: PostsType;
      isLoading: false;
      isError: false;
      error: undefined;
    }
  | {
      posts: undefined;
      filteredPosts: undefined;
      isLoading: true;
      isError: false;
      error: undefined;
    }
  | {
      posts: undefined;
      filteredPosts: undefined;
      isLoading: false;
      isError: true;
      error: AxiosError;
    };

function sortTitle(a: PostType, b: PostType) {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: undefined,
    filteredPosts: undefined,
    isLoading: true,
    isError: false,
    error: undefined,
  } as postsStateType,
  reducers: {
    fetchPostsStart(state) {
      state.isLoading = true;
      state.error = undefined;
      state.isError = false;
    },
    fetchPostsSuccess(state, action: PayloadAction<PostsType>) {
      state.isLoading = false;
      state.posts = action.payload;
      state.filteredPosts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<AxiosError>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isError = false;
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
          state.filteredPosts.sort(sortTitle);
          break;
        case "desc":
          state.filteredPosts.sort(sortTitle).reverse();
          break;
        case "none":
          const ids = state.filteredPosts.map((item) => item.id);
          state.filteredPosts = state.posts.filter((post) =>
            ids.includes(post.id)
          );
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
