import Navbar from "../../components/home/Navbar";
import logo from "../../assets/images/logo_white_bg.png";

function Register() {
    return (
        <div>
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
                    <form class="flex flex-col justify-center items-center bg-white md:w-full">
                        <h1 class="text-gray-800 font-bold text-2xl mb-1">Welcome !</h1>
                        <p class="text-sm font-normal text-gray-600 mb-7">Register Now</p>

                        <div class="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-full md:w-3/4">
                            <svg class="h-5 w-5 text-gray-400"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="3" />  <line x1="3" y1="10" x2="21" y2="10" />  <line x1="7" y1="15" x2="7.01" y2="15" />  <line x1="11" y1="15" x2="13" y2="15" />
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" placeholder="Full Name" />
                        </div>

                        <div class="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-full md:w-3/4">
                            <svg class="h-5 w-5 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" placeholder="Username" />
                        </div>

                        <div class="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-full md:w-3/4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input class="pl-2 outline-none border-none" type="email" name="" placeholder="Email Address" />
                        </div>

                        <div class="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-full md:w-3/4">
                            <svg class="h-5 w-5 text-gray-400"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                <path stroke="none" d="M0 0h24v24H0z"/>  
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" placeholder="Phone Number" />
                        </div>

                        <div class="flex items-center border-2 py-2 px-3 rounded-xl w-full md:w-3/4">
                            <svg class="h-5 w-5 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" placeholder="Address" />
                        </div>
                        
                        <button type="submit" class="block w-full bg-sky-800 mt-4 py-2 rounded-xl text-white font-semibold mb-2 w-2/3 md:w-1/4">Submit</button>
                        <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already have an account ?</span>
                    </form>
                </div>
                </div>
            </div>
    );
}

export default Register;