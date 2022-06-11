import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import { Cancel, SaveAlt } from "@material-ui/icons";
import axios from "../../../api/axios";
import Drop from "../../helpers/Drop";

const statusStyles = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [openInputs, setOpenInputs] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [imgPrv, setImgPrv] = useState(null);
  const { id } = useParams();

  // product data::
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({});

  // handle change select input
  const [colorsSelected, setColorsSelected] = useState(null);
  const [sizesSelected, setSizesSelected] = useState(null);

  const handleChangeColors = (selected) => {
    setColorsSelected(selected);
  };

  const handleChangeSizes = (selected) => {
    setSizesSelected(selected);
  };
  // handle cancel edit
  const handleCancel = (e) => {
    e.preventDefault();
    setOpenInputs(false);
    setAvatar("");
    setTitle("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setColorsSelected(null);
    setSizesSelected(null);
  };

  // handle image preview
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgPrv(reader.result);
      setAvatar(file.name);
    };
    reader.readAsDataURL(file);
  };

  // fetch data of product
  const fetchProduct = async (id) => {
    const res = await axios.get(`ProductsController/show/${id}`);
    if (res.status === 201) {
      setProduct(res.data.data);
      setCategories(res.data.categories);
      setProperties(res.data.properties.data);
      setColors(res.data.properties.colors);
      setSizes(res.data.properties.sizes);
      console.log(res.data.data);
      console.log(res.data.categories);
      console.log(res.data.properties);
    } else {
      setErrors(res);
      console.log(res);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenInputs(true);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const product = {
      creator: auth.id,
      type: auth.role === "admin" ? "admin" : "user",
      avatar: avatar,
      title: title,
      description: description,
      quantity: quantity,
      price: price,
      category: category,
      color: colorsSelected,
      size: sizesSelected,
    };
    console.log(product);
    console.log(id);
    const res = await axios.put(
      "ProductsController/update/" + id,
      JSON.stringify(product),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      setTitle("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCategory("");
      setAvatar("");
      setColorsSelected({});
      setSizesSelected(null);
      setImgPrv(null);
      setErrors({});
      fetchProduct(id);
      setOpenInputs(false);
      console.log("Product updated");
    } else {
      console.log("Error");
      console.log(res);
      if (res.data.title) {
        setErrors({ ...errors, title: res.data.title });
      }
      if (res.data.description) {
        setErrors({
          ...errors,
          title: res.data.title,
          description: res.data.description,
        });
      }
      if (res.data.quantity) {
        setErrors({
          ...errors,
          title: res.data.title,
          description: res.data.description,
          quantity: res.data.quantity,
        });
      }
      if (res.data.price) {
        setErrors({
          ...errors,
          title: res.data.title,
          description: res.data.description,
          quantity: res.data.quantity,
          price: res.data.price,
        });
      }
      if (res.data.category) {
        setErrors({
          ...errors,
          title: res.data.title,
          description: res.data.description,
          quantity: res.data.quantity,
          price: res.data.price,
          category: res.data.category,
        });
      }
    }
  };

  useEffect(() => {
    fetchProduct(id);
    setOpenInputs(false);
  }, [id]);

  return (
    <>
      {/* settings details */}

      <main className="py-10 w-full">
        <div className="mt-5 w-full mx-auto gap-6 sm:px-6 lg:w-full lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Product details */}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="flex justify-between px-4 py-5 sm:px-6">
                  <div>
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Product Information
                    </h2>
                    <p className="text-sm text-gray-400">
                      Insert product on {product.created_at}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {!openInputs ? (
                      <span>
                        <button
                          onClick={(e) => handleClick(e)}
                          className="text-green-700 hover:text-green-900"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, product.id)}
                          className="text-red-700 hover:text-red-900"
                        >
                          <Delete />
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          onClick={(e) => handleUpdate(e, product.id)}
                          className="text-green-700 hover:text-green-900"
                        >
                          <SaveAlt />
                        </button>
                        <button
                          onClick={(e) => handleCancel(e)}
                          className="text-red-700 hover:text-red-900"
                        >
                          <Cancel />
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-6">
                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Product Name
                      </dt>
                      {openInputs ? (
                        <input
                          type="text"
                          name="title"
                          value={title}
                          placeholder={product.title}
                          onChange={(e) => setTitle(e.target.value)}
                          autoComplete="title"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {product.title}
                        </dd>
                      )}
                    </div>
                    <div className="col-span-1 sm:col-span-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Category
                      </dt>
                      {openInputs ? (
                        <select
                          id="role"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          autoComplete="country-name"
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option value={product.id_category}>
                            {
                              categories.find(
                                (category) =>
                                  category.id === product.id_category
                              ).title
                            }
                          </option>
                          {categories.map((category) =>
                            categories.find(
                              (category) => category.id === product.id_category
                            ).title !== category.title ? (
                              <option value={category.id}>
                                {category.title}
                              </option>
                            ) : null
                          )}
                        </select>
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {categories.map((category) =>
                            categories.find(
                              (category) => category.id === product.id_category
                            ).title === category.title ? (
                              <>{category.title}</>
                            ) : null
                          )}
                        </dd>
                      )}
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span
                          className={classNames(
                            product.status
                              ? statusStyles["active"]
                              : statusStyles["inactive"],
                            "inline-flex items-center px-4 py-2 rounded-lg text-xs font-medium capitalize"
                          )}
                        >
                          {product.status ? "In Stock" : "Out of Stock"}
                        </span>
                      </dd>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Sizes
                      </dt>
                      {!openInputs ? (
                        <dd className="mt-1 text-sm text-gray-900">
                          {!properties.length
                            ? "No sizes"
                            : properties.map((property) =>
                                property.property === "size" ? (
                                  <span className="bg-gray-100 px-2 py-1 mx-1 rounded-md">
                                    {" "}
                                    {property.value}{" "}
                                  </span>
                                ) : null
                              )}
                        </dd>
                      ) : (
                        <Drop
                          data={sizes}
                          handleChangeSelected={handleChangeSizes}
                          selectData={sizesSelected}
                        />
                      )}
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Colors
                      </dt>
                      {!openInputs ? (
                        <dd className="mt-1 text-sm text-gray-900">
                          {!properties.length
                            ? "No colors"
                            : properties.map((property) =>
                                property.property === "color" ? (
                                  <span className="bg-gray-100 px-2 py-1 mx-1 rounded-md">
                                    {" "}
                                    {property.value}{" "}
                                  </span>
                                ) : null
                              )}
                        </dd>
                      ) : (
                        <Drop
                          data={colors}
                          handleChangeSelected={handleChangeColors}
                          selectData={colorsSelected}
                        />
                      )}
                    </div>
                    <div className="col-span-1 sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      {!openInputs ? (
                        <dd className="mt-1 text-sm text-gray-900">
                          {product.description}
                        </dd>
                      ) : (
                        <textarea
                          type="text"
                          id="description"
                          placeholder={product.description}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          autoComplete="description"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      )}
                    </div>

                    <div className="col-span-1 sm:col-span-3 flex justify-around">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Quantity
                        </dt>
                        {!openInputs ? (
                          <dd className="mt-1 text-sm text-gray-900">
                            {product.quantity}
                          </dd>
                        ) : (
                          <input
                            type="text"
                            id="description"
                            placeholder={product.quantity}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            autoComplete="description"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        )}
                      </div>

                      <div className="">
                        <dt className="text-sm font-medium text-gray-500">
                          Price
                        </dt>
                        {!openInputs ? (
                          <dd className="mt-1 text-sm text-gray-900">
                            {product.price}
                          </dd>
                        ) : (
                          <input
                            type="text"
                            id="description"
                            placeholder={product.price}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            autoComplete="description"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {!imgPrv || !openInputs ? (
                          "Product image"
                        ) : (
                          <span className="flex justify-between">
                            <span>Product image</span>
                            <button
                              onClick={() => setImgPrv(false)}
                              className="text-red-700 hover:text-red-900"
                            >
                              <Delete />
                            </button>
                          </span>
                        )}
                      </dt>
                      {!openInputs ? (
                        <dd className="mt-1 text-sm text-gray-900">
                          <img
                            src={product.image}
                            alt="product"
                            className="w-full"
                          />
                        </dd>
                      ) : imgPrv ? (
                        <img
                          src={imgPrv}
                          alt="preview"
                          className="w-max-90 h-40 object-cover"
                        />
                      ) : (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-8 w-8 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => handleImageChange(e)}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </dl>
                </div>

                <div></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
