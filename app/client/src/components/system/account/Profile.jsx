import { Image } from "cloudinary-react";
const statusStyles = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  Activate: "bg-orange-400 hover:bg-orange-500",
  Deactivate: "bg-green-600 hover:bg-green-700",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Example() {
  const admin = JSON.parse(localStorage.getItem("auth"));

  return (
    <>
      {/* settings details */}

      <main className="py-10 w-full">
        {/* Page header */}
        <div className="max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-start md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex justify-start items-center space-x-5">
            <div className="relative">
              {admin.avatar ? (
                <Image
                  className="h-20 w-20 rounded-full"
                  cloudName="maggie-7223"
                  public_id={admin.avatar}
                />
              ) : (
                <img
                  className="h-16 w-16 rounded-full"
                  src="http://cdn.onlinewebfonts.com/svg/img_572667.png"
                  alt=""
                />
              )}
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {" "}
                {admin.name}{" "}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Here <span> </span> From on{" "}
                <time dateTime="2020-08-25"> {admin.created_at}</time>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full mx-auto gap-6 sm:px-6 lg:w-full lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Account Information
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Username
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {admin.username}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {admin.email}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span
                          className={classNames(
                            admin.status
                              ? statusStyles["active"]
                              : statusStyles["inactive"],
                            "inline-flex items-center px-4 py-2 rounded-lg text-xs font-medium capitalize"
                          )}
                        >
                          {admin.status ? "Active" : "Inactive"}
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {admin.phone}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {admin.address}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <span className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                    Read full application
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
