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
  const maxVisiblePages = 3;
  const pageOffset = Math.floor(maxVisiblePages / 2);
  const startPage = Math.max(page - pageOffset, 0);
  const endPage = Math.min(startPage + maxVisiblePages - 1, pageCount - 1);

  let visiblePages = [];
  if (pageCount <= maxVisiblePages) {
    visiblePages = pageNumbers;
  } else {
    if (startPage > 0) {
      visiblePages.push("...");
    }

    visiblePages = pageNumbers.slice(startPage, endPage + 1);

    if (endPage < pageCount - 1) {
      visiblePages.push(-1);
      visiblePages.push(...Array.from({ length: 2 }, (_, i) => endPage + i));
    }
    // if (endPage < pageCount - 2) {
    //   visiblePages.push(-1);
    // }
  }

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
      {visiblePages.map((pageNumber, index) => (
        <button
          disabled={pageNumber === -1}
          key={index}
          className={
            page === pageNumber
              ? "pagination_button active"
              : "pagination_button"
          }
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber === -1 ? "..." : pageNumber + 1}
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
