import { ScaleIcon } from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";
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

const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [cards, setCards] = useState([
    {
      name: "Total Revenu",
      href: "#",
      icon: AttachMoney,
      amount: "$30,659.45",
    },
    { name: "Total Orders", href: "#", icon: Store, amount: "5388" },
    {
      name: "Total Profit",
      href: "#",
      icon: MonetizationOn,
      amount: "$11,600.23",
    },
    {
      name: "Delivered Orders",
      href: "#",
      icon: LocalShipping,
      amount: "3199",
    },
    { name: "Order In Progress", href: "#", icon: DonutLarge, amount: "1239" },
    { name: "Returned Orders", href: "#", icon: TrendingDown, amount: "2183" },
  ]);

  const Orders = [
    { Number: '#5627', date: '28-05-2022', customer: 'Saad Chaay', items: 'Product 1, Product 2', status: 'Pending', total: '$320' },
    { Number: '#5627', date: '28-05-2022', customer: 'Saad Chaay', items: 'Product 1, Product 2', status: 'Pending', total: '$320' },
    { Number: '#5627', date: '28-05-2022', customer: 'Saad Chaay', items: 'Product 1, Product 2', status: 'Pending', total: '$320' },
  ]

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
                    <img
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src={auth.avatar}
                      alt=""
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
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src="http://cdn.onlinewebfonts.com/svg/img_572667.png"
                        alt=""
                      />
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
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
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
            Recent orders
          </h2>

          {/* Orders list (smallest breakpoint only) */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Orders.map((order) => (
                    <tr key={order.id}>
                      <td className="w-1/2 max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                        {order.Number}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Date</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {order.date}
                          </dd>
                          <dt className="sr-only sm:hidden">Customer</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {order.customer}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {order.date}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {order.customer}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {order.items}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {order.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </>
  );
}
