import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { DataGrid } from "@material-ui/data-grid";
import { PersonAdd, DeleteOutline } from "@material-ui/icons";
import "./users.css";
import { rows } from "../../userData";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import UserForm from "../../components/forms/UserForm";


const useStyles = makeStyles({
  root: {
    "& .super-app.disabled": {
      color: "red",
    },
    "& .super-app.active": {
      color: "green",
    },
    "& .size-input": {
        width: "150%",
    },
  },
});

export default function UsersList() {
  const [data, setData] = useState(rows);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      headerClassName: "super-app-theme--header",
      width: 140,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          disabled: params.value === "Disabled",
          active: params.value === "Active",
        });
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
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
        <div className="btn" onClick={handleOpen}>
          <PersonAdd />
          <button className="btn-primary">Add User</button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <!-- The Modal --> */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <UserForm />
            </div>
          </div>
        </div>
      </Modal>
      <div style={{ height: 600, width: "95%" }} className={classes.root}>
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
