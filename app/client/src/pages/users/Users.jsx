import React, {useState, useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { PersonAdd, DeleteOutline } from "@material-ui/icons";
import "./users.css";
import { rows } from "../../userData";
import { Link } from "react-router-dom";




export default function DataTable() {
    const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created on",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

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
          rowsPerPageOptions={[1]}
        />
      </div>
    </div>
  );
}
