import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    birth: new Date().toISOString().split("T")[0],
    zodiac: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      console.log(res.data);
      
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.Message) {
        err.response.data.Message.forEach((error) => {
          toast.error(error.DescriptionError);
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-50 py-6 px-8 border-b border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Đăng Ký Tài Khoản
          </h2>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Email" name="email" onChange={handleChange} />
            <InputField label="Mật Khẩu" name="password" type="password" onChange={handleChange} />
            <InputField label="Tên" name="name" onChange={handleChange} />
            <InputField label="Ngày Sinh" name="birth" type="date" onChange={handleChange} />
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Giới Tính
              </label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
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
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
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
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
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
