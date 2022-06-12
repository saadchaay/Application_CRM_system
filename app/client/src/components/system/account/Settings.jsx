import { useState, useRef, useEffect } from "react";
import axios from "../../../api/axios";
import Axios from "axios";
import { Image } from "cloudinary-react";

export default function Example() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  const nameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errName, setErrName] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [displayUpload, setDisplayUpload] = useState(false);
  const [imgPrv, setImgPrv] = useState("");

  const handleImage = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImgPrv(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const id = auth.id;
    const formData = new FormData();
    formData.append("file", imgPrv);
    formData.append("upload_preset", "s7tgef8p");
    const response = await Axios.post("https://api.cloudinary.com/v1_1/maggie-7223/image/upload", formData);
    console.log(response);
    if(response.status === 200){ 
      const data = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        address: address,
        avatar: response.data.public_id,
        role: auth.role,
      };
      const res = await axios.put(
        "ProfileController/update/" + id,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(res.status === 201){
        localStorage.setItem("auth", JSON.stringify(res.data));
        setName("");
        setUsername("");
        setEmail("");
        setPhone("");
        setAddress("");
        console.log(res.data);
        setImgPrv("");
        setDisplayUpload(false);
      } else {
        console.log(res.data.errors.name);
        setErrName(res.data.errors.name);
        setErrUsername(res.data.errors.username);
        setErrEmail(res.data.errors.email);
        setErrPhone(res.data.errors.phone);
        setErrAddress(res.data.errors.address);
      }
    }
  };


  useEffect(() => {
    nameRef.current.focus();
    emailRef.current.focus();
    usernameRef.current.focus();
    phoneRef.current.focus();
    addressRef.current.focus();
  }, []);

  useEffect(() => {
    setErrName("");
    setErrUsername("");
    setErrEmail("");
    setErrPhone("");
    setErrAddress("");
  }, [name, username, email, phone, address]);

  return (
    <>
      {/* settings details */}
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 mt-8 w-full">
        <section aria-labelledby="payment-details-heading">
          <form onSubmit={handleSave}>
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
                      id="name"
                      ref={nameRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      placeholder={auth.name}
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
                      placeholder={auth.username}
                    />
                    <div className="text-red-500 mb-3 text-sm">
                      {errUsername ? errUsername : null}
                    </div>
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
                      id="email"
                      value={email}
                      autoComplete="email"
                      ref={emailRef}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={auth.email}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <div className="text-red-500 mb-3 text-sm">
                      {errEmail ? errEmail : null}
                    </div>
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
                      id="phone"
                      value={phone}
                      autoComplete="phone"
                      ref={phoneRef}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={auth.phone}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <div className="text-red-500 mb-3 text-sm">
                      {errPhone ? errPhone : null}
                    </div>
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
                      id="address"
                      value={address}
                      autoComplete="address"
                      ref={addressRef}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={auth.address}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <div className="text-red-500 mb-3 text-sm">
                      {errAddress ? errAddress : null}
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {!imgPrv ? (
                        "Profile Picture"
                      ) : (
                        <div className="flex justify-between w-1/2">
                          <span>Change Profile Picture</span>
                          <span
                            className="text-sm hover:cursor-pointer hover:text-black hover:underline"
                            onClick={() => [setDisplayUpload(false), setImgPrv(null)]}
                          >
                            Remove
                          </span>
                        </div>
                      )}
                    </label>
                    {!displayUpload ? (
                      <div className="flex justify-start items-center">
                        <Image
                            className="h-24 w-24 rounded-full"
                            cloudName="maggie-7223"
                            public_id={auth.avatar}
                        />
                        <button
                          type="submit"
                          onClick={() => setDisplayUpload(true)}
                          className="ml-6 bg-white border border-transparent border-gray-400 rounded-md shadow-md py-2 px-4 inline-flex justify-center text-md font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                        >
                          change
                        </button>
                      </div>
                    ) : !imgPrv ? (
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-1/2">
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
                                onChange={(e) => handleImage(e)}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img src={imgPrv} alt="picture_image" className="h-24 w-1/6" />
                    )}
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
