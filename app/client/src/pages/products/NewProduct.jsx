import "./styles/new-product.css";

export default function NewProduct() {
  const [imgPreview, setImgPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [error, setError] = useState(false);
  const [checked, setChecked] = React.useState({
    checkedA: true,
    checkedB: true,
  });
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
        <div className="addProductFormSide">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Apple Airpods" />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <input type="text" placeholder="123" />
          </div>
          <div className="addProductItem">
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="addProductFormSide">
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Apple Airpods" />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <input type="text" placeholder="123" />
          </div>
          <div className="addProductItem">
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button className="addProductButton">Create</button>
        </div>
      </form>
    </div>
  );
}
