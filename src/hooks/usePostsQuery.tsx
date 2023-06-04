import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchPostsStart } from "../slices/postsSlice";

export default function usePostsQuery() {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, []);

  return posts;
}
