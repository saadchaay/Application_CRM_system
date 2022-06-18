import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Timeline,
    PermIdentity,
    Storefront,
    MonetizationOn,
    Home,
    SupervisorAccount,
    Ballot,
    Category,
    AccountTree,
  } from "@material-ui/icons";
import logo from "../assets/images/logo.v2.png";


const navigation = [
    { name: 'Home', to: '/dashboard', icon: Home, current: true },
    { name: 'Analytics', to: '/analytics', icon: Timeline, current: false },
    { name: 'Sales', to: '/sales', icon: MonetizationOn, current: false },
  ]


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
export default function Sidebar(allowedRoles) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const [secondaryNavigation, setSecondaryNavigation] = useState([]);
    const [thirdNavigation, setThirdNavigation] = useState([]); 
    
    const handleNavigation = () => {
        switch (auth.role) {
            case "agentCustomer":
                setSecondaryNavigation([
                    { name: 'Customers', to: '/customers', icon: PermIdentity },
                    { name: 'Orders', to: '/orders', icon: Ballot },
                ]);
                break;
            case "shipManager":
                setSecondaryNavigation([
                    { name: 'Orders Should Track', to: '/tracking-order', icon: Ballot },
                ]);
                break
            case "stockManager":
                setSecondaryNavigation([
                    { name: 'Products', to: '/products', icon: Storefront },
                    { name: 'Categories', to: '/categories', icon: Category },
                ]);
                break;
            default:
                setSecondaryNavigation([
                    { name: 'Users', to: '/users', icon: SupervisorAccount },
                    { name: 'Customers', to: '/customers', icon: PermIdentity },
                    { name: 'Orders', to: '/orders', icon: Ballot },
                    { name: 'Products', to: '/products', icon: Storefront },
                    { name: 'Categories', to: '/categories', icon: Category },
                ]);
                setThirdNavigation([
                    {name: 'Integration', to:'/integration', icon: AccountTree},
                ])
                break;
        }
    }

    useEffect(() => {
        handleNavigation();
    }, [auth.role]);
    return (
        <>
        {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                <img
                    src={logo}
                    alt="grow-yb logo"
                    width={180}
                    height={40}
                />
                </div>
                <nav
                className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
                >
                <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                    <span
                        key={item.name}
                        className={classNames(
                        item.current
                            ? "bg-cyan-800 text-white"
                            : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                        "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                    >
                        <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                        />
                        <Link to={item.to}>{item.name}</Link>
                    </span>
                    ))}
                </div>
                <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (

                        <span
                            key={item.name}
                            className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                            >
                            <item.icon
                                className="mr-4 h-6 w-6 text-cyan-200"
                                aria-hidden="true"
                            />
                            <Link to={item.to}>
                                {item.name}
                            </Link>
                        </span>
                    ))}
                    </div>
                </div>
                <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                    {thirdNavigation.map((item) => (

                        <span
                            key={item.name}
                            className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                            >
                            <item.icon
                                className="mr-4 h-6 w-6 text-cyan-200"
                                aria-hidden="true"
                            />
                            <Link to={item.to}>
                                {item.name}
                            </Link>
                        </span>
                    ))}
                    </div>
                </div>
                </nav>
            </div>
        </>
    );
}
