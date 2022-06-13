import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";

export default function Integration() {
  const [openForm, setOpenForm] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handleGoogle = async () => {
    console.log("google");
    console.log(clientId);
    console.log(clientSecret);
  };

  return (
    <>
      <div className="flex-1 min-w-0 lg:border-t pt-4 mx-3">
        <div className="bg-white rounded-3xl border shadow-xl p-8 w-full sm:w-3/6">
          <div className="flex justify-between items-center mb-4">
            <img
              src="https://cdn.neow.in/news/images/uploaded/2019/10/1570089797_google-sheets_story.jpg"
              alt=""
              className="w-32"
            />
            <div className="ml-1">
              <span className="font-bold text-cyan-600">
                {" "}
                Linked Your app with Google sheet{" "}
              </span>
              <br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">
                Manage all your order with google sheets
              </span>
            </div>
          </div>
          <div>
            {openForm ? (
              <div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CLIENT ID
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    autoComplete="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CLIENT Secret
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    autoComplete="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
                <div className="mt-3">
                  <button onClick={handleGoogle}>
                    <span className="text-white bg-cyan-600 hover:bg-cyan-700 rounded-md px-4 py-2">
                      Save
                    </span>
                  </button>
                  <button onClick={() => setOpenForm(false)} className="mx-2">
                    <span className="text-gray-600 bg-white border hover:bg-gray-200 rounded-md px-4 py-2">
                      Cancel
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setOpenForm(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Connect Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Inputs for id client */}
    </>
  );
}
