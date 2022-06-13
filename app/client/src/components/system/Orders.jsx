import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from "react";

const API_KEY = "AIzaSyD6qcc_ly4bgpxHw8pDc3OnR_9LlHqqgs4";
const CLIENT_ID =
  "902170722306-736ta1oeknlfjhj0gvv4ug1ga99li3c7.apps.googleusercontent.com";
const SCOPED = "https://www.googleapis.com/auth/drive";

export default function Orders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [isLoggined, setIsLoggined] = useState(true);

  const responseGoogle = (response) => {
    console.log(response);
    setIsLoggined(true);
  }

  const CreateOne = () => {
    console.log(gapi);
  }

  useEffect(() => {
    function start(){
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPED
      });
    }
    start();
    gapi.load("client:auth2", start);
  })

  return (
    <>
      <main className="flex justify-center pb-8">
        <h1 className="text-xl font-bold">
          <button
            className="text-white bg-gray-400 rounded-md px-3 py-4 hover:bg-gray-500"
            onClick={CreateOne}
          >
            Create new File sheet
          </button>
          <GoogleLogin 
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

        </h1>
      </main>
    </>
  );
}
