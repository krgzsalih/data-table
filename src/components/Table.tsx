import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import TableRow from "./tableComponents/TableRow";
import TableHead from "./tableComponents/TableHead";
import Pagination from "./tableComponents/Pagination";

export type TableColumn<T> = {
  [x: string]: any;
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode | null | undefined;
};

type TableData<T> = {
  data: T[];
  pageSize?: number;
  columns: TableColumn<T>[];
};

export default function Table<T>({
  data,
  pageSize = 10,
  columns,
}: TableData<T>) {
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [areAllChecked, setAreAllChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<object[]>([]);

  const sortedData = React.useMemo(() => {
    if (sortColumn == null) return data;
    const sorted = [...data].sort((a, b) =>
      a[sortColumn] < b[sortColumn] ? -1 : 1
    );
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [data, sortColumn, sortDirection]);

  const pagedData = React.useMemo(() => {
    const startIndex = page * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [page, pageSize, sortedData]);

  const pageCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < pageCount; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [pageCount]);

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return (
    <div className="main_div">
      <Pagination
        data={data.length}
        pagedData={pagedData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        pageNumbers={pageNumbers}
      />
      <table className="main_table">
        <thead>
          <TableHead
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            setSortColumn={setSortColumn}
            setAreAllChecked={setAreAllChecked}
            setSortDirection={setSortDirection}
          />
        </thead>
        <tbody>
          {pagedData.map((item, index) => {
            return (
              <TableRow
                key={index}
                index={index}
                item={item}
                areAllChecked={areAllChecked}
                columns={columns}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        data={data.length}
        pagedData={pagedData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}
