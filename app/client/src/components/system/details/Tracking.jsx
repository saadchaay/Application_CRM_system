import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";

const statusStyles = {
  Pending: "bg-gray-500 text-white",
  Confirmed: "bg-green-600 text-white",
  Canceled: "bg-orange-500 text-white",
  Processing: "bg-blue-600 text-white",
  Failed: "bg-pink-700 text-white",
  Payed: "bg-green-700 text-white",
};

const trackingStyles = {
  Waiting: "bg-gray-500 text-white",
  Delivered: "bg-green-600 text-white",
  Returned: "bg-orange-500 text-white",
  Processing: "bg-blue-600 text-white",
  Refused: "bg-pink-700 text-white",
  Payed: "bg-green-700 text-white",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const location = useLocation();
  const from = location.state?.from?.pathname || "/orders";
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [total, setTotal] = useState([]);
  const [properties, setProperties] = useState([]);
  const [note, setNote] = useState("");
  // new status
  const [newStatus, setNewStatus] = useState("");

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

  const changeStatus = async () => {
    const data = {
      status: newStatus,
      note: note,
    };
    console.log(data);
    const res = await axios.put(
      `OrdersController/changeStatus/${id}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data);
      fetchOrder(id);
      setNote("");
      setNewStatus(""); 
      navigate(from, { replace: true });
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
          <div className="flex-1 lg:border-t lg:border-b py-4 mx-2">
            <div className="bg-white rounded-3xl border shadow-md p-8 w-full sm:w-full">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                {/* title with the manager */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">
                    Shipping Management for this Order
                  </h2>
                  <p>
                    <span className="text-gray-600 text-sm">
                      Shipping Manager name: {auth.name}
                    </span>
                  </p>
                </div>
                <div className="mt-3 md:mt-0 w-full sm:w-auto">
                  <select
                    id="role"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    autoComplete="country-name"
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  >
                    <option className="text-gray-400">
                      Track the order status
                    </option>
                    {Object.keys(statusStyles).map((status) =>
                      order.tracking !== status ? (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>
              </div>
              {/* body card */}
              {newStatus ? (
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Order Note (optional) :
                  </label>
                  <textarea
                    type="text"
                    id="note"
                    placeholder="Add a note about this order"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    autoComplete="note"
                    className="mt-1 block w-full sm:w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                  <button
                    onClick={changeStatus}
                    className="mt-3 w-full sm:w-auto bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center my-4 md:flex-row md:mt-0">
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
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total Order
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="px-2 py-0.5 rounded-full text-sm font-medium leading-5">
                    {order.total} $$
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
                  {total.transactions} $$
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
