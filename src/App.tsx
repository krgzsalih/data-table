import { useEffect, useState } from "react";
import "./App.scss";
import Table, { TableColumn } from "./components/Table";

// data type
type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

// TableColumn type. Did it like 'header, accessor' because we want to access data which accessor is equal to what we want
const columns: TableColumn<IUser>[] = [
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
  // define state for keeping the data
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // fetch data from the api
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:6161/users"); // sending HTTP request to http://localhost:6161/users
        const data = await response.json(); // getting the data from the response and assign it to variable
        setUsers(data); // set the data to the state
      } catch (error) {
        // if there is an error, log it to the console
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="App">
      {/* Table component which takes 4 parameter/props */}
      <Table
        data={users}
        pageSize={pageSize}
        columns={columns}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default App;
