import Navbar from "../../components/home/Navbar";


function Register() {
    return (
        <div>
            <Navbar />
            <div className="flex justify-around items-center w-10/12">
                <div className="w-1/2">
                    <h1 className="text-4xl font-bold">Register</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum odio nemo culpa! Ea aperiam voluptatum deserunt illum ab consectetur, corrupti aliquid. Quibusdam quaerat, odio iusto ipsam maxime sed iste. Earum!</p>
                </div>
                <div className="w-1/2">
                    <form action="" method="post">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-500">Username</label>
                            <input type="text" name="username" id="username" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-500">Email</label>
                            <input type="email" name="email" id="email" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">First Name</label>
                            <input type="text" name="firstname" id="firstname" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Last Name</label>
                            <input type="text" name="lastname" id="lastname" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Phone Number</label>
                            <input type="text" name="phone" id="phone" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Address</label>
                            <input type="text" name="address" id="address" className="border border-gray-500 p-2 rounded-md" />
                        </div>
                        <button>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;