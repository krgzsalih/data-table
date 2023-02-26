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
          !hiddenColumns.includes(column.accessor) && (
            <th
              key={column.accessor as string}
              onClick={() => {
                if (sortColumn === column.accessor) {
                  setSortDirection((d: string) =>
                    d === "asc" ? "desc" : "asc"
                  );
                } else {
                  setSortColumn(column.accessor);
                  setSortDirection("asc");
                }
              }}
            >
              <span>{column.header}</span>
              <IoMdArrowDropdown size={18} />
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
