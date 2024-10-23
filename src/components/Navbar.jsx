import { Avatar, Dropdown, Menu } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    const res = await axios.post(
      "http://localhost:5222/api/v1/authenticate/logout"
    );
    toast.success(res.data.message);
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        {user ? <Link to={`/customer/profile`}>Profile</Link> : null}
      </Menu.Item>
      <Menu.Item key="billing">
        {user ? <Link to={`/billing`}>Billing</Link> : null}
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-16 w-auto cursor-pointer"
                src={logo}
                alt="SGL Logo"
              />
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">TRANG CHỦ</NavLink>
              <NavLink to="/about">GIỚI THIỆU</NavLink>
              <NavLink to="/projects">DỰ ÁN</NavLink>
              <NavLink to="/services">DỊCH VỤ</NavLink>
              <NavLink to="/blog">BLOG</NavLink>
              <NavLink to="/contact">LIÊN HỆ</NavLink>
              {!user ? (
                <>
                  <NavLink to="/login">ĐĂNG NHẬP</NavLink>
                  <NavLink to="/signup">ĐĂNG KÝ</NavLink>
                </>
              ) : (
                <Dropdown overlay={userMenu}>
                  <div className="profileContainer">
                    <div className="flex items-center">
                      <Avatar
                        size="large"
                        style={{
                          backgroundColor: "#1890ff",
                          fontSize: "20px",
                        }}
                      >
                        {user.firstName}
                        {user.lastName}
                      </Avatar>
                      <span className="ml-2">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
