import { ScaleIcon } from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";

const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];

const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Main() {
  return (
    <>
      <main className="flex-1 pb-8">
        {/* Page header */}
        This is user here
      </main>
    </>
  );
}
