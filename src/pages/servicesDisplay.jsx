import axios from "axios";
import React, { useEffect, useState } from "react";

const ServicesDisplay = () => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5222/api/v1/display/services-display"
      );
      setServiceData(response.data.serviceTypesResponses);
    } catch (error) {
      console.error("Failed to fetch services");
    }
  };

  return (
    <div className="p-4">
      {/* Introduction Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Bảng Báo Giá Thiết Kế Thi Công Hồ Cá Koi
        </h1>
        <p className="mb-4">
          Nếu bạn làm hồ cá Koi mini thì chi phí khá nhẹ nhàng. Nhưng nếu là hồ
          cá Koi lớn, bạn cần phải cân nhắc kỹ và tham khảo giá thành từ nhiều
          đơn vị thi công khác nhau trước.
        </p>
        <p className="mb-4">
          Các yếu tố cần quan tâm khi thi công hồ cá koi SGL Vietnam mọi người
          xem thêm tại bài viết này. Bảng báo giá chi phí thi công hồ cá koi
          dưới đây là mức tham khảo. Chi phí thi công hồ cá koi phụ thuộc vào
          rất nhiều yếu tố: kích thước hồ, chủng loại cá koi, các tiểu cảnh đi
          kèm,…
        </p>
      </div>

      {/* Price Table Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          BÁO GIÁ THIẾT KẾ THI CÔNG HỒ CÁ KOI
        </h2>
        <table className="min-w-full bg-white shadow-md rounded-lg mb-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">STT</th>
              <th className="py-2 px-4">Diện Tích</th>
              <th className="py-2 px-4">Đơn Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">10 – 20 m²</td>
              <td className="border px-4 py-2">Từ 25,000,000 VNĐ/m²</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">20 – 50 m²</td>
              <td className="border px-4 py-2">Từ 21,000,000 VNĐ/m²</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">50 – 100 m²</td>
              <td className="border px-4 py-2">Từ 15,000,000 VNĐ/m²</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">Trên 100 m²</td>
              <td className="border px-4 py-2">Từ 9,000,000 VNĐ/m²</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4">Phạm vi công việc bao gồm:</p>
        <ul className="list-disc ml-8">
          <li className="mb-2">
            Đổ bê tông, chống thấm thành hồ, đáy hồ và hầm lọc
          </li>
          <li className="mb-2">Công tác M&E đấu nối điện nước sân vườn</li>
          <li className="mb-2">Hệ thống lọc</li>
          <li className="mb-2">Thi công kè đá nghệ thuật</li>
          <li className="mb-2">Thi công lắp đặt đèn đá Nhật</li>
          <li className="mb-2">Thi công sàn gỗ hầm lọc</li>
          <li className="mb-2">
            Thi công phối kết cây bụi và hoa tạo cảnh nghệ thuật
          </li>
          <li className="mb-2">Thi công cây tầm trung</li>
        </ul>
      </div>

      {/* Services Display */}
      {serviceData.map((serviceType) => (
        <div key={serviceType.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{serviceType.typeName}</h2>
          <div className="flex flex-wrap justify-between">
            {serviceType.serviceResponses.map((service) => (
              <div
                key={service.id}
                className="bg-white shadow-md rounded-lg p-6 m-2 w-1/4 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-700 mb-2">{service.decription}</p>
                <p className="text-gray-900 font-bold">
                  Giá: {service.pricePerM2.toLocaleString()} VNĐ/m²
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesDisplay;
