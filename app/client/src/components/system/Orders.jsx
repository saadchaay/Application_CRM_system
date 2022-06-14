import { useEffect, useState } from "react";
import Axios from "axios";
import { GoogleLogin } from "react-google-login";

const API_KEY = "AIzaSyD6qcc_ly4bgpxHw8pDc3OnR_9LlHqqgs4";
const CLIENT_ID =
  "902170722306-736ta1oeknlfjhj0gvv4ug1ga99li3c7.apps.googleusercontent.com";
const SCOPED = "https://www.googleapis.com/auth/drive";
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

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Transactions
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A table of placeholder stock market data that does not make any
              sense.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Export
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
                        City
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
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                          {transaction.id}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {transaction.customer}
                        </td>
                        <td className="whitespace-nowrap px -2 py-2 text-sm text-gray-900">
                          {transaction.phone}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {transaction.city}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {transaction.status}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {transaction.total}
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="/"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            details
                            <span className="sr-only">, {transaction.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
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
