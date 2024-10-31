import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faCompass,
  faNewspaper,
  faBlog,
  faUser,
  faCreditCard,
  faSignOutAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/authContext";
import logo from "../assets/images/logo.webp";
import { CiWallet } from "react-icons/ci";

const NavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
  >
    {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
    {children}
  </Link>
);

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
  };

  const navItems = [
    { label: "Home", to: "/", icon: faHome },
    { label: "Introduction", to: "/introduction", icon: faBook },
    { label: "Feng Shui", to: "/feng-shui", icon: faCompass },
    { label: "Contact", to: "/contact", icon: faHeadset },
    { label: "Blog", to: "/blog", icon: faBlog },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 border border-gray-300 rounded-md transition-colors"
                >
                  ĐĂNG NHẬP
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  ĐĂNG KÝ
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {user.name}
                  </span>
                  <span className="border border-gray-300 rounded px-2 py-1">
                    <CiWallet />{" "}
                    {new Intl.NumberFormat("vi-VN").format(user?.balance)}đ
                  </span>
                </Menu.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                        >
                          <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/billing"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                        >
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className="w-4 h-4"
                          />
                          Billing
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } flex items-center gap-2 px-4 py-2 text-sm text-red-600 w-full text-left`}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="w-4 h-4"
                          />
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
