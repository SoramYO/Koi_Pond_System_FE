import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Background3 from "../assets/images/bg-3.jpg";
import Background2 from "../assets/images/bg2.jpg";
import MauHoCa2 from "../assets/images/mau-ho-ca-koi-2.jpg";
import MauHoCa from "../assets/images/mau-ho-ca.jpg";
import Background from "../assets/images/project1-2.jpg";
import axiosInstance from "../Axios/axiosInstance";
import Modal from "../components/Modal";
import ChatIcon from "./Chat/ChatIcon";
import ChatWindow from "./Chat/ChatWindow";
const Hero = () => (
  <section
    className="mb-10 flex justify-center w-full hero bg-medium h-[32rem] backdrop-blur-3xl"
    style={{ backgroundImage: `url(${Background})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="relative z-10 flex flex-col items justify-center px-8 py-16 w-full text-white max-w-[1200px]">
      <h1 className="text-5xl font-bold mb-4">
        Thiết Kế Và Thi Công Hồ Cá Koi
      </h1>
    </div>
  </section>
);

const Sidebar = ({
  isListOpen,
  toggleList,
  isDichVuOpen,
  serviceData,
  scrollToSection,
}) => (
  <aside className="md:w-1/4 w-full pl-32">
    <h2 className="font-bold text-lg mb-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
      Nội dung chính
      <button
        onClick={toggleList}
        className="text-xl focus:outline-none transform transition-transform duration-200"
      >
        {isListOpen ? "▲" : "▼"}
      </button>
    </h2>
    <ul
      className={`space-y-2 text-base transition-all duration-300  ${
        isListOpen ? "max-h-full" : "max-h-0 overflow-hidden"
      }`}
    >
      <li
        onClick={() => scrollToSection("gioi-thieu")}
        className="cursor-pointer flex items-center gap-2 ml-4"
      >
        {" "}
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " /> Giới thiệu
        về Hồ Cá Koi
      </li>
      <li
        onClick={() => scrollToSection("loi-ich")}
        className="cursor-pointer flex items-center gap-2 ml-4"
      >
        {" "}
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        Lợi Ích Của Hồ Cá Koi
      </li>
      <li
        onClick={() => scrollToSection("cach-thiet-ke")}
        className="cursor-pointer flex items-center gap-2 ml-4"
      >
        {" "}
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        Cách thiết kế hồ nuôi cá koi đạt chuẩn
      </li>
      <li
        onClick={() => scrollToSection("hinh-dang-ho")}
        className="cursor-pointer flex items-center gap-2 ml-8"
      >
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        1. Hình dáng hồ
      </li>
      <li
        onClick={() => scrollToSection("vi-tri-dat-ho")}
        className="cursor-pointer flex items-center gap-2 ml-8"
      >
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        2. Vị trí đặt hồ
      </li>
      <li
        onClick={() => scrollToSection("kich-thuoc-ho")}
        className="cursor-pointer flex items-center gap-2 ml-8"
      >
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        3. Kích thước hồ
      </li>
      <li
        onClick={() => scrollToSection("tai-sao-nen-chon-sgl-vietnam")}
        className="cursor-pointer flex items-center gap-2 ml-4"
      >
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        Tại Sao Nên Chọn SGL Vietnam
      </li>
      <li
        onClick={() => scrollToSection("du-an-tieu-bieu")}
        className="cursor-pointer flex items-center gap-2 ml-4"
      >
        <FontAwesomeIcon icon={faCircle} className="text-[8px] " />
        Các Dự Án Tiêu Biểu
      </li>
    </ul>

    {/* Dịch Vụ Dropdown Section */}
    <div className="mt-6 border-gray-300 border">
      {" "}
      <h3 className="border-gray-300 border font-semibold py-4 text-xl mb-2 flex items-center justify-center bg-gray-100 p-2">
        DỊCH VỤ
      </h3>
      <ul
        className={`text-sm transition-all duration-300 ${
          isDichVuOpen ? "max-h-full" : "max-h-0 overflow-hidden"
        }`}
      >
        {serviceData.map((serviceType) => (
          <li key={serviceType.id} className="py-4 px-2">
            <span className="font-bold">{serviceType.typeName}</span>
            <ul className="mt-2">
              {serviceType.serviceResponses.map((service) => (
                <li key={service.id} className="py-2 px-2 hover:bg-gray-200">
                  {service.name}
                  <p className="text-gray-500">{service.decription}</p>
                  <p className="text-gray-700">
                    Giá: {service.pricePerM2.toLocaleString()} VND/m²
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

const MainContent = React.forwardRef((props, ref) => (
  <main className="flex-1 pr-40" ref={ref}>
    {/* Introduction Section */}
    <section id="gioi-thieu">
      <h3 className="font-bold text-4xl mt-6 ml-1">Giới thiệu về Hồ Cá Koi</h3>
      <p className="text-base mt-4">
        Hồ cá koi có nguồn gốc từ Nhật Bản, không chỉ là một phần của cảnh quan
        đẹp, mà còn mang ý nghĩa phong thủy quan trọng. Chúng biểu tượng cho sự
        may mắn, tài lộc, và bình an. Việc thiết kế hồ cá koi đúng chuẩn không
        chỉ mang lại giá trị thẩm mỹ mà còn giúp cân bằng yếu tố phong thủy
        trong ngôi nhà của bạn.
      </p>
    </section>

    {/* Benefits Section */}
    <section id="loi-ich" className="mt-12">
      <h3 className="font-bold text-4xl mt-6 ml-1">Lợi Ích Của Hồ Cá Koi</h3>
      <ul className="list-disc ml-8 mt-4 space-y-2">
        <li>Thêm vẻ đẹp tự nhiên và thẩm mỹ cho không gian sống.</li>
        <li>Cải thiện phong thủy, mang lại sự cân bằng và tài lộc.</li>
        <li>Giảm stress, giúp thư giãn tinh thần với không gian thanh bình.</li>
        <li>Tạo ra một môi trường sống lành mạnh cho cá Koi và cây cảnh.</li>
      </ul>
    </section>

    {/* Visual Content */}
    <section className="mt-12">
      <p className="text-base mb-4">
        Với sự duyên dáng, tuổi thọ và màu sắc tuyệt đẹp của cá Koi, thật dễ
        dàng để biết lý do tại sao những khu vườn được thiết kế theo phong cách
        Nhật Bản không thể thiếu hồ cá Koi. Thiết kế hồ cá Koi đẹp trong vườn
        không những mang lại vẻ đẹp thanh bình, may mắn và tài lộc mà còn mang
        vẻ đẹp thẩm mỹ riêng cho không gian nhà ở của gia chủ.
      </p>
      <div className="flex justify-center px-24">
        <img
          src={Background2}
          alt="SGL Vietnam"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>

    {/* Koi Pond Design Guide Section */}
    <section id="cach-thiet-ke" className="mt-12">
      <h3 className="font-bold text-4xl mt-6 ml-1">
        Cách thiết kế hồ nuôi cá koi đạt chuẩn
      </h3>
      <div className="mt-8">
        <h4 id="hinh-dang-ho" className="font-semibold text-base">
          1. Hình dáng hồ
        </h4>
        <p className="text-base mt-2">
          Hình dáng hồ sẽ phụ thuộc vào sở thích cá nhân của bạn và diện tích
          tổng thể của sân vườn. Nếu cần thiết, hãy liên hệ một đơn vị chuyên
          nghiệp để họ có thể giúp bạn tư vấn thiết kế hồ cá koi theo mong muốn
          và sở thích của bạn.
        </p>
      </div>
      <div className="flex justify-center px-24 mt-6">
        <img
          src={Background3}
          alt="SGL Vietnam"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-8">
        <h4 id="vi-tri-dat-ho" className="font-semibold text-base">
          2. Vị trí đặt hồ
        </h4>
        <p className="text-base mt-2">
          Hồ cá Koi có thể đặt ở rất nhiều vị trí như: ngoài trời, trong nhà,
          ban công, sân thượng,… Tùy vào vị trí bạn muốn đặt hồ mà sẽ có những
          yêu cầu và kỹ thuật thi công khác nhau, phải đảm bảo đầy đủ công năng,
          phù hợp với cảnh quan và chuẩn phong thủy.
        </p>
      </div>

      <div className="mt-8">
        <h4 id="kich-thuoc-ho" className="font-semibold text-base">
          3. Kích thước hồ
        </h4>
        <p className="text-base mt-2">
          Kích thước hồ cá Koi cần được cân nhắc kỹ lưỡng để phù hợp với không
          gian. Đội ngũ chuyên nghiệp của SGL Vietnam sẽ tư vấn cho bạn giải
          pháp tối ưu.
        </p>
      </div>
    </section>

    {/* Why Choose SGL Vietnam Section */}
    <section id="tai-sao-nen-chon-sgl-vietnam" className="mt-12">
      <h3 className="font-bold text-4xl ml-1">Tại Sao Nên Chọn SGL Vietnam</h3>
      <p className="text-base mt-4">
        Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và thi công hồ cá
        koi, SGL Vietnam tự hào là đơn vị hàng đầu với hàng trăm dự án thành
        công. Chúng tôi cam kết mang đến cho khách hàng dịch vụ chất lượng nhất,
        từ thiết kế độc đáo đến thi công chuyên nghiệp, đảm bảo hài lòng tuyệt
        đối.
      </p>
    </section>

    {/* Featured Projects Section */}
    <section id="du-an-tieu-bieu" className="mt-12">
      <h3 className="font-bold text-4xl ml-1">Các Dự Án Tiêu Biểu</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col h-full">
          <img
            src={MauHoCa}
            alt="Dự án 1"
            className="rounded-lg shadow-lg object-cover"
          />
          <h4 className="font-semibold text-xl mt-2">
            Dự án tại Khu Biệt Thự X
          </h4>
          <p className="text-base mt-2 flex-grow">
            Thiết kế hồ cá koi ngoài trời, mang lại vẻ đẹp thanh bình cho khuôn
            viên biệt thự.
          </p>
        </div>
        <div className="flex flex-col h-full">
          <img
            src={MauHoCa2}
            alt="Dự án 2"
            className="rounded-lg shadow-lg object-cover"
          />
          <h4 className="font-semibold text-xl mt-2">Dự án tại Resort Y</h4>
          <p className="text-base mt-2 flex-grow">
            Hồ cá koi kết hợp với khu vườn Nhật Bản, tạo không gian nghỉ dưỡng
            lý tưởng cho khách hàng.
          </p>
        </div>
      </div>
    </section>
  </main>
));

function HomePage() {
  const [isListOpen, setIsListOpen] = useState(true);
  const [isDichVuOpen, setIsDichVuOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };
  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);
  const [serviceData, setServiceData] = useState([]);
  const mainContentRef = useRef(null);
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5222/api/v1/display/services-display"
      );
      setServiceData(response.data.serviceTypesResponses);
    } catch (error) {
      console.error("Failed to fetch services");
    }
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main>
      <Hero />
      <div className="flex flex-col md:flex-row gap-6 ">
        <Sidebar
          isListOpen={isListOpen}
          toggleList={toggleList}
          isDichVuOpen={isDichVuOpen}
          serviceData={serviceData}
          setIsDichVuOpen={setIsDichVuOpen}
          scrollToSection={scrollToSection}
        />
        <MainContent ref={mainContentRef} />
        {isChatOpen ? null : <ChatIcon onClick={handleChatOpen} />}
        <Modal isOpen={isChatOpen} onClose={handleChatClose}>
          <ChatWindow onClose={handleChatClose} />
        </Modal>
      </div>
    </main>
  );
}

export default HomePage;
