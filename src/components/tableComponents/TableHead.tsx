import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type TableHeadProps = {
  columns: any;
  sortColumn: any;
  sortDirection: "asc" | "desc";
  setAreAllChecked: (arg0: boolean) => void;
  setSortColumn: (arg0: any) => void;
  setSortDirection: (
    arg0: "asc" | "desc" | ((d: "asc" | "desc") => "asc" | "desc")
  ) => void;
};

export default function TableHead({
  columns,
  sortColumn,
  sortDirection,
  setAreAllChecked,
  setSortColumn,
  setSortDirection,
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
        }) => (
          <th
            key={column.accessor as string}
            onClick={() => {
              if (sortColumn === column.accessor) {
                setSortDirection((d: string) => (d === "asc" ? "desc" : "asc"));
              } else {
                setSortColumn(column.accessor);
                setSortDirection("asc");
              }
            }}
          >
            {column.header}
            <IoMdArrowDropdown size={18} />
          </th>
        )
      )}
    </tr>
  );
}
