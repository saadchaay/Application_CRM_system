import { Link, useLocation } from "react-router-dom";
import { CogIcon, KeyIcon, UserCircleIcon,} from "@heroicons/react/outline";
  
  const subNavigation = [
    { name: "Profile", href: "/profile", icon: UserCircleIcon, current: false },
    { name: "Settings", href: "/settings", icon: CogIcon, current: false },
    { name: "Password", href: "/password", icon: KeyIcon, current: false },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function Example(props) {
    const location = useLocation();
    const path = location.pathname ;
    var title = "";

    switch (path) {
        case "/account/profile":
            subNavigation[0].current = true;
            subNavigation[1].current = false;
            subNavigation[2].current = false;
            title = "Account Details";
            break;
        case "/account/settings":
            subNavigation[0].current = false;
            subNavigation[1].current = true;
            subNavigation[2].current = false;
            title = "Account Settings";
            break;
        case "/account/password":
            subNavigation[0].current = false;
            subNavigation[1].current = false;
            subNavigation[2].current = true;
            title = "Password Setting";
            break;
        default:
            break;
    }
  
    return (
      <>
        <div className="h-full">
          <main className="max-w-7xl mx-auto pb-10 lg:py-2 lg:px-8">
            <div className="flex flex-col justify-between items-start">
              <div className="px-4 mt-4">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {title}
                </h2>
              </div>
  
              {/* <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3"> */}
              <nav className="flex mt-5 border-y py-4 px-4 w-full">
                {subNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={`/account${item.href}`}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-cyan-600 hover:bg-white"
                        : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                      "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-cyan-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
              {/* </aside> */}
  
            {props.profile}
            {props.settings}
            {props.password}
              
            </div>
          </main>
        </div>
      </>
    );
  }

  