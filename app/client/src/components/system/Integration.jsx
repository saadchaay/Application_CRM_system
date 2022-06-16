import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Delete } from "@material-ui/icons";

const API_KEY = "AIzaSyD8sJuOu8T7-LPBhUFbrGOKh_tzTUnj0xs";
const CLIENT_ID =
  "280216831650-f9dn7qig5117unbvtfsnlusk5kjda32l.apps.googleusercontent.com";
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
  const [createOne, setCreateOne] = useState(false);
  const [fileName, setFileName] = useState("");
  const [spreadsheet, setSpreadsheet] = useState([]);

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

  const createSpreedSheet = async (e) => {
    e.preventDefault();
    var accessToken = gapi.auth.getToken().access_token;
    console.log(accessToken);
    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + accessToken }),
        body: JSON.stringify({
          properties: {
            title: fileName,
          }
        }),
      }
    );
    if (response.status === 200) {
      response.json().then((res) => {
        console.log(res.spreadsheetId);
        axios.post("SheetsController/store", {
          id_admin: auth.id,
          fileName: fileName,
          spreadsheetId: res.spreadsheetId,
        }).then((res) => {
          console.log(res);
          alert("Spreadsheet created successfully");
          setCreateOne(false);
          setFileName("");
        });
      });
    }
    
  };

  const fetchAllFiles = async () => {
    const res = await axios.get("SheetsController/index/" + auth.id);
    console.log(res);
    setSpreadsheet(res.data);
  }

  const handleDelete = async (id) => {
    // e.preventDefault();
    const res = await axios.delete("SheetsController/delete/" + id);
    console.log(res);
    fetchAllFiles();
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: token.apiKey ? token.apiKey : API_KEY,
        client_id: token.clientId ? token.clientId : CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      });
    }
    gapi.load("client:auth2", start);
    fetchAllFiles();
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
                <div className="flex flex-col sm:justify-between sm:flex-row">
                  <button
                    onClick={(e) => HandleDisconnect(e)}
                    className="mt-3 text-white bg-red-700 hover:bg-red-800 rounded-md px-4 py-3 w-full sm:w-36"
                  >
                    <span>Disconnect</span>
                  </button>
                  {createOne ? (
                    <div className="flex flex-col justify-between w-full sm:w-auto sm:flex-row">
                      <div className="flex items-end">
                        <input
                          type="text"
                          id="title"
                          placeholder="File Name"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          autoComplete="title"
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm h-auto sm:py-4 mt-2"
                        />
                      </div>
                      <button
                        className="mt-2 ml-1 text-white bg-cyan-700 hover:bg-cyan-800 rounded-md px-3 py-3 whitespace-nowrap w-20"
                        onClick={createSpreedSheet}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full sm:w-auto">
                      <button
                        className="mt-3 text-white bg-cyan-700 hover:bg-cyan-800 rounded-md px-3 py-3 whitespace-nowrap flex-1"
                        // onClick={createSpreedSheet}
                      >
                        Add SpreedSheet
                      </button>
                      <button
                        className="mt-3 ml-1 text-white bg-cyan-700 hover:bg-cyan-800 rounded-md px-3 py-3 whitespace-nowrap"
                        onClick={() => setCreateOne(true)}
                      >
                        Create one
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
                  Sheet ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  File Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Spreadsheet ID
                </th>
                <th scope="col" className="px-3 text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {spreadsheet.map((sheet) => (
                <tr key={sheet.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    ## {sheet.id}
                  </td>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {sheet.fileName}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {sheet.spreadsheetId}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    
                    <button
                      onClick={() => handleDelete(sheet.id)}
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

      {/* Inputs for id client */}
    </>
  );
}
