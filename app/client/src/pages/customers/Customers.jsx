import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { rows } from "../../userData";
import { Link } from "react-router-dom";
import "./styles/customer.css";


export default function UsersList() {
  const [data, setData] = useState(rows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 190,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 145,
    },
    {
      field: "address",
      headerName: "Address",
      width: 190,
    },
    {
      field: "createdAt",
      headerName: "Created on",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/customer-edit/" + params.row.id}>
              <button className="customerEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="customerDelete"
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
        <h2>Customers Management</h2>
      </div>

      

      <div style={{ height: 600, width: "95%" }} >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[1]}
          height={600}
        />
      </div>
    </div>
  );
}
