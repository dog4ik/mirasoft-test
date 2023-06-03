import { Form, InputGroup } from "react-bootstrap";

type SearchProps = {
  onSearch: (query: string) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  return (
    <InputGroup className="mx-auto">
      <Form.Control
        placeholder="Query"
        onChange={(e) => onSearch(e.currentTarget.value)}
        type="search"
        id="form1"
        className="form-control"
      />
    </InputGroup>
  );
};

export default Search;
