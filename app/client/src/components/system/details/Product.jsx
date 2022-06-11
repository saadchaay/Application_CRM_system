import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import axios from "../../../api/axios";

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
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [openInputs, setOpenInputs] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchProduct = async (id) => {
    const res = await axios.get(`ProductsController/show/${id}`);
    if (res.status === 201) {
      setProduct(res.data.data);
      setCategories(res.data.categories);
      setProperties(res.data.properties);
      console.log(res.data.data);
      console.log(res.data.categories);
      console.log(res.data.properties);
    } else {
      setError(res);
      console.log(res);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenInputs(true);
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
                    <span>
                      <button
                        onClick={(e) => handleClick(e)}
                        className="text-green-700 hover:text-green-900"
                      >
                        <Edit />
                      </button>
                      <button
                        //   onClick={(e) => handleDelete(e, item.id)}
                        className="text-red-700 hover:text-red-900"
                      >
                        <Delete />
                      </button>
                    </span>
                    <span>
                      <Switch
                        checked={false}
                        onChange={() => true}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </span>
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
                          placeholder={product.title}
                          //   onChange={handleEditChange}
                          autoComplete="title"
                          className="mt-1 block w-auto border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
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
                      { openInputs ? (
                          <select
                          id="role"
                        //   value={category}
                        //   onChange={(e) =>
                            // setCategory(e.target.value)
                        //   }
                          autoComplete="country-name"
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option value={product.id_category}>{categories.find((category) => category.id === product.id_category).title}</option>
                            {categories.map((category) => (
                                categories.find((category) => category.id === product.id_category).title !== category.title ? (
                                    <option value={category.id}>{category.title}</option>
                                ) : null
                            ))}
                        </select>
                      ) : (
                          <dd className="mt-1 text-sm text-gray-900">
                            {categories.map((category) => (
                                categories.find((category) => category.id === product.id_category).title === category.title ? (
                                    <>{category.title}</>
                                ) : null ))}
                                    
                          </dd>)
                          }
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
                      <dd className="mt-1 text-sm text-gray-900">
                        {properties.map(
                            (property) => (
                                property.property === "size" ? 
                                <span className="bg-gray-100 px-2 py-1 mx-1 rounded-md"> {" "} {property.value} {" "} </span>  
                                : null
                            )
                        )}
                      </dd>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Colors
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                      {properties.map(
                            (property) => (
                                property.property === "color" ? 
                                <span className="bg-gray-100 px-2 py-1 mx-1 rounded-md"> {" "} {property.value} {" "} </span>  
                                : null
                            )
                        )}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {product.description}
                      </dd>
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
