import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const ChangePassword = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5222/api/v1/changePassword",
        {
          value,
        }
      );
    } catch (error) {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-24 w-auto" src={logo} alt="SGL Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter your Username or Email to change password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username or Email
                </label>
                <div className="mt-1">
                  <input
                    id="value"
                    name="value"
                    type="value"
                    autoComplete="value"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  disabled={loading}
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Remember your password? Log in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
