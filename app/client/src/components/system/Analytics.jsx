import { Image } from "cloudinary-react";
import { CheckCircleIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import {
  AttachMoney,
  SupervisorAccount,
  Store,
  LocalShipping,
  DonutLarge,
  LocalGroceryStore,
  AccountCircle,
  Category
} from "@material-ui/icons";
import axios from "../../api/axios";
import { useState, useEffect } from "react";


const dataCard = [
  {
      name: "Total Products",
      link: "",
      icon: "Store",
      value: 0,
  },
  {
      name: "Total Orders",
      link: "/orders",
      icon: "LocalGroceryStore",
      value: 0
  },
  {
      name: "Total Customers",
      link: "",
      icon: "SupervisorAccount",
      value: 0
  },
  {
      name: "Total Users",
      link: "",
      icon: "AccountCircle",
      value: 0,
  },
  {
      name: "Total Categories",
      link: "",
      icon: "Category",
      value: 0,
  }
];

export default function Dashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState([]);
  const [overview, setOverview] = useState([]);

  const overView = async () => {
    const id = auth.role === "admin" ? auth.id : auth.id_admin;
    const response = await axios.get("OverviewController/analytics/" + id);
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
                  <div>
                    <div className="flex items-center">
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Analytics
                      </h1>
                    </div>
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
              {overview
                ? overview.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white overflow-hidden shadow rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {card.icon === "Store" ? (
                              <LocalGroceryStore
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "People" ? (
                              <SupervisorAccount
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "Category" ? (
                              <Category
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "AccountCircle" ? (
                              <AccountCircle
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "DonutLarge" ? (
                              <DonutLarge
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "LocalGroceryStore" ? (
                              <Store
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
                  ))
                : dataCard.map((card, index) => (
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
                            ) : card.icon === "Category" ? (
                              <Category
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "SupervisorAccount" ? (
                              <SupervisorAccount
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "AccountCircle" ? (
                              <AccountCircle
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "DonutLarge" ? (
                              <DonutLarge
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : card.icon === "LocalGroceryStore" ? (
                              <LocalGroceryStore
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
        </div>
      </main>
    </>
  );
}
