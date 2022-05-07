import "./styles/new-product.css";
import { Publish } from "@material-ui/icons";
import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Select from "@material-ui/core/Select";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import colors from "../../properties/colors";

const colors = [
  {
    label: "Red",
    value: "#F44336",
  },
  {
    label: "Pink",
    value: "#E91E63",
  },
  {
    label: "Purple",
    value: "#9C27B0",
  },
  {
    label: "Deep Purple",
    value: "#673AB7",
  },
  {
    label: "Indigo",
    value: "#3F51B5",
  },
];
export default function NewProduct() {
  // const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];

  const [valueSize, setValueSize] = React.useState([]);
  const [valueColor, setValueColor] = React.useState([]);
  const [imgPreview, setImgPreview] = useState(
    "https://via.placeholder.com/150"
  );
  const [error, setError] = useState(false);
  const handleOnchange = (val) => {
    setValueSize(val);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgPreview) {
      setError(false);
      console.log("success");
    } else {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductFormSide leftSide">
          <div className="addProductGroup">
            <div className="addProductItem">
              <label>Name</label>
              <input type="text" placeholder="Product name" />
            </div>
            <div className="addProductItem">
              <label>Category</label>
              <select name="category" id="category">
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className="addProductGroup description">
            <div className="addProductItem">
              <label>Description</label>
              <textarea placeholder="Description" />
            </div>
            <div className="addProductItem">
              <label>Stock</label>
              <input type="text" placeholder="Stock" />
              <div style={{ margin: "10px" }}></div>
              <label>Price</label>
              <input type="text" placeholder="Price" />
            </div>
          </div>
          <div className="addProductGroup">
            <div className="addProductItem">
              <label>Colors</label>
              <div>
                <MultiSelect
                  onChange={handleOnchange}
                  options={colors}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ margin: "10px" }}></div>
              <label>Status</label>
              <FormControl variant="outlined" >
        {/* <InputLabel id="demo-simple-select-outlined-label"></InputLabel> */}
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={age}
          // onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </div>
            <div className="addProductItem">
              <label>Sizes</label>
              <div>
                <Checkbox
                  defaultChecked
                  color="primary"
                  name="S"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label htmlFor="size">S</label>
                <Checkbox
                  color="primary"
                  name="M"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label htmlFor="size">M</label>
                <Checkbox
                  color="primary"
                  name="L"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label htmlFor="size">L</label>
                <Checkbox
                  color="primary"
                  name="XL"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label htmlFor="size">XL</label>
                <Checkbox
                  color="primary"
                  name="XXL"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label htmlFor="size">XXL</label>
              </div>
            </div>
          </div>
          <button className="addProductButton">Create new product</button>
        </div>

        <div className="addProductFormSide rightSide">
          <div className="addProductItem">
            <label>Upload Product Image</label>
          </div>
          <div className="userUpdateUpload">
            <img className="userUpdateImg" src={imgPreview} alt="" />
            <label htmlFor="file">
              <Publish className="userUpdateIcon" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept="image/*"
              name="image-upload"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
