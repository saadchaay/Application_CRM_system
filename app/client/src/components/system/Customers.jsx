import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { GoogleLogin } from "react-google-login";
import { Delete } from "@material-ui/icons";

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
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [customers, setCustomers] = useState([]);

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
    if(res.status === 201){
      setCustomers(res.data.data);
      console.log(res.data.data);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

    return (
      <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              CUSTOMERS
            </h1>
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
                            // onClick={handleDelete(customer.id)}
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
  