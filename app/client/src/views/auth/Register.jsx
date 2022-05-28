import Navbar from "../../components/home/Navbar";
import logo from "../../assets/images/logo_white_bg.png";

function Register() {
    return (
        <div>
            {/* <Navbar /> */}
            {/* <div className="flex items-center justify-center w-10/12 mt-6 ml-0">
                <div className="w-1/2">
                    <h1 className="text-4xl font-bold">Register</h1>
                    <p className="w-60">Get ready to scale your business and Join Us Now at CRMsystem.</p>
                </div>
                <div className="w-1/2 border px-10 py-5">
                    <form action="" method="post">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-500">Username</label>
                            <input type="text" name="username" id="username" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-500">Email</label>
                            <input type="email" name="email" id="email" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">First Name</label>
                            <input type="text" name="firstname" id="firstname" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Last Name</label>
                            <input type="text" name="lastname" id="lastname" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Phone Number</label>
                            <input type="text" name="phone" id="phone" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Address</label>
                            <input type="text" name="address" id="address" className="border-b border-gray-500 p-2" placeholder="Entrer Your First Name" />
                        </div>
                        <button>
                            Register
                        </button>
                    </form>
                </div>
            </div> */}
            <div class=" flex flex-col md:flex-row w-full items-center">
                <div class="md:h-screen w-auto md:w-1/2 bg-gradient-to-tr bg-sky-800 to-purple-700 i justify-around items-center hidden md:flex">
                    <div className="flex flex-col justify-center items-center">
                        <h1 class="text-white font-bold text-4xl font-sans">
                            <img src={logo} alt="" />
                        </h1>
                        <p class="text-white mt-1 w-3/4">Get ready to scale your business and Join Us Now at GROW Your Business.</p>
                        <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                    </div>
                </div>
                <div class="flex w-auto md:w-1/2 justify-center items-center bg-white mt-20 md:mt-0">
                    <form class="bg-white">
                    <h1 class="text-gray-800 font-bold text-2xl mb-1">Welcome !</h1>
                    <p class="text-sm font-normal text-gray-600 mb-7">Register Now</p>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-90">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
                    </div>
                    <button type="submit" class="block w-full bg-sky-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                    </form>
                </div>
                </div>
            </div>
    );
}

export default Register;