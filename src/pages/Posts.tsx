import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchPostsStart, findPosts, sortPosts } from "../slices/postsSlice";
import { Stack } from "react-bootstrap";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { fetchCommentsStart } from "../slices/commentsSlice";

const PAGE_CAPACITY = 10;

const Posts = () => {
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const [commentsExpandedId, setCommentsExpandedId] = useState<number>();
  const page = search.get("page");
  const currentPage = page ? Math.max(1, +page) : 1;

  const navigate = useNavigate();
  const { filteredPosts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const paginatedPosts = filteredPosts.filter(
    (_, idx) =>
      !(
        idx + 1 <= currentPage * PAGE_CAPACITY - PAGE_CAPACITY ||
        idx + 1 >= currentPage * PAGE_CAPACITY
      )
  );

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

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

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
          maxPages={Math.ceil(filteredPosts.length / PAGE_CAPACITY)}
          onPageClick={(page) => navigate(`/?page=${page}`)}
        />
      </Stack>
    </>
  );
};

export default Posts;
