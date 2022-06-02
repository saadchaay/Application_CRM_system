import { Link, useLocation } from "react-router-dom";
import { CogIcon, KeyIcon, UserCircleIcon,} from "@heroicons/react/outline";
import { useEffect } from "react";
  
  const subNavigation = [
    { name: "Profile", href: "/profile", icon: UserCircleIcon, current: false },
    { name: "Settings", href: "/settings", icon: CogIcon, current: false },
    { name: "Password", href: "/password", icon: KeyIcon, current: false },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function Example(props) {
    //   const [current, setCurrent] = useState();
    const location = useLocation();
    const path = location.pathname ;
    switch (path) {
        case "/account/profile":
            subNavigation[0].current = true;
            subNavigation[1].current = false;
            subNavigation[2].current = false;
            break;
        case "/account/settings":
            subNavigation[0].current = false;
            subNavigation[1].current = true;
            subNavigation[2].current = false;
            break;
        case "/account/password":
            subNavigation[0].current = false;
            subNavigation[1].current = false;
            subNavigation[2].current = true;
            break;
        default:
            break;
    }
  
    return (
      <>
        <div className="h-full">
          <main className="max-w-7xl mx-auto pb-10 lg:py-2 lg:px-8">
            <div className="flex flex-col justify-between items-start">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Account
                </h1>
              </div>
  
              {/* <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3"> */}
              <nav className="flex mt-5 border-y py-4 w-full">
                {subNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={`/account${item.href}`}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-cyan-600 hover:bg-white"
                        : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                      "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-cyan-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
              {/* </aside> */}
  
            {props.profile}
            {props.settings}
            {props.password}
              
              {/* settings details */}
              {/* <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 mt-8 w-full">
                <section aria-labelledby="payment-details-heading">
                  <form action="#" method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="bg-white py-6 px-4 sm:p-6">
                        <div>
                          <h2
                            id="payment-details-heading"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Settings Details
                          </h2>
                          <p className="mt-1 text-sm text-gray-500">
                            Update your information.
                          </p>
                        </div>
  
                        <div className="mt-6 grid grid-cols-4 gap-6">
                          <div className="col-span-4 sm:col-span-2">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="cc-given-name"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
  
                          <div className="col-span-4 sm:col-span-2">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="cc-family-name"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
  
                          <div className="col-span-4 sm:col-span-2">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
  
                          <div className="col-span-4 sm:col-span-2">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
  
                          <div className="col-span-4 sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              name="postal-code"
                              id="postal-code"
                              autoComplete="postal-code"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-md font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div> */}

            </div>
          </main>
        </div>
      </>
    );
  }

  