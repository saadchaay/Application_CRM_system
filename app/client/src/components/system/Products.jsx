import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";
import { Dialog, Transition } from "@headlessui/react";
import Switch from "@material-ui/core/Switch";
import Drop from "../helpers/Drop";

const statusStyles = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imgPrv, setImgPrv] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [products, setProducts] = useState([]);
  // product data::
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const [errors, setErrors] = useState({});

  // const [errAvatar, setErrAvatar] = useState('');
  // const [errTitle, setErrTitle] = useState('');
  // const [errDescription, setErrDescription] = useState('');
  // const [errQuantity, setErrQuantity] = useState('');
  // const [errPrice, setErrPrice] = useState('');
  // const [errCategory, setErrCategory] = useState('');
  // const [errColor, setErrColor] = useState([]);
  // const [errSize, setErrSize] = useState([]);

  // handle image preview
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgPrv(reader.result);
      setAvatar(file.name);
    };
    reader.readAsDataURL(file);
  };

  // handle change select input
  const [colorsSelected, setColorsSelected] = useState(null);
  const [sizesSelected, setSizesSelected] = useState(null);

  const handleChangeColors = (selected) => {
    setColorsSelected(selected);
  };
  const handleChangeSizes = (selected) => {
    setSizesSelected(selected);
  };

  // fetch all products
  const fetchProducts = async () => {
    const type = auth.role === "admin" ? "admin" : "user";
    const res = await axios.get(
      "ProductsController/index/" + auth.id + "/" + type
    );
    if (res) {
      setProducts(res.data.data);
      setChecked(res.data.data.map((item) => item.status));
      setCategories(res.data.categories);
      setColors(res.data.properties.colors);
      setSizes(res.data.properties.sizes);
    } else {
      console.log("There's no product");
    }
  };

  // add product
  const handleProduct = async (e) => {
    // add modal here.........
    e.preventDefault();
    if (
      avatar === "" ||
      title === "" ||
      description === "" ||
      quantity === "" ||
      price === "" ||
      category === ""
      // colorsSelected === null ||
      // sizesSelected === null
    ) {
      setErrors({
        avatar: "Avatar is required",
        title: "Title is required",
        description: "Description is required",
        quantity: "Quantity is required",
        price: "Price is required",
        category: "Category is required",
        // color: "Color is required",
        // size: "Size is required",
      });
    } else {
      const product = {
        avatar: avatar,
        title: title,
        description: description,
        quantity: quantity,
        price: price,
        category: category,
        color: colorsSelected,
        size: sizesSelected,
      };
      console.log(product);
    }
  };

  // handle change
  const handleChange = async (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);

    const newProducts = products.map((product, i) => {
      if (i === index) {
        product.status = newChecked[index] ? true : false;
      }
      return product;
    });

    setProducts(newProducts);

    const id = newProducts[index].id;
    const res = await axios.put("ProductsController/changeStatus/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === "success") {
      console.log(res.data.status);
    }
  };

  useEffect(() => {
    fetchProducts();
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

          <div className="fixed inset-0 z-10 mb-3">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <form onSubmit={handleProduct}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-screen">
                    <div className="bg-white pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex">
                        <div className="flex mt-3 text-center sm:mt-0 mx-3 sm:text-left">
                          <div>
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
                                    Product name
                                  </label>
                                  <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoComplete="title"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.title ? errors.title : null}
                                  </div>
                                </div>

                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Category
                                  </label>
                                  <select
                                    id="role"
                                    value={category}
                                    onChange={(e) =>
                                      setCategory(e.target.value)
                                    }
                                    autoComplete="country-name"
                                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  >
                                    <option>Choose category ...</option>
                                    {categories.map((category) => (
                                      <option
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.title}
                                      </option>
                                    ))}
                                  </select>
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.category ? errors.category : null}
                                  </div>
                                </div>
                                
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-6">
                                <div className="col-span-4 sm:col-span-2">
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
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    autoComplete="description"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.description
                                      ? errors.description
                                      : null}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 grid grid-cols-4 gap-6">
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Quantity
                                  </label>
                                  <input
                                    type="text"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(e.target.value)
                                    }
                                    autoComplete="quantity"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.quantity ? errors.quantity : null}
                                  </div>
                                </div>
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    autoComplete="price"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                  />
                                  <div className="text-red-500 mb-3 text-sm">
                                    {errors.price ? errors.price : null}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700">
                                  Cover photo
                                </label>
                                {imgPrv ? (
                                  <img
                                    src={imgPrv}
                                    alt="preview"
                                    className="w-60 h-auto object-cover"
                                  />
                                ) : (
                                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                      <svg
                                        className="mx-auto h-8 w-8 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div className="flex text-sm text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file</span>
                                          <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={(e) =>
                                              handleImageChange(e)
                                            }
                                          />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="text-red-500 mb-3 text-sm">
                                  {errors.avatar ? errors.avatar : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div>
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-bold text-gray-900"
                            >
                              Properties
                            </Dialog.Title>
                            <div className="mt-2">
                              <div className="mt-3 grid grid-cols-2 gap-6">
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Colors
                                  </label>
                                  <Drop
                                    data={colors}
                                    handleChangeSelected={handleChangeColors}
                                    selectData={colorsSelected}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-2">
                              <div className="mt-3 grid grid-cols-2 gap-6">
                                <div className="col-span-4 sm:col-span-2">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Sizes
                                  </label>
                                  <Drop
                                    data={sizes}
                                    handleChangeSelected={handleChangeSizes}
                                    selectData={sizesSelected}
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}

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
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Products in your account including their name of
              product, description and date of created product.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <form>
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
                    Category
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Product name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((item, index) => (
                  <tr key={item.id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      ## {item.id}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Category</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {categories.find(
                            (category) => category.id === item.id_category
                          ).title
                            ? categories.find(
                                (category) => category.id === item.id_category
                              ).title
                            : ""}
                        </dd>
                        <dt className="sr-only sm:hidden">Product name</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">
                          {item.title}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {categories.find(
                        (category) => category.id === item.id_category
                      ).title
                        ? categories.find(
                            (category) => category.id === item.id_category
                          ).title
                        : ""}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {item.title}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <span
                        className={classNames(
                          item.status
                            ? statusStyles["active"]
                            : statusStyles["inactive"],
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        )}
                      >
                        {item.status ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {item.price}
                    </td>
                    <td className="py-4 pr-4 text-right text-sm font-medium sm:pr-6">
                      <span>
                        <Switch
                          checked={checked[index]}
                          onChange={() => handleChange(index)}
                          color="primary"
                          name="checkedB"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}
