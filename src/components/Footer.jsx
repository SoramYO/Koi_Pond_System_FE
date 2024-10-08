// src/components/Navbar.js
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterest,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"; // Import brand icons
import {
  faBuilding,
  faCheckCircle,
  faEnvelope,
  faFax,
  faHome,
  faLeaf,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"; // Import other icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import React from "react";
import footerlogo from "../assets/images/logo-footer-1.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10  mt-1">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-[1200px]">
        {/* Company Info Section */}
        <div>
          <img src={footerlogo} alt="SGL Vietnam" className="mb-4 h-24" />
          <p className="text-sm mb-2">Công ty TNHH Kiến trúc Cảnh quan SGL</p>
          <ul className="text-sm space-y-1">
            <li>
              <FontAwesomeIcon icon={faBuilding} className="mr-2" /> Studio: 57
              đường Vành Đai Tây, An Khánh, Tp. Thủ Đức, Tp. HCM
            </li>
            <li>
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Văn phòng: Số
              A-12a-1 Tầng 12a, Block A, Tòa nhà Centana Thủ Thiêm, 36 Mai Chí
              Thọ, P.An Phú, TP.Thủ Đức, TP.HCM
            </li>
            <li>
              <FontAwesomeIcon icon={faLeaf} className="mr-2" /> Xưởng gỗ: Đường
              Vĩnh Phú 14, Vĩnh Phú, Thuận An, Bình Dương
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Điện thoại:
              0903 957 033
            </li>
            <li>
              <FontAwesomeIcon icon={faFax} className="mr-2" /> Số Fax: 0964
              3899
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email:
              info@sgl.com.vn
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Mã số
              doanh nghiệp: 0316287084 cấp ngày 26/05/2020 tại Sở Kế hoạch và
              Đầu tư Thành phố Hồ Chí Minh
            </li>
          </ul>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
            <FontAwesomeIcon
              icon={faPinterest}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
            <FontAwesomeIcon
              icon={faTiktok}
              className="text-xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Dịch Vụ</h3>
          <ul className="space-y-1 text-sm">
            <li>Thiết kế & thi công kiến trúc</li>
            <li>Thiết kế biệt thự nhà vườn</li>
            <li>Thiết kế & thi công cảnh quan</li>
            <li>Thiết kế & thi công sân vườn biệt thự</li>
            <li>Thiết kế & thi công hồ cá KOI</li>
            <li>Thiết kế & thi công vườn tường đứng cây xanh</li>
          </ul>
        </div>

        {/* Contact/Quote Request Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">
            Yêu Cầu Báo Giá
          </h3>
          <p className="text-sm font-bold mb-2">Hotline: 0903 957 033</p>
          <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded mb-4 hover:bg-yellow-600">
            Gửi Yêu Cầu Báo Giá
          </button>
          <p className="text-xs">
            Chứng chỉ Năng lực Hoạt động Xây dựng Cấp III. Số: HCM-00046954, cấp
            ngày 19/10/2020 tại Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 px-4 text-center text-sm border-t border-gray-700 pt-4">
        <p>SGL Vietnam 2023 © All Rights Reserved.</p>
        <p>
          Điều khoản sử dụng | Chính sách bảo mật | Chính sách và quy định chung
        </p>
      </div>
    </footer>
  );
};

export default Footer;
