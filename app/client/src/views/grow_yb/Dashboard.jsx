import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Home, SupervisorAccount, ExitToApp } from "@material-ui/icons";
import axios from "../../api/axios";

import {
  BellIcon,
  MenuAlt1Icon,
  ScaleIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  OfficeBuildingIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import Switch from "@material-ui/core/Switch";
const navigation = [
  { name: "Dashboard", href: "/super-dashboard", icon: Home, current: true },
  { name: "Logout", href: "/logout", icon: ExitToApp, current: false },
];

const cards = [
  { name: "Account balance", href: "/", icon: ScaleIcon, number: "$30,659.45" },
  {
    name: "All members",
    href: "/all-members",
    icon: SupervisorAccount,
    number: "122",
  },
  {
    name: "Deactivate accounts",
    href: "/deactivate-accounts",
    icon: SupervisorAccount,
    number: "32",
  },
  // More items...
];

const statusStyles = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

const users = [
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: true,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: true,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: false,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: true,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: true,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "active",
    checked: false,
  },
  {
    id: 1,
    name: "Saad chaay",
    email: "chaaysaad@gmail.com",
    href: "#",
    phone: "0615207417",
    status: "inactive",
    checked: false,
  },
  // More transactions...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [checked, setChecked] = useState([]);
  
  // Get all admins ....
  const handleData = async () => {
    const res = await axios.get(
      "auth/SuperAdminController/index"
    );
    setAdmins(res.data);
    setChecked(res.data.map((admin) => admin.status));
    cards[1].number = res.data.length;
    cards[2].number = res.data.map((admin) => admin.status).filter(
      (status) => status === 0
    ).length;
    };

  // activate accounts here ....
  const handleChange = async (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);

    const newAdmins = admins.map((admin, i) => {
      if (i === index) {
        admin.status = newChecked[index] ? true : false;
      }
      return admin;
    });

    if(newChecked[index] === true){
      cards[2].number = cards[2].number - 1;
    }else{
      cards[2].number = cards[2].number + 1;
    }

    setAdmins(newAdmins);
    const id = admins[index].id;
    const res = await axios.put(
      "auth/SuperAdminController/changeStatus/" +id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status === "success") {
      console.log(res.data.status);
    }
    const newCardsLength = admins.map((admin) => {
        return admin.status;
    });
    cards[1].number = newCardsLength.length;
  };


  useEffect(() => {
    handleData();
  }, []);

  
  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                      alt="Easywire logo"
                    />
                  </div>
                  <nav
                    className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-cyan-800 text-white"
                              : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                alt="Easywire logo"
              />
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">

                {/* Notification dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <button
                        type="button"
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Notification 1
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Notification 2
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> 

              </div>
            </div>
          </div>
          
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="flex-1 min-w-0">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                            alt=""
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            Good morning, Grow YB System
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <OfficeBuildingIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Casablanca
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            <CheckCircleIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                            Verified account
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Content */}

            <div className="flex flex-col mt-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
                Overview
              </h2>
              <div className="flex flex-col justify-center items-center sm:justify-around lg:px-8 w-full mr-4 sm:flex-row">
                {/* Card */}
                {cards.map((card) => (
                  <div className="mt-2 w-full sm:w-1/4">
                    <div
                      key={card.name}
                      className="bg-white overflow-hidden shadow rounded-lg mx-4 sm:mx-0"
                    >
                      <div className="p-5 w-auto">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <card.icon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-5 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {card.name}
                              </dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">
                                  {card.number}
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3 w-auto">
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
                  </div>
                ))}
              </div>

              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8 text-center">
                Recent Members
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  {admins.map((admin) => (
                    <li key={admin.id}>
                      <Link to={`/admin/${admin.id}`}>
                      <span
                        className="block px-4 py-4 bg-white hover:bg-gray-50"
                      >
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <CashIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate">
                                {admin.name}
                              </span>
                              <span>
                                <span className="text-gray-900 font-medium">
                                  {admin.phone}
                                </span>
                              </span>
                              <time dateTime={admin.datetime}>
                                {admin.date}
                              </time>
                            </span>
                          </span>
                          <ChevronRightIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Full Name Account
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Email
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Phone
                            </th>
                            <th
                              className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                              scope="col"
                            >
                              Status
                            </th>
                            <th
                              className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              scope="col"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                      
                        <tbody className="bg-white divide-y divide-gray-200">
                          {admins.map((admin, index) => (
                            <tr key={index} className="bg-white">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex">
                                  <a
                                    href={admin.href}
                                    className="group inline-flex space-x-2 truncate text-sm"
                                  >
                                    <CashIcon
                                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                      {admin.name}
                                    </p>
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex">
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {admin.email}
                                  </p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <span className="text-gray-900 font-medium">
                                  {admin.phone}{" "}
                                </span>
                              </td>
                              <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                <span
                                  className={classNames(
                                    admin.status
                                      ? statusStyles["active"]
                                      : statusStyles["inactive"],
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                  )}
                                >
                                  {admin.status ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                  <span>
                                  <Switch
                                    checked={checked[index]}
                                    onChange={() => handleChange(index)}
                                    // onChange={() => handleChangeStatus(admin.id)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                  />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{"10"}
                            <span className="font-medium"></span> of {admins.length}
                            <span className="font-medium"></span> results
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                          </a>
                          <a
                            href="/"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
