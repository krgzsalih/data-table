import { useState } from "react";
import "./App.scss";
import Table, { TableColumn } from "./components/Table";
import data from "./components/constants/api.json"; // getting data to show in table

// data type
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

// TableColumn type. Did it like 'header, accessor' because we want to access data which accessor is equal to what we want
const columns: TableColumn<User>[] = [
  { header: "Id", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Website", accessor: "website" },
];

function App() {
  // keeping the number of how many data will show on the page
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="App">
      {/* Table component which takes 4 parameter/props */}
      <Table
        data={data}
        pageSize={pageSize}
        columns={columns}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default App;
