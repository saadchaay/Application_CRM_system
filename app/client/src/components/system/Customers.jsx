  import { useEffect, useState, useRef, Fragment } from "react";
  import axios from "../../api/axios";
  import { Delete } from "@material-ui/icons";
  import { Dialog, Transition } from "@headlessui/react";

  const transactions = [
    {
      id: "AAPS0L",
      customer: "saad chaay",
      phone: "+212615207417",
      city: "bouskoura",
      date: "Casablanca",
      status: "Pending",
      total: "$4,397.00",
    },
    // More transactions...
  ];
  export default function Customers() {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [customers, setCustomers] = useState([]);
    // for add one
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    // errors 
    const [errors, setErrors] = useState({});

    const closeDialog = (e) => {
      e.preventDefault();
      setOpen(false);
      setAddress("");
      setCity("");
      setName("");
      setPhone("");
      setErrors({});
    }
    const handleAddCustomer = (e) => {
      e.preventDefault();
      const newErr = {};
      const data = {
        name,
        phone,
        address,
        city,
      };
      if(name === ""){
        newErr.name = "Name is required";
      }
      if(phone === ""){
        newErr.phone = "Phone is required";
      }
      if(address === ""){
        newErr.address = "Address is required";
      }
      if(city === ""){
        newErr.city = "City is required";
      }
      setErrors(newErr);
      // if(Object.keys(errors).length === 0){
      //   axios.post("/customers", data, {headers: {Authorization: `Bearer ${auth.token}`}}).then(res => {
    };

    const handleDelete = (e, id) => {
      e.preventDefault();
      axios.delete("CustomersController/delete/" + id).then((res) => {
        if (res.status === 201) {
          console.log("Customer deleted");
          fetchCustomers();
        } else {
          console.log("Error");
          console.log(res);
        }
      });
    };

    const fetchCustomers = async () => {
      const res = await axios.get("CustomersController/index/" + auth.id);
      if (res.status === 201) {
        setCustomers(res.data.data);
        console.log(res.data.data);
      }
    };

    useEffect(() => {
      fetchCustomers();
    }, []);

    return (
      <>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto mb-20">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <form onSubmit={handleAddCustomer}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 mx-3 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-bold text-gray-900"
                            >
                              Add Customer
                            </Dialog.Title>
                            <div className="mt-2">
                              <div className="mt-3 grid grid-cols-4 gap-6">
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Full name
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.name ? errors.name : ""}
                                  </div>
                                </div>
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Phone
                                  </label>
                                  <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="phone"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    { errors.phone ? errors.phone : "" }
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-6">
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    autoComplete="address"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    { errors.address ? errors.address : "" }
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-4 gap-6">
                                <div className="col-span-4 sm:col-span-4">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    autoComplete="city"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    { errors.city ? errors.city : "" }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={closeDialog}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </form>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">CUSTOMERS</h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Customer
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
                          Customer ID
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Name
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
                          Address
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
                          total transaction
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-2 text-left text-sm font-semibold text-gray-900"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {customers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            ## {customer.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {customer.name}
                          </td>
                          <td className="whitespace-nowrap px -2 py-2 text-sm text-gray-900">
                            {customer.phone}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {customer.address}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {customer.city}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            6788.38
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            <button
                              type="button"
                              onClick={(e) => handleDelete(e, customer.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Delete />
                            </button>
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
