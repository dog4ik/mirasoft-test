import { Card, Container } from "react-bootstrap";
import { FiGithub, FiSend, FiLinkedin } from "react-icons/fi";

const AboutMe = () => {
  return (
    <Container className="mt-4 mb-4 p-3 d-flex justify-content-center">
      <Card className="p-4">
        <Card.Body className="p-5 d-flex flex-column justify-content-center gap-3 align-items-center">
          <Card.Title className="name fs-1 mt-3">Vadim Gerasimov</Card.Title>
          <Card.Title className="idd">@dog4ik</Card.Title>
          <Card.Text className="mt-3">Spaghetti code CEO.</Card.Text>
          <div className="d-flex align-items-center gap-5">
            <a href="https://github.com/dog4ik" target="_blank">
              <FiGithub size={40} />
            </a>
            <a href="https://t.me/dog4ik" target="_blank">
              <FiSend size={40} />
            </a>
            <a
              href="https://www.linkedin.com/in/vadim-gerasimov-b96655266/"
              target="_blank"
            >
              <FiLinkedin size={40} />
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutMe;
