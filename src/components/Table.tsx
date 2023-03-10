import React, { useMemo, useState } from "react";
import "./style.scss";
import TableRow from "./tableComponents/TableRow";
import TableHead from "./tableComponents/TableHead";
import Pagination from "./tableComponents/Pagination";
import Input from "./tableComponents/Input";
import Selectbox from "./tableComponents/Selectbox";
import { AiFillEye } from "react-icons/ai";

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
  setPageSize: (n: number) => void;
};

export default function Table<T>({
  data,
  pageSize = 10,
  columns,
  setPageSize,
}: TableData<T>) {
  const [page, setPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [areAllChecked, setAreAllChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<object[]>([]);
  const [searchedData, setSearchedData] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  // Memorize the filtered data and waiting any change. If there any, it is going to filter data
  // with coming from search input
  const filteredData = React.useMemo(() => {
    if (!searchedData) return data;
    return data.filter((item: any) => {
      return Object.keys(item)
        .map((key) => String(item[key]).toLowerCase())
        .some((value) => value.includes(searchedData.toLowerCase()));
    });
  }, [data, searchedData]);

  // Sorting data based on selected column and direction
  const sortedData = React.useMemo(() => {
    if (sortColumn == null) return filteredData;
    const sorted = [...filteredData].sort((a, b) =>
      a[sortColumn] < b[sortColumn] ? -1 : 1
    );
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination based on selected page and page size
  const pagedData = React.useMemo(() => {
    const startIndex = page * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [page, pageSize, sortedData]);

  // Calculating page count and number for pagination
  const pageCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  // it is going to create
  // page numbers with coming from pageCount
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < pageCount; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [pageCount]);

  return (
    <div className="main_div">
      <div className="component_header">
        <Input setSearchedData={setSearchedData} />
        {/* Do not show pagesize selectbox if there is no data */}
        {filteredData.length !== 0 && <Selectbox setPageSize={setPageSize} />}
        {/* Do not show pagesize Pagination component if there is no data */}
        {filteredData.length !== 0 && (
          // Pagination component that display the pagination buttons
          <Pagination
            data={data.length}
            pagedData={pagedData}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            pageNumbers={pageNumbers}
          />
        )}
      </div>
      {/* If hiddenColumns array got any variable, show component which holds hidden columns names */}
      {hiddenColumns.length > 0 && (
        <div className="hidden_buttons">
          <span>Hidden columns (select to show):</span>
          {hiddenColumns.map((item) => {
            // This checks whether the current item is hidden or not.
            const isHidden = hiddenColumns.includes(item);
            return (
              <p>
                <label htmlFor="hidden_checkbox">
                  <AiFillEye size={18} />
                </label>
                {/* When the checkbox is changed, it calls the setHiddenColumns function with a callback that either removes the current item from the prevState array if it was previously hidden, 
                or adds it to the prevState array */}
                <input
                  name="hidden_checkbox"
                  id="hidden_checkbox"
                  type="checkbox"
                  checked={!isHidden}
                  onChange={() => {
                    setHiddenColumns((prevState) => {
                      if (isHidden) {
                        return prevState.filter((col) => col !== item);
                      } else {
                        return [...prevState, item];
                      }
                    });
                  }}
                />
                {item}
              </p>
            );
          })}
        </div>
      )}
      <div className="table_container">
        <table className="main_table">
          <thead>
            <TableHead
              hiddenColumns={hiddenColumns}
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              setHiddenColumns={setHiddenColumns}
              setSortColumn={setSortColumn}
              setAreAllChecked={setAreAllChecked}
              setSortDirection={setSortDirection}
            />
          </thead>
          <tbody style={{ position: "relative" }}>
            {/* If filteredData got any values, then show it in component. Otherwise show info text */}
            {filteredData.length !== 0 ? (
              pagedData.map((item, index) => {
                return (
                  <TableRow
                    hiddenColumns={hiddenColumns}
                    setHiddenColumns={setHiddenColumns}
                    key={index}
                    index={index}
                    item={item}
                    areAllChecked={areAllChecked}
                    columns={columns}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })
            ) : (
              <tr className="no_data">There is no data to show!</tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="component_header">
        <div></div>
        {filteredData.length !== 0 && (
          <Pagination
            data={data.length}
            pagedData={pagedData}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            pageNumbers={pageNumbers}
          />
        )}
      </div>
    </div>
  );
}
