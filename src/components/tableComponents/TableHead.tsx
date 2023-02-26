import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillEyeInvisible } from "react-icons/ai";

type TableHeadProps = {
  columns: any;
  sortColumn: any;
  sortDirection: "asc" | "desc";
  hiddenColumns: string[];
  setAreAllChecked: (arg0: boolean) => void;
  setSortColumn: (arg0: any) => void;
  setSortDirection: (
    arg0: "asc" | "desc" | ((d: "asc" | "desc") => "asc" | "desc")
  ) => void;
  setHiddenColumns: (arg0: string[]) => void;
};

export default function TableHead({
  columns,
  sortColumn,
  sortDirection,
  hiddenColumns,
  setAreAllChecked,
  setSortColumn,
  setSortDirection,
  setHiddenColumns,
}: TableHeadProps) {
  return (
    <tr>
      <th>
        <input
          type="checkbox"
          onChange={(e) => setAreAllChecked(e.target.checked)}
          style={{}}
        ></input>
      </th>
      {/* Map through the columns array and return a table header for each visible column */}
      {columns.map(
        (column: {
          accessor: string;
          header:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) =>
          // Check if the column is hidden
          !hiddenColumns.includes(column.accessor) && (
            <th
              key={column.accessor as string}
              // Add a click event listener to the column header
              onClick={() => {
                if (sortColumn === column.accessor) {
                  // If the column is already sorted, reverse the sorting order
                  setSortDirection((d: string) =>
                    d === "asc" ? "desc" : "asc"
                  );
                } else {
                  // If the column is not already sorted, sort the column in ascending order
                  setSortColumn(column.accessor);
                  setSortDirection("asc");
                }
              }}
            >
              {/* Render the column header and add an arrow icon for indicating the sorting direction */}
              <span>{column.header}</span>
              <IoMdArrowDropdown size={18} />
              {/* Add a button for hiding the column */}
              <button
                onClick={() =>
                  setHiddenColumns([...hiddenColumns, column.accessor])
                }
                className="hide_button"
              >
                <AiFillEyeInvisible size={18} />
              </button>
            </th>
          )
      )}
    </tr>
  );
}
