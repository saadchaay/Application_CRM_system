import "./styles/new-product.css";
import { Publish } from "@material-ui/icons";
import { useState } from "react";

export default function NewProduct() {
  const [imgPreview, setImgPreview] = useState(
    "https://via.placeholder.com/150"
  );
  const [error, setError] = useState(false);
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
              <input type="text" placeholder="Apple Airpods" />
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
              <label>Name</label>
              <input type="text" placeholder="" />
              <label>Name</label>
              <input type="text" placeholder="" />
            </div>
        
          </div>
          <div className="addProductGroup">
            <div className="addProductItem">
              <label>Stock</label>
              <input type="text" placeholder="123" />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
          <div className="addProductGroup">
            <div className="addProductItem">
              <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
            <button className="addProductButton">Create new product</button>
        </div>
        <div className="addProductFormSide rightSide">
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
