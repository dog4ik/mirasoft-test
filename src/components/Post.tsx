import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { FakeCommentType } from "../sagaApi/root";
import ErrorComponent from "./ErrorComponent";

type PostProps = {
  body: string;
  title: string;
  userId: string;
  postId: number;
  nickname: string;
  onCommentsExpand: (id: number) => void;
  areCommentsExpanded: boolean;
};

type CommentsSectionProps = {
  comments?: FakeCommentType[];
  commentsExpanded: boolean;
  commentsLoading: boolean;
  commentsError: boolean;
};

const CommentsSection = ({
  comments,
  commentsError,
  commentsLoading,
  commentsExpanded,
}: CommentsSectionProps) => {
  if (commentsError) return <ErrorComponent />;
  if (commentsLoading) return;
  if (commentsExpanded && comments)
    return (
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} body={comment.body} email={comment.email} />
        ))}
      </div>
    );
  return null;
};

const Post = ({
  onCommentsExpand,
  areCommentsExpanded,
  body,
  title,
  userId,
  postId,
  nickname,
}: PostProps) => {
  const {
    comments,
    isLoading: commentsLoading,
    isError,
  } = useSelector((state: RootState) => state.comments);
  const [localOpen, setLocalOpen] = useState(areCommentsExpanded);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  function handleToggle() {
    if (commentsLoading) return;
    if (areCommentsExpanded) {
      setLocalOpen(false);
      timeoutRef.current = setTimeout(() => {
        onCommentsExpand(postId);
      }, 500);
    } else {
      setLocalOpen(true);
      clearTimeout(timeoutRef.current);
      onCommentsExpand(postId);
    }
  }
  useEffect(() => {
    setLocalOpen(areCommentsExpanded);
  }, [areCommentsExpanded]);

  return (
    <Card>
      <Row className="py-3">
        <Col className="col-xs-12 d-flex justify-content-center flex-column align-items-center text-center col-sm-5 col-md-5 col-lg-4">
          <div>
            <Link to={`/profile/${userId}`}>
              <img
                className="img-fluid rounded"
                src="https://placehold.co/120"
                alt="Avatar"
              />
            </Link>
          </div>
          <div className="mt-3">
            <Link to={`/profile/${userId}`}>
              <strong>{nickname}</strong>
            </Link>
          </div>
        </Col>
        <Col className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
          <h3 className="md-heading">
            <p>{title}</p>
          </h3>
          <p>{body}</p>
        </Col>
      </Row>
      <button
        className="rounded m-3 p-1"
        onClick={() => {
          handleToggle();
        }}
      >
        {localOpen
          ? commentsLoading
            ? "Loading..."
            : "Hide comments"
          : "Show comments"}
      </button>
      <div
        className={`animate-grid ${
          localOpen && !commentsLoading ? "animate-grid-active" : ""
        }`}
      >
        <CommentsSection
          comments={comments}
          commentsExpanded={areCommentsExpanded}
          commentsLoading={commentsLoading}
          commentsError={isError}
        />
      </div>
    </Card>
  );
};

export default Post;
