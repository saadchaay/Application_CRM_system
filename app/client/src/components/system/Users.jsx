import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";
import { Dialog, Transition } from "@headlessui/react";
import { Delete, Edit } from "@material-ui/icons";

export default function Example() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const auth = JSON.parse(localStorage.getItem("auth"));

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [role, setRole] = useState("");

  const [errName, setErrName] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const [errConfirmPwd, setErrConfirmPwd] = useState("");
  const [errRole, setErrRole] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("UsersController/index/"+auth.id);
    if(res.status === 200) {
      setUsers(res.data);
      console.log(res.data);
    } else {
      console.log("There's no user");
    }
  };

  useEffect(() => {
    fetchUsers();
    setErrPwd("");
    setErrRole("");
    setErrEmail("");
    setErrUsername("");
    setErrName("");
    setErrConfirmPwd("");
  }, []);

  const handleUser = async (e) => {
    // add modal here.........
    e.preventDefault();
    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPwd,
      role: role,
      id_admin: auth.id,
    };
    const res = await axios.post("UsersController/store", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      fetchUsers();
      setOpen(false);
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPwd("");
      setRole("");
      setEmail("");
      console.log("User added");
    } else {
      console.log(res.data);
      setErrName(res.data.errors.name);
      setErrUsername(res.data.errors.username); 
      setErrEmail(res.data.errors.email);
      setErrPwd(res.data.errors.password);
      setErrConfirmPwd(res.data.errors.confirm_password);
      setErrRole(res.data.errors.role);
    }
    
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`UsersController/destroy/${id}`);
    if (res.status === 200) {
      fetchUsers();
      console.log("User deleted");
    }
  };


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
              <form onSubmit={handleUser}>
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
                            Add User
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
                                  ref={nameRef}
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  autoComplete="name"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errName ? errName : null}
                                </div>
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
                                  id="username"
                                  value={username}
                                  ref={usernameRef}
                                  onChange={(e) => setUsername(e.target.value)}
                                  autoComplete="username"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errUsername ? errUsername : null}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-6">
                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email
                                </label>
                                <input
                                  type="text"
                                  id="email"
                                  value={email}
                                  ref={emailRef}
                                  onChange={(e) => setEmail(e.target.value)}
                                  autoComplete="email"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errEmail ? errEmail : null}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-4 gap-6">
                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  autoComplete="name"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errPwd ? errPwd : null}
                                </div>
                              </div>
                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Confirm Password
                                </label>
                                <input
                                  type="password"
                                  id="confirmPwd"
                                  value={confirmPwd}
                                  onChange={(e) =>
                                    setConfirmPwd(e.target.value)
                                  }
                                  autoComplete="username"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errConfirmPwd ? errConfirmPwd : null}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-4 gap-6">
                              <div className="col-span-4 sm:col-span-2">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Role
                                </label>
                                <select
                                  id="role"
                                  value={role}
                                  onChange={(e) => setRole(e.target.value)}
                                  autoComplete="country-name"
                                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                >
                                  <option >Choose role ...</option>
                                  <option value="stockManager" >Stock Manager</option>
                                  <option value="agentCustomer" >Agent of Customer</option>
                                  <option value="shipManager" >Shipping Manager</option>
                                </select>
                                <div className="text-red-500 mb-3 text-sm">
                                  {errRole ? errRole : null}
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
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
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
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              created_at, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created User
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th scope="col" className="px-3 text-sm font-semibold text-gray-900">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((person) => (
                <tr key={person.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {person.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Created User</dt>
                      <dd className="mt-1 truncate text-gray-700">
                        {person.created_at}
                      </dd>
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {person.email}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {person.created_at}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {person.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {person.role === "stockManager" ? "Stock Manager" : ""}
                    {person.role === "agentCustomer" ? "Agent of Customer" : ""}
                    {person.role === "shipManager" ? "Shipping Manager" : ""}
                  
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => {
                        window.location.href = `/users/edit/${person.id}`;
                      }}
                      className="text-green-500 hover:text-green-700"
                    >
                     <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="text-red-500 hover:text-red-600"
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
    </>
  );
}
