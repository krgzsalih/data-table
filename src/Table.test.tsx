import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./components/Table";

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
};

const data = [{ name: "John", location: "New York" }];
const columns: TableColumn<typeof data[0]>[] = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Location",
    accessor: "location",
  },
];
const setPageSize = jest.fn();
test("renders table component", () => {
  render(<Table data={data} columns={columns} setPageSize={setPageSize} />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();

  const headers = screen.getAllByRole("columnheader");
  expect(headers.length).toBe(3);
});

it("should render the table with pagination", () => {
  render(
    <Table
      data={data}
      columns={columns}
      pageSize={2}
      setPageSize={setPageSize}
    />
  );
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
});
