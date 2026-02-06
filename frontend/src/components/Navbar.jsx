
import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [profileDropDown, useProfileDropDown] = useState(false);
  const { isLoggedIn, userRole } = useContext(AuthContext)

  const dropdownHandle = () => {
    useProfileDropDown(!profileDropDown)
  }
  return (
    <nav className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className=" sm:ml-20 sm:block">
              <div className="flex space-x-8">
                { userRole == "customer" &&
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                }
                { userRole == "customer" ?
                  <Link to="" className="text-white">
                    Products
                  </Link> :
                  <Link to="/supplier-products" className="text-white">
                    My Products
                  </Link>
                }
                { userRole == "customer" ?
                  <Link to="" className="text-white">
                    My Orders
                  </Link> :
                  <Link to="" className="text-white">
                    Orders Recieved
                  </Link>
                }
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}

            <div className="relative ml-3">
              <button className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={dropdownHandle}>
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </button>

              {
                profileDropDown &&
                <div
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your profile
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Settings
                    </a>
                  </div>
                  <div>
                    <Link
                      to='/login'
                      className="block px-4 py-2 text-sm text-white bg-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >{
                        isLoggedIn ? "Logout" : "Sign In/ Sign UP"
                      }
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
