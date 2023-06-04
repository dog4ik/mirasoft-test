import { useDispatch } from "react-redux";
import { useState } from "react";
import { findPosts, sortPosts } from "../slices/postsSlice";
import { Stack } from "react-bootstrap";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { fetchCommentsStart } from "../slices/commentsSlice";
import usePostsQuery from "../hooks/usePostsQuery";
import ErrorComponent from "../components/ErrorComponent";

const PAGE_CAPACITY = 10;

const Posts = () => {
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const [commentsExpandedId, setCommentsExpandedId] = useState<number>();
  const searchPage = search.get("page");
  const currentPage = searchPage ? Math.max(1, +searchPage) : 1;
  const navigate = useNavigate();
  const postsQuery = usePostsQuery();

  function handleSearch(query: string) {
    setCommentsExpandedId(undefined);
    navigate("/");
    dispatch(findPosts(query));
  }

  function handleSort(dir: "asc" | "desc" | "none") {
    setCommentsExpandedId(undefined);
    dispatch(sortPosts(dir));
  }

  function handleCommentsExpand(id: number) {
    if (id === commentsExpandedId) {
      setCommentsExpandedId(undefined);
      return;
    }
    dispatch(fetchCommentsStart(id));
    setCommentsExpandedId(id);
  }

  if (postsQuery.isLoading) return <Loading />;
  if (postsQuery.isError)
    return <ErrorComponent code={postsQuery.error?.response?.status} />;

  const paginatedPosts = postsQuery.filteredPosts.filter(
    (_, idx) =>
      !(
        idx + 1 <= currentPage * PAGE_CAPACITY - PAGE_CAPACITY ||
        idx + 1 >= currentPage * PAGE_CAPACITY
      )
  );

  return (
    <>
      <Stack gap={4} className="col-lg-9 mx-auto">
        <Search onSearch={handleSearch} />
        <Sort onSort={handleSort} />
        {paginatedPosts.map((post) => {
          return (
            <Post
              title={post.title}
              onCommentsExpand={handleCommentsExpand}
              areCommentsExpanded={post.id === commentsExpandedId}
              userId={post.userId}
              postId={post.id}
              body={post.body}
              key={post.id}
              nickname={post.userName}
            />
          );
        })}
        <Pagination
          currentPage={currentPage}
          maxPages={Math.ceil(postsQuery.filteredPosts.length / PAGE_CAPACITY)}
          onPageClick={(page) => navigate(`/?page=${page}`)}
        />
      </Stack>
    </>
  );
};

export default Posts;
