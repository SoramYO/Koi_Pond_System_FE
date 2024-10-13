import {
  faFish,
  faLeaf,
  faPaintBrush,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AboutUsPage() {
  const HeroSection = () => {
    return (
      <section className="relative h-[500px] flex items-center justify-center">
        <img
          src="https://th.bing.com/th/id/R.28e1217b364f51df5df816cae92b7bee?rik=4qTEdf%2bcdv39mg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-E2t4QdpXEdc%2fTkPiqm1rOGI%2fAAAAAAAAAKM%2f-q6u_C9toJw%2fs1600%2fCopy%2bof%2bbutler%252526carterconstuction%2b305.jpg&ehk=AriWPv16%2fg3C15kmspYhYwoX4tSmlWaSx3qx9%2f6htmU%3d&risl=&pid=ImgRaw&r=0"
          alt="Koi Pond"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative  text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Dịch Vụ Xây Dựng Hồ Cá Koi
          </h1>
          <p className="text-xl">
            Tạo nên không gian sống đẳng cấp với hồ cá Koi
          </p>
        </div>
      </section>
    );
  };

  const DescriptionSection = () => (
    <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Về Dịch Vụ Của Chúng Tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              SGL Vietnam tự hào là đơn vị hàng đầu trong lĩnh vực thiết kế và
              thi công hồ cá Koi. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng
              tôi cam kết mang đến cho khách hàng những công trình hồ cá Koi
              đẳng cấp, kết hợp hoàn hảo giữa thẩm mỹ và chức năng.
            </p>
            <p className="text-lg">
              Từ năm 2013, chúng tôi đã không ngừng phát triển và hoàn thiện
              dịch vụ, đáp ứng mọi yêu cầu khắt khe nhất của khách hàng trong
              việc xây dựng hồ cá Koi.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ServiceCard
              icon={faFish}
              title="Thiết Kế Hồ"
              description="Thiết kế hồ cá Koi độc đáo, phù hợp với không gian sống của bạn"
            />
            <ServiceCard
              icon={faWater}
              title="Hệ Thống Lọc"
              description="Lắp đặt hệ thống lọc nước tiên tiến, đảm bảo môi trường sống tốt nhất cho cá Koi"
            />
            <ServiceCard
              icon={faLeaf}
              title="Cảnh Quan"
              description="Tạo cảnh quan xung quanh hồ, tăng tính thẩm mỹ cho không gian"
            />
            <ServiceCard
              icon={faPaintBrush}
              title="Bảo Trì"
              description="Dịch vụ bảo trì định kỳ, giữ hồ cá luôn trong tình trạng tốt nhất"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const ServiceCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FontAwesomeIcon icon={icon} className="text-4xl text-blue-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <DescriptionSection />
    </div>
  );
}

export default AboutUsPage;
