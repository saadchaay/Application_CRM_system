import { useState, useEffect, Fragment, useRef } from "react";
import axios from "../../api/axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import e from "express";

export default function Integration() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const [openForm, setOpenForm] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [data, setData] = useState({});
  const [disconnect, setDisconnect] = useState(false);
  const [token, setToken] = useState("");

  const onSuccess = (response) => {
    console.log(response);
    const dataJson = {
      admin: auth.id,
      token: response.tokenId,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
    };
    axios.post("ProfileController/integration", dataJson).then((res) => {
      console.log(res);
      localStorage.setItem("token", response.tokenId);
    });
    setToken(response.tokenId);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  const handleGoogle = () => {
    if (!clientId || !clientSecret) {
      alert("Please enter client id and client secret");
      return;
    } else {
      console.log(clientId);
      console.log(clientSecret);
      setData({
        clientId: clientId,
        clientSecret: clientSecret,
      });
      setClientId("");
      setClientSecret("");
    }
  };

  const HandleDisconnect = () => {
    e.preventDefault();
    axios.delete("ProfileController/deleteIntegration/" + auth.id).then((res) => {
      console.log("Your account has been disconnected");
      setDisconnect(true);
      localStorage.removeItem("token");
    });
  }
  return (
    <>
      <div className="flex-1 lg:border-t pt-4 mx-3">
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

            {
              !tokenData   ? 
                  openForm ? (
                  !data.clientId && !data.clientSecret ? (
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
                      <div className=" flex justify-start mt-10">
                        <button onClick={handleGoogle}>
                          <span className="text-white bg-cyan-600 hover:bg-cyan-700 rounded-md px-4 py-3 ">
                            Continue
                          </span>
                        </button>
                        <button onClick={() => setOpenForm(false)} className="mx-2">
                          <span className="text-gray-600 bg-white border hover:bg-gray-200 rounded-md px-4 py-3">
                            Cancel
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-cyan-600 text-md">
                        Your Client ID and Client Secret Id has been added
                      </span>
                      <div className=" flex justify-start mt-4">
                        <GoogleLogin
                          render={(renderProps) => (
                            <button className="text-white bg-cyan-500 hover:bg-cyan-700 py-2 px-3 rounded-lg" onClick={renderProps.onClick}>
                              Connect Account
                            </button>
                          )}
                          buttonText=""
                          icon={false}
                          clientId={data.clientId}
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => setOpenForm(true)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Connect Now
                  </button>
                )
                : (
                  <div className="flex flex-col">
                    <div className="text-cyan-600 text-md">
                      Your Account is connected with Google Sheets
                    </div>
                    <button onClick={(e) => HandleDisconnect(e)} className="mt-3 w-36 text-white bg-cyan-600 hover:bg-cyan-700 rounded-md px-4 py-3">
                      <span>
                        Disconnect
                      </span>
                    </button>
                </div>
                )
            }
          </div>
        </div>
      </div>

      {/* Inputs for id client */}
    </>
  );
}
