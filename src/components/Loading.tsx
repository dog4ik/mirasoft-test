import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="mx-auto h-100 container-fluid my-auto d-flex align-items-center justify-content-center col-lg-5">
      <Spinner className="auto" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
