import {
    CogIcon,
    KeyIcon,
    UserCircleIcon,
  } from "@heroicons/react/outline";
  
  const subNavigation = [
    { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
    { name: "Settings", href: "#", icon: CogIcon, current: true },
    { name: "Password", href: "#", icon: KeyIcon, current: false },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function Example() {
    
  
    return (
      <>
          {/* settings details */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 mt-8 w-full">
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h2
                        id="payment-details-heading"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Update Password
                      </h2>
                    </div>
  
                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-1">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Password
                        </label>
                        <input
                          type="password"
                          name="first-name"
                          id="first-name"
                          autoComplete="cc-given-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-4 sm:col-span-1">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name=""
                          autoComplete="cc-family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-1">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name=""
                          autoComplete="cc-family-name"
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
          </div>
      </>
    );
  }
  