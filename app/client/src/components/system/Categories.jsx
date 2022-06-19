import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";
import { Dialog, Transition } from "@headlessui/react";
import EditCategory from "../helpers/EditCategory";
import HandleCategory from "../helpers/HandleCategory";

export default function Example() {
  const [categories, setCategories] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [editData, setEditData] = useState({
    id_creator: auth.id,
    type: auth.role === "admin" ? "admin" : "user",
    title: "",
    description: "",
  });

  const titleRef = useRef();
  const descriptionRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errTitle, setErrTitle] = useState("");
  const [errDescription, setErrDescription] = useState("");

  const fetchCategories = async () => {
    const id = auth.role === "admin" ? auth.id : auth.id_admin;
    const res = await axios.get(
      "CategoriesController/index/" +id
    );
    if (res) {
      setCategories(res.data);
      console.log(res.data);
    } else {
      console.log("There's no category");
    }
  };

  useEffect(() => {
      fetchCategories();
      setErrTitle("");
      setErrDescription("");
  }, []);

  const handleClick = async (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);
  };
  const handleCancel = (event) => {
    event.preventDefault();
    setEditItemId(null);
  };

  const handleCategory = async (e) => {
    // add modal here.........
    e.preventDefault();
    if (title === "") {
      setErrTitle("Name is required");
    } else if (description === "") {
      setErrDescription("Description is required");
    } else {
      const data = {
        id_creator: auth.id,
        type: auth.role === "admin" ? "admin" : "user",
        title: title,
        description: description,
      };
      const res = await axios.post(
        "CategoriesController/store",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        fetchCategories();
        setOpen(false);
        setTitle("");
        setDescription("");
        console.log("Category added");
      } else {
        console.log(res.data);
      }
    }
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newData = { ...editData };
    newData[fieldName] = fieldValue;
    setEditData(newData);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      "CategoriesController/update/" + editItemId,
      JSON.stringify(editData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 201) {
      fetchCategories();
      setTitle("");
      setDescription("");
      console.log("Category updated");
      setEditItemId(null);
    } else {
      console.log(res.data);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`CategoriesController/destroy/${id}`);
    if (res.data) {
      fetchCategories();
      console.log("Category deleted");
    } else {
      console.log("Category not deleted");
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
              <form onSubmit={handleCategory}>
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
                            Add Category
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="mt-3 flex flex-col w-80">
                              <div className="col-span-4 sm:col-span-12">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id="title"
                                  ref={titleRef}
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  autoComplete="title"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errTitle ? errTitle : null}
                                </div>
                              </div>
                              <div className="col-span-4 sm:col-span-12">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Description
                                </label>
                                <textarea
                                  type="text"
                                  id="description"
                                  value={description}
                                  ref={descriptionRef}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  autoComplete="description"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                                <div className="text-red-500 mb-3 text-sm">
                                  {errDescription ? errDescription : null}
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
            <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Categories in your account including their name
              of category, description and date of created category.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Category
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <form onSubmit={handleUpdate}>
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
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {categories.map((item) => (
                  <Fragment>
                    {editItemId === item.id ? (
                      <EditCategory
                        item={item}
                        handleCancel={handleCancel}
                        handleEditChange={handleEditChange}
                      />
                    ) : (
                      <HandleCategory
                        item={item}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                      />
                    )}

                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}
