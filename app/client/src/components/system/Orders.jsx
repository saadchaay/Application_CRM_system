import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { gapi } from "gapi-script";
import axios from "../../api/axios";

const API_KEY = "AIzaSyD8sJuOu8T7-LPBhUFbrGOKh_tzTUnj0xs";
const CLIENT_ID =
  "280216831650-f9dn7qig5117unbvtfsnlusk5kjda32l.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/drive";

const transactions = [
  {
    id: "AAPS0L",
    customer: "saad chaay",
    phone: "+212615207417",
    city: "Rabat",
    date: "02/01/2020",
    status: "Pending",
    total: "$4,397.00",
  },
  // More transactions...
];
export default function Orders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [orders, setOrders] = useState(null);

  const handleOrderFromSheet = async (e) => {
    e.preventDefault();
    var accessToken = gapi.auth.getToken().access_token;
    const object = {};
    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1W4sXanZLLuHi3xjobdtDuXToGnFnPWLVzAHuZP-qCVE/values/A1:Z1000",
      {
        method: "GET",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
      }
    );
    response.json().then((data) => {
      data.values.forEach((item, index) => {
        object[index] = {
          id: item[0],
          date: item[1],
          customer: item[2],
          address: item[3],
          city: item[4],
          phone: item[5],
          product: item[6],
          sku: item[7],
          colors: item[8],
          sizes: item[9],
          quantity: item[10],
          total: item[11],
        };
      });
      delete object[0];
      setOrders(object);

      axios
        .post(
          "OrdersController/store",
          JSON.stringify({
            admin: auth.id,
            orders: object,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const fetchOrder = async () => {
    const response = await axios.get("OrdersController/index/" + auth.id);
    setOrders(response.data);
    console.log(response.data);
  };

  const handleDeleteOrder = async (e, id) => {
    e.preventDefault();
    const response = await axios.delete("OrdersController/destroy/" + id);
    console.log(response);
    fetchOrder();
  }

  useEffect(() => {
    fetchOrder();
    function start() {
      gapi.client.init({
        apiKey: token.apiKey ? token.apiKey : API_KEY,
        client_id: token.clientId ? token.clientId : CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-700">
              A table of placeholder stock market data that does not make any
              sense.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleOrderFromSheet}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Import Order From Google Sheet
            </button>
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
                            {order.status}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {order.tracking}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            $ {order.total}
                          </td>
                          <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              to="/"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              details
                              <span className="sr-only">, {order.id}</span>
                            </Link>
                            <button
                              onClick={handleDeleteOrder}
                              className="text-sm text-gray-500 hover:text-gray-900"
                              data-id={order.id}
                            >
                              <Delete />  
                            </button>
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
