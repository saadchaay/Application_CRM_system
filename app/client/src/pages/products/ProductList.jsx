import "./styles/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../userData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

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
export default function ProductList() {
  const [data, setData] = useState(productRows);
  const classes = useStyles();
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <Link to={"/category/" + params.row.id}>
              <button className="categoryBtn">{params.row.category}</button>
            </Link>
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 150 },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 120,
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
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Link to={"/new-product"}>
        <button className="addProductButton">Add new product</button>
      </Link>
      <div className={classes.root} style={{ height: 600, width: "95%" }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          height={600}
        />
      </div>
    </div>
  );
}
