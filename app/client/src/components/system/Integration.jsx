import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

export default function Integration() {
  const [openForm, setOpenForm] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [data, setData] = useState({});
  const [buttonGoogle, setButtonGoogle] = useState(false);

  const handleGoogle = () => {
    if (!clientId || !clientSecret) {
      alert("Please enter client id and client secret");
      return;
    }
    console.log(clientId);
    console.log(clientSecret);
    setData({
      clientId: clientId,
      clientSecret: clientSecret,
    });
    // setButtonGoogle(true);
    setClientId("");
    setClientSecret("");
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
                  { !data.clientId ? (
                    <input
                      type="text"
                      id="title"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      autoComplete="title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  ) : (
                    data.clientId
                  )}
                </div>
                <div className="my-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CLIENT Secret
                  </label>
                  { !data.clientSecret ? (
                    <input
                      type="text"
                      id="title"
                      value={clientSecret}
                      onChange={(e) => setClientSecret(e.target.value)}
                      autoComplete="title"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  ) : (
                    data.clientSecret
                  )}
                </div>
                <div className=" flex justify-start mt-10">
                  { data.clientId ? (
                    <GoogleLogin
                      className="rounded-circle"
                      icon={false}
                      clientId={process.env.REACT_APP_CLIENT_ID}
                      buttonText=""
                      // onSuccess={this.responseGoogle}
                      // onFailure={this.responseGoogle}
                    />
                  ) : (
                    <button onClick={handleGoogle}>
                      <span className="text-white bg-cyan-600 hover:bg-cyan-700 rounded-md px-4 py-3 ">
                        Continue
                      </span>
                    </button>
                  )}

                  <button onClick={() => setOpenForm(false)} className="mx-2">
                    <span className="text-gray-600 bg-white border hover:bg-gray-200 rounded-md px-4 py-3">
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
