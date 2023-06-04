import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Card, Col, Container, Row } from "react-bootstrap";
import Post from "../components/Post";
import { fetchCommentsStart } from "../slices/commentsSlice";
import useUserQuery from "../hooks/useUserQuery";

const Profile = () => {
  const dispatch = useDispatch();
  const [expandedPost, setExpandedPost] = useState<number>();
  const { userId: strUserId } = useParams();
  const userId = +strUserId!;

  if (isNaN(userId) || +userId <= 0) {
    return <div>User not found</div>;
  }

  function handleExpand(id: number) {
    if (id === expandedPost) {
      setExpandedPost(undefined);
      return;
    }
    setExpandedPost(id);
    dispatch(fetchCommentsStart(id));
  }

  const userQuery = useUserQuery(userId);

  if (userQuery.isLoading) return <Loading />;
  const { email, username, name, phone, address, posts } = userQuery.user;

  return (
    <section className="h-100 col-lg-9 mx-auto">
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Link to={"/"} className="fs-4 my-4 nav-link">
            Back
          </Link>
          <Col className="col-lg-9 mb-4 mb-lg-0">
            <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
              <Row>
                <Col
                  className="col-md-4 gradient-custom text-center"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://placehold.co/120"
                    alt="Avatar"
                    className="img-fluid rounded my-5"
                    style={{ width: "80px" }}
                  />
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>{username}</Card.Text>
                  <i className="far fa-edit mb-5"></i>
                </Col>
                <Col className="col-md-8">
                  <Card.Body className="p-4">
                    <Card.Title>Information</Card.Title>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col className="col-6 mb-3">
                        <Card.Title>Email</Card.Title>
                        <Card.Text className="text-muted">{email}</Card.Text>
                      </Col>
                      <Col className="col-6 mb-3">
                        <Card.Title>Phone</Card.Title>
                        <Card.Text className="text-muted">{phone}</Card.Text>
                      </Col>
                    </Row>
                    <Card.Title>Address</Card.Title>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col className="col-6 mb-3">
                        <Card.Title>City</Card.Title>
                        <Card.Text className="text-muted">
                          {address.city}
                        </Card.Text>
                      </Col>
                      <Col className="col-6 mb-3">
                        <Card.Title>Street</Card.Title>
                        <Card.Text className="text-muted">
                          {address.street}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>

          <div className="text-center my-4">
            <span className="fs-4">User posts:</span>
          </div>
          {posts.map((post) => (
            <Post
              body={post.body}
              title={post.title}
              key={post.id}
              postId={post.id}
              nickname={username}
              userId={post.userId}
              areCommentsExpanded={expandedPost === post.id}
              onCommentsExpand={handleExpand}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
