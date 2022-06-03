import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo_white_bg.png";
import logoColor from "../../assets/images/logo.png";
import axios from "../../api/axios";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function Register() {
  const [open, setOpen] = React.useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errName, setErrName] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const [errConfirmPwd, setErrConfirmPwd] = useState("");

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
    setErrPwd("");
    setErrConfirmPwd("");
  }, [name, username, email, phone, address, pwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, username, email, pwd, confirmPwd, phone, address);
    const data = {
      name: name,
      username: username,
      email: email,
      password: pwd,
      phone: phone,
      address: address,
      confirm_password: confirmPwd,
    };
    const res = await axios.post(
      "auth/AdminController/register",
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
      setName("");
      setUsername("");
      setEmail("");
      setPwd("");
      setConfirmPwd("");
      setPhone("");
      setAddress("");
      setOpen(true);
    } else {
      if (res.data.errors) {
        setErrName(res.data.errors.name);
        setErrUsername(res.data.errors.username);
        setErrEmail(res.data.errors.email);
        setErrPhone(res.data.errors.phone);
        setErrAddress(res.data.errors.address);
        setErrPwd(res.data.errors.password);
        setErrConfirmPwd(res.data.errors.confirm_password);
      }
      console.log(res.data.errors);
    }
  };

  return (
    <div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="flex items-center justify-center"
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className="w-full max-w-lg p-5 px-10 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
              <div>
                <div className="flex justify-center items-center">
                  <img src={logoColor} alt="logo" className="w-1/2 mx-auto" />
                </div>
                <div className="flex flex-col justify-center items-center mt-5">
                  <h1 className="text-2xl font-bold text-center text-green-500">
                    Congratulations
                  </h1>
                  <p className="mt-3 font-bold">
                    Your registration has been successfully.
                  </p>
                  <p className="mt-3">
                    Our team will activate your account as soon as possible.
                  </p>
                  <p className="mt-3">Continue to check your email.</p>
                  <button className="mt-6 md:mb-0 bg-violet-600 border border-violet-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-violet-700">
                    <Link to="/">Back home</Link>
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      
      <div className=" flex flex-col md:flex-row w-full items-center">
        <div className="md:h-screen w-auto md:w-1/2 bg-gradient-to-tr bg-sky-800 to-purple-700 i justify-around items-center hidden md:flex">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-4xl font-sans">
              <img src={logo} alt="" />
            </h1>
            <p className="text-white mt-1 w-3/4">
              Get ready to scale your business and Join Us Now at GROW Your
              Business.
            </p>
            <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
              <Link to="/">Back Home</Link>
            </button>
          </div>
        </div>
        <div className="flex w-auto md:w-1/2 justify-center items-center bg-white mt-20 md:mt-0">
          <form
            className="flex flex-col justify-center items-center bg-white w-80 md:w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Register Now
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-2 w-full md:w-3/4">
              <svg
                className="h-5 w-5 text-gray-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="7" y1="15" x2="7.01" y2="15" />
                <line x1="11" y1="15" x2="13" y2="15" />
              </svg>
              <input
                ref={nameRef}
                className="pl-2 outline-none border-none w-full"
                type="text"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                id="name"
                value={name}
                placeholder="Full Name"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errName ? errName : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-2 w-full md:w-3/4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <input
                ref={usernameRef}
                className="pl-2 outline-none border-none w-full"
                type="text"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errUsername ? errUsername : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-2 w-full md:w-3/4">
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
                className="pl-2 outline-none border-none w-full"
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errEmail ? errEmail : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-2 w-full md:w-3/4">
              <svg
                className="h-5 w-5 text-gray-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
              <input
                ref={phoneRef}
                className="pl-2 outline-none border-none w-full"
                type="text"
                id="phone"
                autoComplete="off"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Phone Number"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errPhone ? errPhone : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 mb-2 rounded-xl w-full md:w-3/4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                ref={addressRef}
                className="pl-2 outline-none border-none w-full"
                type="text"
                id="address"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="Address"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errAddress ? errAddress : null}
            </div>

            <div className="flex items-center border-2 py-2 px-3 mb-2 rounded-xl w-full md:w-3/4">
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
                className="pl-2 outline-none border-none w-full"
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

            <div className="flex items-center border-2 py-2 px-3 mb-2 rounded-xl w-full md:w-3/4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPwd(e.target.value)}
                value={confirmPwd}
                placeholder="Confirm password"
              />
            </div>
            <div className="text-red-500 mb-3 text-sm">
              {errConfirmPwd ? errConfirmPwd : null}
            </div>

            <button
              type="submit"
              className="block w-full bg-sky-800 mt-4 py-2 rounded-xl text-white font-semibold mb-2 w-2/3 md:w-1/4"
            >
              Submit
            </button>
            <span className="text-sm ml-2">
              Already have an account ?
              <span className="hover:text-blue-500 cursor-pointer underline">
                <Link to="/login">Login</Link>
              </span>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
