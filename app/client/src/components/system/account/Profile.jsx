import {
  CogIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {

  return (
    <>
        {/* settings details */}
        <h1>Profile</h1>
    </>
  );
}

// export default function Orders() {
//     return (
//       <>
//         <main className="flex justify-center pb-8">
//             <h1 className="text-xl font-bold">
//               This is profile here
//             </h1>
//         </main>
//       </>
//     );
//   }


//  select option needed
{/* <div className="col-span-4 sm:col-span-2">
  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
    Country
  </label>
  <select
    id="country"
    name="country"
    autoComplete="country-name"
    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
  >
    <option>United States</option>
    <option>Canada</option>
    <option>Mexico</option>
  </select>
</div>; */}
