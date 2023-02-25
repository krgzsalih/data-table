import { useState } from "react";
import "./App.scss";
import Table, { TableColumn } from "./components/Table";
import data from "./components/constants/api.json";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

const columns: TableColumn<User>[] = [
  { header: "Id", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Website", accessor: "website" },
];

function App() {
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="App">
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
