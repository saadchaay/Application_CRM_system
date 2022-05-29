import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_white_bg.png";
import axios from "axios";
import React from "react";



function Register() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPwd, setErrPwd] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrEmail("");
    setErrPwd("");
  }, [email, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: pwd,
    };
    const res = await axios.post(
      "http://localhost/fil_rouge_project/app/server/auth/AdminController/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);
    if (res.status === 201) {
      console.log(res.data);
      setEmail("");
      setPwd("");
    } else {
      if (res.data.errors) {
        setErrEmail(res.data.errors.email);
        setErrPwd(res.data.errors.password);
      }
      console.log(res.data.errors);
    }
  };

  return (
      <div className="flex flex-col md:flex-row w-full items-center justify-center">
        <div className="md:h-screen w-auto md:w-1/2 bg-gradient-to-tr bg-sky-800 to-purple-700 i justify-around items-center hidden md:flex">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl font-sans">
              <img src={logo} alt="logo" />
            </h1>
            <p className="text-white text-wrap text-center">Login to Your Account and Manage Your </p>
            <p className="text-white text-wrap text-center">E-commerce Business.</p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              <Link to="/" >Back Home</Link>
            </button>
          </div>
        </div>
        <div className="flex w-auto md:w-1/2 justify-center items-center bg-white mt-20 md:mt-0">
          <form
            className="flex flex-col justify-center items-center bg-white w-80 md:w-full"
            onSubmit={handleLogin}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Login Now
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-2 w-full md:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                ref={emailRef}
                className="pl-2 outline-none border-none"
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Username or Email"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errEmail ? errEmail : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 mb-2 rounded-xl w-full md:w-1/2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                sd
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder="Password"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errPwd ? errPwd : null}
            </div>

            <button
              type="submit"
              className="block w-full bg-sky-800 mt-4 py-2 rounded-xl text-white font-semibold mb-2 w-2/3 md:w-1/4"
            >
              Login
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              I don't have an account yet ? <Link to="/register">Sign up</Link>
            </span>
          </form>
        </div>
      </div>
  );
}

export default Register;
