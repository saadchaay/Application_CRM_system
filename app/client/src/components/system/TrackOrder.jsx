import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "@material-ui/icons";
import axios from "../../api/axios";

const statusStyles = {
  pending: "bg-gray-500 text-white",
  confirmed: "bg-green-600 text-white",
  canceled: "bg-orange-500 text-white",
  processing: "bg-blue-600 text-white",
  failed: "bg-pink-700 text-white",
  payed: "bg-green-700 text-white",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Orders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState(null);


  const fetchOrder = async () => {
    
    const response = await axios.get("OrdersController/confirmedOrders/" + auth.id_admin);
    if (response.status === 201) {
      setOrders(response.data);
      console.log(response.data);
    } else {
      console.log(response.status);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 mt-3">Tracking Order</h1>
          </div>

        </div>
        
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tracking
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total order
                      </th>
                      <th
                        scope="col"
                        className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders ? (
                      orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {order.reference}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {order.name}
                          </td>
                          <td className="whitespace-nowrap px -2 py-2 text-sm text-gray-900">
                            {order.phone}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {order.order_date}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            <span
                              className={classNames(
                                (order.status === "Pending" &&
                                  statusStyles["pending"]) ||
                                  (order.status === "Processing" &&
                                    statusStyles["processing"]) ||
                                  (order.status === "Canceled" &&
                                    statusStyles["canceled"]) ||
                                  (order.status === "Failed" &&
                                    statusStyles["failed"]) ||
                                  (order.status === "Confirmed" &&
                                    statusStyles["confirmed"]) ||
                                  (order.status === "Payed" &&
                                    statusStyles["payed"]),
                                "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize"
                              )}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          <span
                              className={classNames(
                                (order.tracking === "No Answer" &&
                                statusStyles["pending"]) ||
                                  (order.tracking === "In Progress" &&
                                    statusStyles["processing"]) ||
                                  (order.tracking === "Returned" &&
                                    statusStyles["canceled"]) ||
                                  (order.tracking === "Refused" &&
                                    statusStyles["failed"]) ||
                                  (order.tracking === "Delivered" &&
                                    statusStyles["confirmed"]) ||
                                  (order.tracking === "Payed" &&
                                    statusStyles["payed"]),
                                "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize"
                              )}
                            >
                              {order.tracking}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            $ {order.total}
                          </td>
                          <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              to={`/track-orders-detail/${order.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Info />
                              <span className="sr-only">, {order.id}</span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          <div className="text-center py-2">
                            <div className="text-gray-500">
                              No Orders found.
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
