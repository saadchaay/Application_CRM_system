import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

const statusStyles = {
  Pending: "bg-gray-500 text-white",
  Confirmed: "bg-green-600 text-white",
  Canceled: "bg-orange-500 text-white",
  Processing: "bg-blue-600 text-white",
  Failed: "bg-pink-700 text-white",
  Payed: "bg-green-700 text-white",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [total, setTotal] = useState([]);
  const [properties, setProperties] = useState([]);

  const fetchOrder = async (id) => {
    const res = await axios.get(`OrdersController/show/${id}`);
    if (res.status === 200) {
      console.log(res.data);
      setCustomer(res.data.customer);
      setOrder(res.data.order);
      setProduct(res.data.product);
      setTotal(res.data.total);
      setProperties(res.data.properties);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  return (
    <>
      <div>
        <div className="flex items-center justify-start mx-2 my-5">
          <div className="flex-1 lg:border-t pt-4 mx-2">
            <div className="bg-white rounded-3xl border shadow-md p-8 w-full sm:w-full">
              <div className="flex justify-between items-center mb-4">
                {/* title with the manager */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">
                    Management Status of this order
                  </h2>
                  <p>
                    <span className="ml-3 text-gray-600 text-sm">
                      Manager name: {auth.name}
                    </span>
                  </p>
                </div>
              </div>
              {/* body card */}
              <div className="flex justify-around">
                <div
                  className={classNames(
                    "px-5 py-3 rounded-md text-lg font-medium leading-5 hover:cursor-pointer",
                    statusStyles["Pending"]
                  )}
                >
                  <input type="radio" name="" hidden />
                  <label className="hover:cursor-pointer">Pending</label>
                </div>
                <div
                className={classNames(
                    "px-5 py-3 rounded-md text-lg font-medium leading-5 hover:cursor-pointer",
                    statusStyles["Confirmed"]
                  )}
                >
                  <input type="radio" name="" hidden />
                  <label className="hover:cursor-pointer">Confirmed</label>
                </div>
                <div
                className={classNames(
                    "px-5 py-3 rounded-md text-lg font-medium leading-5 hover:cursor-pointer",
                    statusStyles["Canceled"]
                  )}>
                  <input type="radio" name="" hidden />
                  <label className="hover:cursor-pointer">Canceled</label>
                </div>
                <div
                className={classNames(
                    "px-5 py-3 rounded-md text-lg font-medium leading-5 hover:cursor-pointer",
                    statusStyles["Processing"]
                  )}>
                  <input type="radio" name="" hidden />
                  <label className="hover:cursor-pointer">Processing</label>
                </div>
                <div
                className={classNames(
                    "px-5 py-3 rounded-md text-lg font-medium leading-5 hover:cursor-pointer",
                    statusStyles["Failed"]
                  )}>
                  <input type="radio" name="" hidden />
                  <label className="hover:cursor-pointer">Failed</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center  mt-4 md:flex-row md:mt-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg md:w-4/5 mx-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Order Reference: {"  " + product.sku + "_" + order.reference}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  SKU Product
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {product.sku}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Product Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {product.title}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Colors</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {properties
                    .filter((property) => property.property === "color")
                    .map((property) => {
                      return (
                        <span
                          key={property.id}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-blue-100 text-blue-800"
                        >
                          {property.value}
                        </span>
                      );
                    })}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Sizes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {properties
                    .filter((property) => property.property === "size")
                    .map((property) => {
                      return (
                        <span
                          key={property.id}
                          className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-blue-100 text-blue-800"
                        >
                          {property.value}
                        </span>
                      );
                    })}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span
                    className={classNames(
                      "px-2 py-0.5 rounded-full text-xs font-medium leading-5",
                      statusStyles[order.status]
                    )}
                  >
                    {order.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg md:w-1/2 mx-2 mt-4 md:mt-0">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Customer Information
            </h3>
            <p>
              <span className="text-sm font-medium text-gray-500">
                {customer.created_at}
              </span>
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.phone}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.city}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total Transaction
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {total.transactions}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.address}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
