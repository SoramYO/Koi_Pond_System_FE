import React from "react";

import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const elements = [
    {
      name: "Kim",
      symbol: "金",
      color: "bg-slate-700",
      description: "Biểu tượng của sức mạnh và sự quyết tâm",
      path: "/elements/metal", // Add path for navigation
    },
    {
      name: "Mộc",
      symbol: "木",
      color: "bg-emerald-800",
      description: "Tượng trưng cho sự phát triển và sức sống",
      path: "/elements/wood",
    },
    {
      name: "Thủy",
      symbol: "水",
      color: "bg-blue-800",
      description: "Biểu thị sự khôn ngoan và linh hoạt",
      path: "/elements/water",
    },
    {
      name: "Hỏa",
      symbol: "火",
      color: "bg-red-800",
      description: "Biểu tượng cho sự đam mê và chuyển đổi",
      path: "/elements/fire",
    },
    {
      name: "Thổ",
      symbol: "土",
      color: "bg-amber-800",
      description: "Thể hiện sự ổn định và nuôi dưỡng",
      path: "/elements/earth",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans overflow-hidden">
      {/* Hero Section with Eastern Aesthetic */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-pink-100 opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            TƯ VẤN PHONG THỦY CÁ KOI
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Chọn cách sắp xếp cá Koi hoàn hảo dựa trên nguyên tố của bạn.
            <br />
            Khám phá sự hòa hợp thông qua trí tuệ cổ xưa và chuyên môn hiện đại.
          </p>
          <button onClick={() => navigate('/consultation')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Bắt đầu ngay
          </button>
        </div>
      </section>

      {/* Elements Grid with Eastern Symbols */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-mono text-center mb-12">
            Năm Nguyên Tố Hài Hoà
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {elements.map((element) => (
              <Card
                key={element.name}
                className="p-6 text-center hover:shadow-xl transition-shadow bg-white/80"
              >
                <div
                  className={`${element.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <span className="text-3xl font-serif">{element.symbol}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{element.name}</h3>
                <p className="text-gray-600 mb-4 h-20">{element.description}</p>
                <Link
                  to={element.path}
                  className="mt-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Tìm hiểu
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Blog Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-mono text-center mb-12">
            Thông tin mới nhất
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <div className="h-40 mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
              <h3 className="font-bold text-xl mb-4">Koi Fish Care</h3>
              <p className="text-gray-600">
                Essential guidelines for maintaining healthy and vibrant Koi
                fish in your pond.
              </p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <div className="h-40 mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-lg"></div>
              <h3 className="font-bold text-xl mb-4">Feng Shui Principles</h3>
              <p className="text-gray-600">
                Understanding the ancient wisdom of placement and energy flow.
              </p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
              <div className="h-40 mb-4 bg-gradient-to-br from-green-100 to-green-200 rounded-lg"></div>
              <h3 className="font-bold text-xl mb-4">Element Compatibility</h3>
              <p className="text-gray-600">
                Guide to matching your personal element with the perfect Koi
                variety.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-mono mb-8">Tư vấn ngay</h2>
          <p className="text-gray-600 mb-8">
            Khám phá sự sắp xếp Phong Thủy hoàn hảo của bạn với dịch vụ tư vấn
            chuyên môn của chúng tôi. Chúng tôi sẽ giúp bạn chọn các đặc điểm ao
            và cá Koi lý tưởng dựa trên yếu tố của bạn.
          </p>
          <button onClick={() => navigate('/consultation')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Đặt lịch hẹn
          </button>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 right-0 -z-10 opacity-20">
        <div className="w-40 h-40 bg-red-200 rounded-full blur-2xl"></div>
      </div>
      <div className="fixed bottom-1/4 left-0 -z-10 opacity-20">
        <div className="w-40 h-40 bg-blue-200 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default HomePage;
