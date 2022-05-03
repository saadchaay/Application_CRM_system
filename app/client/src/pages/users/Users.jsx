import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { PersonAdd } from "@material-ui/icons";
import "./users.css";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First name", width: 170 },
  { field: "lastName", headerName: "Last name", width: 170 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <div className="con">
      <div className="title-btn">
        <h2>Users Management</h2>
        <div className="btn">
            <PersonAdd />
            <button className="btn-primary">Add User</button>
        </div>
      </div>
      <div style={{ height: 600, width: "95%" }}>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      </div>
    </div>
  );
}
