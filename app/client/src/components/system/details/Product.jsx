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
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchProduct = async (id) => {
    const res = await axios.get(`ProductsController/show/${id}`);
    if (res.status === 201) {
      setProduct(res.data.data);
      setCategory(res.data.category);
      console.log(res.data.data);
      console.log(res.data.category);
    } else {
      setError(res);
      console.log(res);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <>
      {/* settings details */}

      <main className="py-10 w-full">
        {/* Page header */}

        <div className="mt-5 w-full mx-auto gap-6 sm:px-6 lg:w-full lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
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
                        //   onClick={(event) => handleClick(event, item)}
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
                        onChange={() => (true)}
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
                      <dd className="mt-1 text-sm text-gray-900">
                        {product.title}
                      </dd>
                    </div>
                    <div className="col-span-1 sm:col-span-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Category
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {category.title}
                      </dd>
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
                        {/* {admin.phone} */}
                        S, M, L, XL, XXL
                      </dd>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Colors
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {/* {admin.phone} */}
                        Black, White, Red, Blue, Green
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
