import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type PaginationProps = {
  data: number;
  pagedData: any[];
  page: number;
  setPage: (arg0: number | ((p: number) => number)) => void;
  pageNumbers: number[];
  pageCount: number;
};

export default function Pagination({
  data,
  pagedData,
  page,
  setPage,
  pageNumbers,
  pageCount,
}: PaginationProps) {
  return (
    <div className="pagination">
      <span>{`Showing ${pagedData[0].id} - ${
        pagedData[pagedData.length - 1].id
      } of ${data}`}</span>
      <button
        disabled={page === 0}
        onClick={() => setPage(0)}
        className="previous_next_buttons"
      >
        <RxDoubleArrowLeft size={13} />
      </button>
      <button
        disabled={page === 0}
        onClick={() => setPage((p: number) => p - 1)}
        className="previous_next_buttons"
      >
        <MdArrowBackIosNew size={13} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            page === pageNumber
              ? "pagination_button active"
              : "pagination_button"
          }
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        disabled={page === pageCount - 1}
        onClick={() => setPage((p: number) => p + 1)}
        className="previous_next_buttons"
      >
        <MdArrowForwardIos size={13} />
      </button>
      <button
        disabled={page === pageCount - 1}
        onClick={() => setPage(pageCount - 1)}
        className="previous_next_buttons"
      >
        <RxDoubleArrowRight size={13} />
      </button>
    </div>
  );
}
