import { Image } from "cloudinary-react";
import { CheckCircleIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import {
  AttachMoney,
  MonetizationOn,
  Store,
  LocalShipping,
  DonutLarge,
  TrendingDown,
} from "@material-ui/icons";
import axios from "../../api/axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState([]);
  const [overview, setOverview] = useState([]);

  const overView = async () => {
    const id = auth.role === "admin" ? auth.id : auth.id_admin;
    const response = await axios.get("OverviewController/index/" + id);
    if (response) {
      setOverview(response.data.data);
      setOrders(response.data.todayOrders);
      console.log(response.data.todayOrders);
    }
  };

  useEffect(() => {
    overView();
  }, []);

  return (
    <>
      <main className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  {auth.avatar ? (
                    <Image
                      className="hidden h-16 w-16 rounded-full sm:block"
                      cloudName="maggie-7223"
                      publicId={auth.avatar}
                    />
                  ) : (
                    <img
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src="http://cdn.onlinewebfonts.com/svg/img_572667.png"
                      alt=""
                    />
                  )}

                  <div>
                    <div className="flex items-center">
                      {auth.avatar ? (
                        <Image
                          className="h-16 w-16 rounded-full sm:hidden"
                          cloudName="maggie-7223"
                          publicId={auth.avatar}
                        />
                      ) : (
                        <img
                          className="h-16 w-16 rounded-full sm:hidden"
                          src="http://cdn.onlinewebfonts.com/svg/img_572667.png"
                          alt=""
                        />
                      )}
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Good morning, {auth.name}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {auth.address}
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        {auth.role}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {overview.map((card, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {card.icon === "Store" ? (
                          <Store
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : card.icon === "AttachMoney" ? (
                          <AttachMoney
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : card.icon === "MonetizationOn" ? (
                          <MonetizationOn
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : card.icon === "LocalShipping" ? (
                          <LocalShipping
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : card.icon === "DonutLarge" ? (
                          <DonutLarge
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : card.icon === "TrendingDown" ? (
                          <TrendingDown
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.value}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.link}
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="max-w-7xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Recent orders (Today)
          </h2>

          {/* Orders list (smallest breakpoint only) */}

          <div className="mt-8 mx-4 sm:mx-6 lg:mx-8 flex flex-col">
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
                          Total order
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
                              $ {order.total}
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
      </main>
    </>
  );
}
