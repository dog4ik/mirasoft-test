import { Pagination as Pages } from "react-bootstrap";

type PaginationProps = {
  currentPage: number;
  onPageClick: (page: number) => void;
  maxPages: number;
};

const Pagination = ({
  currentPage,
  maxPages,
  onPageClick,
}: PaginationProps) => {
  let range = [...Array(5)]
    .map((_, i) => {
      const pageNumber = currentPage - 2 + i;
      if (pageNumber > 0 && pageNumber <= maxPages) {
        return pageNumber;
      }
      return;
    })
    .filter((pageNumber) => pageNumber);

  return (
    <Pages className="mx-auto">
      <Pages.First onClick={() => onPageClick(1)} />
      {currentPage !== 1 && (
        <Pages.Prev onClick={() => onPageClick(currentPage - 1)} />
      )}
      {range.map((item) => (
        <Pages.Item
          active={item === currentPage}
          key={item}
          onClick={() => onPageClick(item!)}
        >
          {item}
        </Pages.Item>
      ))}

      {currentPage !== maxPages && (
        <Pages.Next onClick={() => onPageClick(currentPage + 1)} />
      )}
      <Pages.Last onClick={() => onPageClick(maxPages)} />
    </Pages>
  );
};

export default Pagination;
