// Importing necessary icons from react-icons library
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

// Defining the PaginationProps type for the component props
type PaginationProps = {
  data: number; // Total number of data items
  pagedData: any[]; // Data items for the current page
  page: number; // The current page number
  setPage: (arg0: number | ((p: number) => number)) => void; // Function to set the current
  pageNumbers: number[]; // Array of page numbers to display
  pageCount: number; // Total number of pages
};

export default function Pagination({
  data,
  pagedData,
  page,
  setPage,
  pageNumbers,
  pageCount,
}: PaginationProps) {
  const maxVisiblePages = 3; // Max number of visible pages
  const pageOffset = Math.floor(maxVisiblePages / 2); // How many pages to show before and after the current page
  const startPage = Math.max(page - pageOffset, 0); // Start page number of the visible pages
  const endPage = Math.min(startPage + maxVisiblePages - 1, pageCount - 1); // End page number of the visible pages

  let visiblePages = [];
  // If there are less pages than the maximum number of visible pages, display all pages
  if (pageCount <= maxVisiblePages) {
    visiblePages = pageNumbers;
  } else {
    // If there are more pages than the maximum number of visible pages, display only the visible pages
    visiblePages = pageNumbers.slice(startPage, endPage + 1);

    // If the last visible page is not the last page, add a separator and the last two pages
    if (endPage < pageCount - 1) {
      visiblePages.push(-1);
      visiblePages.push(...Array.from({ length: 2 }, (_, i) => endPage + i));
    }
  }

  return (
    <div className="pagination">
      <span>{`Showing ${pagedData[0].id} - ${
        pagedData[pagedData.length - 1].id
      } of ${data}`}</span>
      <div className="pagination_buttons">
        {/* It goes to '0 (zero)' page and when at the that page, button will be disabled to prevent any errors */}
        <button disabled={page === 0} onClick={() => setPage(0)}>
          <RxDoubleArrowLeft size={13} />
        </button>
        {/* It goes to the previous page and when at the first page, button will be disabled to prevent any errors */}
        <button
          disabled={page === 0}
          onClick={() => setPage((p: number) => p - 1)}
        >
          <MdArrowBackIosNew size={13} />
        </button>
        {/* It displays the visible pages */}
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
        {/* It goes to the next page and when at the last page, button will be disabled to prevent any errors */}
        <button
          disabled={page === pageCount - 1}
          onClick={() => setPage((p: number) => p + 1)}
        >
          <MdArrowForwardIos size={13} />
        </button>
        {/* It goes to the last page and when at the that page, button will be disabled to prevent any errors */}
        <button
          disabled={page === pageCount - 1}
          onClick={() => setPage(pageCount - 1)}
        >
          <RxDoubleArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
