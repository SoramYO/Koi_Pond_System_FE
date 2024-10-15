import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axiosInstance from "./../Axios/axiosInstance";

const PondDetail = () => {
  const { id } = useParams();
  const [pond, setPond] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPondDetail = async () => {
      try {
        const response = await axiosInstance.get(`/pond/pond/${id}`);
        setPond(response.data);
      } catch (error) {
        console.error("Error fetching pond details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPondDetail();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">CHI TIẾT DỰ ÁN</h1>
      <h4 className="text-4xl font-bold text-center mb-6">{pond.pondName}</h4>
      <img
        src={pond.designImage}
        alt={pond.pondName}
        className="rounded-lg object-cover transition-transform duration-300 hover:scale-105 mt-20 mb-20"
      />
      <p>{pond.decription}</p>

      {/* Pond Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">KHÁCH HÀNG:</span>
        </div>
        <p className="ml-6">{pond.account ? pond.account : "Giấu tên"}</p>

        <div className="flex items-center mb-4 mt-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">ĐỊA ĐIỂM:</span>
        </div>
        <p className="ml-6">{pond.location}</p>

        <div className="flex items-center mb-4 mt-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">DIỆN TÍCH:</span>
        </div>
        <p className="ml-6">{pond.area} m²</p>

        <div className="flex items-center mb-4 mt-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">CHIỀU SÂU:</span>
        </div>
        <p className="ml-6">{pond.pondDepth} m</p>

        <div className="flex items-center mb-4 mt-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">HÌNH DÁNG:</span>
        </div>
        <p className="ml-6">{pond.shape}</p>

        <div className="flex items-center mb-4 mt-4">
          <i className="fas fa-circle text-gray-600 mr-2"></i>
          <span className="font-semibold">HẠNG MỤC:</span>
        </div>
        <p className="ml-6">{pond.sampleType}</p>
      </div>

      {/* New Sections for Order Items and Pond Components */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Thành Phần Hồ Cá</h2>
        {pond.pondComponents && pond.pondComponents.length > 0 ? (
          <ul className="list-disc ml-8">
            {pond.pondComponents.map((component, index) => (
              <li key={index} className="mb-2">
                {component}
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có thành phần nào.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng</h2>
        {pond.orderItems && pond.orderItems.length > 0 ? (
          <ul className="list-disc ml-8">
            {pond.orderItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có đơn hàng nào.</p>
        )}
      </div>

      {/* Sample Type Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Loại Mẫu</h2>
        <p className="ml-6">
          {pond.sampleTypeNavigation
            ? pond.sampleTypeNavigation
            : "Không có dữ liệu loại mẫu."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Link to={`/select-pond/${id}`}>
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">
            Chọn Mẫu Này
          </button>
        </Link>
        <Link to={`/custom-pond/${id}`}>
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300">
            Custom This Pond
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PondDetail;
