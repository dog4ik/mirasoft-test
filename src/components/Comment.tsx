import { Card, Container, Row } from "react-bootstrap";

type CommentProps = {
  email: string;
  body: string;
};

const Comment = ({ email, body }: CommentProps) => {
  return (
    <Container className="mb-3">
      <Card className="p-3">
        <Row>
          <Card.Title>{email}</Card.Title>
        </Row>
        <Row>
          <Card.Text>{body}</Card.Text>
        </Row>
      </Card>
    </Container>
  );
};

export default Comment;
