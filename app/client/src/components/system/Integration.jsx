import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const API_KEY = "AIzaSyCER60a4a5mEevpsH8uE__5G4kz1vSUpuQ";
const CLIENT_ID = "902170722306-6cbiq8gv13ft9vm91tuk0s99ableif54.apps.googleusercontent.com";
const Secret = "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";
const SCOPE = "https://www.googleapis.com/auth/drive";

const transactions = [
  {
    id: "AAPS0L",
    customer: "saad chaay",
    phone: "+212615207417",
    city: "Rabat",
    date: "02/01/2020",
    status: "Pending",
    total: "$4,397.00",
  },
  // More transactions...
];
export default function Integration() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [openForm, setOpenForm] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [data, setData] = useState({});
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const onSuccess = (response) => {
    console.log(response);
    const dataJson = {
      admin: auth.id,
      token: response.tokenId,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      apiKey: data.apiKey,
    };
    axios.post("ProfileController/integration", dataJson).then((res) => {
      console.log(res);
      setToken(dataJson);
      localStorage.setItem("token", JSON.stringify(dataJson));
    });
    // start(dataJson);
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
        apiKey: apiKey,
      });
      setClientId("");
      setClientSecret("");
      setApiKey("");
    }
  };

  const HandleDisconnect = (e) => {
    e.preventDefault();
    axios
      .delete("ProfileController/deleteIntegration/" + auth.id)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        setToken(null);
        setData({});
        setOpenForm(false);
      });
  };

  const createSpreedSheet = (e) => {
    e.preventDefault();
    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'scope': SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
    console.log(gapi);
    var accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken);
    fetch("https://docs.googleapis.com/v1/documents", {
      method: "POST",
      headers: new Headers({ 'Authorization': 'Bearer ' +accessToken }),
    }).then((res) => {
      return res.json();
    }).then( function(val){
      console.log(val);
      // console.log(val.spreedsheets.id);
    });

  };
  function makeApiCall() {
    var spreadsheetBody = {
      // TODO: Add desired properties to the request body.
    };

    var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
    request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });
  };
  function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
      makeApiCall();
    }
  };
  useEffect(() => {
    gapi.auth2.getAuthInstance().signIn();
    // function start(token) {
    //   gapi.client.init({
    //     apiKey: token.apiKey,
    //     client_id: token.clientId,
    //     scope: "https://www.googleapis.com/auth/drive",
    //   });
    // }
    // console.log(token);
    // gapi.load('client:auth2', start);
  });

  return (
    <>
      <div className="flex-1 lg:border-t pt-4 mx-3">
        <div className="bg-white rounded-3xl border shadow-md p-8 w-full sm:w-full">
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
            {!token ? (
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
                    <div className="my-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        API KEY
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
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
                      <button
                        onClick={() => setOpenForm(false)}
                        className="mx-2"
                      >
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
                          <button
                            className="text-white bg-cyan-500 hover:bg-cyan-700 py-2 px-3 rounded-lg"
                            onClick={renderProps.onClick}
                          >
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
            ) : (
              <div className="flex flex-col">
                <div className="text-cyan-600 text-md">
                  Your Account is connected with Google Sheets
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={(e) => HandleDisconnect(e)}
                    className="mt-3 w-36 text-white bg-red-700 hover:bg-red-800 rounded-md px-4 py-3"
                  >
                    <span>Disconnect</span>
                  </button>
                  <div className="w-auto">
                    <button
                      className="mt-3 text-white bg-cyan-700 hover:bg-cyan-800 rounded-md px-3 py-3 whitespace-nowrap w-auto"
                      // onClick={createSpreedSheet}
                    >
                      Add SpreedSheet
                    </button>
                    <button
                      className="mt-3 ml-1 text-white bg-cyan-700 hover:bg-cyan-800 rounded-md px-3 py-3 whitespace-nowrap w-auto"
                      onClick={createSpreedSheet}
                    >
                      Create one
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inputs for id client */}
    </>
  );
}
