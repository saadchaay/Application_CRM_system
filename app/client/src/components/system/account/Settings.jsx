import { useState, useRef, useEffect } from "react";
import axios from "../../../api/axios";

  
  export default function Example() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const [open, setOpen] = useState(false);

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

    const handleSave = async (e) => {
      e.preventDefault();
      const id = auth.id;
      const data = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        address: address,
      };
      const res = await axios.put("ProfileController/update/"+id, 
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (res.data) {
        localStorage.setItem("another", JSON.stringify(res.data));
        console.log(res);
      }


    };

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
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          placeholder={auth.name}
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
                          id="username"
                          ref={usernameRef}
                          onChange={(e) => setUsername(e.target.value)}
                          autoComplete="username"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          placeholder={auth.username}
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
                          id="email"
                          autoComplete="email"
                          ref={emailRef}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={auth.email}
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
                          id="phone"
                          autoComplete="phone"
                          ref={phoneRef}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={auth.phone}
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
                          id="address"
                          autoComplete="address"
                          ref={addressRef}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={auth.address}
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
  