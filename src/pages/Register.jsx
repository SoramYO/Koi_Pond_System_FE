import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    registerAccount: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    registerUserProfile: {
      lastName: "",
      firstName: "",
      phone: "",
      birthday: new Date().toISOString().split("T")[0],
      gender: "",
      email: "",
    },
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5222/api/v1/authenticate/register",
        formData
      );
      toast.success(res.data.message);
    } catch (err) {

      if (err.response && err.response.data && err.response.data.Message) {

        const serverErrors = err.response.data.Message;
        const newErrors = {};
        serverErrors.forEach(error => {
          const fieldName = error.FieldNameError.split('.').pop().toLowerCase();
          newErrors[fieldName] = error.DescriptionError;
          toast.error(`${error.DescriptionError}`);
        });
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-6 px-8 border-b border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Đăng Ký Tài Khoản
          </h2>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Tên Tài Khoản"
              name="registerAccount.userName"
              onChange={handleChange}
            />
            <InputField
              label="Mật Khẩu"
              name="registerAccount.password"
              type="password"
              onChange={handleChange}
            />
            <InputField
              label="Xác Nhận Mật Khẩu"
              name="registerAccount.confirmPassword"
              type="password"
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Họ"
                name="registerUserProfile.lastName"
                onChange={handleChange}
              />
              <InputField
                label="Tên"
                name="registerUserProfile.firstName"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Email"
                name="registerUserProfile.email"
                type="email"
                onChange={handleChange}
              />
              <InputField
                label="Số Điện Thoại"
                name="registerUserProfile.phone"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Ngày Sinh"
                name="registerUserProfile.birthday"
                type="date"
                onChange={handleChange}
              />
              <div>
                <label
                  htmlFor="registerUserProfile.gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Giới Tính
                </label>
                <select
                  id="registerUserProfile.gender"
                  name="registerUserProfile.gender"
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đăng ký
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default RegisterPage;
