import "./style.scss";

type TableData = {
  data: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  }[];
};

export default function Table(data: TableData) {
  return (
    <div className="main_table_div">
      <table className="main_table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item) => {
            return (
              <tr key={item.id} className="row_table">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
