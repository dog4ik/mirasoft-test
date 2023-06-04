import { Card, Container } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";

type ErrorPropsType = {
  code?: number;
  customMessage?: string;
};

const ErrorComponent = ({ code, customMessage }: ErrorPropsType) => {
  let errorMessage;
  switch (code) {
    case 404:
      errorMessage = "Not found";
      break;
    default:
      errorMessage = "Something went wrong";
      break;
  }
  if (customMessage) {
    errorMessage = customMessage;
  }
  return (
    <Container className="mx-auto h-100 container-fluid my-auto d-flex align-items-center justify-content-center col-lg-5">
      <Card className="px-4 py-3">
        <Card.Title className="mx-auto">
          <FiAlertTriangle size={40} />
        </Card.Title>
        <Card.Body>{errorMessage}</Card.Body>
      </Card>
    </Container>
  );
};

export default ErrorComponent;
