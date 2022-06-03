import { useState, useEffect } from "react";
import axios from "../../../api/axios";
  
  export default function Example() {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [errOld, setErrOld] = useState("");
    const [errNew, setErrNew] = useState("");
    const [errConfirmPwd, setErrConfirmPwd] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSave = async (e) => {
      e.preventDefault();
      const id = auth.id;
      const data = {
        old_password: oldPwd,
        new_password: newPwd,
        confirm_password: confirmPwd
      };
      const res = await axios.put("ProfileController/update_password/"+id, 
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (res.status === 201) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(res);
        setSuccess("Password changed successfully.");
        setOldPwd("");
        setNewPwd("");
        setConfirmPwd("");
      } else {
        console.log(res);
        setSuccess("");
        setErrOld(res.data.errors.old_password);
        setErrNew(res.data.errors.password);
        setErrConfirmPwd(res.data.errors.confirm_password);
        if(res.data.errors){
          setError(res.data.errors);
        } else {
          setError(res.data);
        }
      }
    };

    useEffect(() => {
      setErrOld("");
      setErrNew("");
      setErrConfirmPwd("");
      setError("");
    }, [ oldPwd, newPwd, confirmPwd]);


  
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
                        Update Password
                      </h2>
                    </div>
                    <div className="text-red-500 text-sm my-3">
                        { 
                          error ? error : (errOld ? errOld : (errNew ? errNew : (errConfirmPwd ? errConfirmPwd : null)))
                        }
                    </div>
                    <div className="text-green-600 text-sm my-3">
                        { 
                          success ? success : null
                        }
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
                          id="old_password"
                          onChange={(e) => setOldPwd(e.target.value)}
                          value={oldPwd}
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
                          id="new_password"
                          onChange={(e) => setNewPwd(e.target.value)}
                          value={newPwd}
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
                          if="confirm_password"
                          onChange={(e) => setConfirmPwd(e.target.value)}
                          value={confirmPwd}
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
  