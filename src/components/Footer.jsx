import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterest,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import footerlogo from "../assets/images/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-1">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-[1200px]">
        {/* Company Info Section */}
        <div>
          <img
            src={footerlogo}
            alt="Feng Shui Koi Consulting"
            className="mb-4 h-20"
          />
          <p className="text-sm mb-2">Dịch Vụ Tư Vấn Cá Koi Phong Thủy</p>
          <p className="text-sm mb-4">
            Giúp bạn tìm được sự cân bằng hoàn hảo với các nguyên tắc Phong Thủy
            thông qua thiết kế hồ cá và hồ cá Koi.
          </p>
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
          <h3 className="font-bold text-lg mb-4 text-yellow-400">
            Dịch Vụ Của Chúng Tôi
          </h3>
          <ul className="space-y-1 text-sm">
            <li>Lựa Chọn Cá Koi Theo Phong Thủy</li>
            <li>Đánh giá khả năng tương thích phong thủy</li>
            <li>Mẹo bảo trì cá Koi và ao</li>
            <li>Khuyến nghị trang trí phong thủy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Liên Hệ</h3>
          <p className="text-sm font-bold mb-2">Hotline: +84 903 957 033</p>
          <ul className="text-sm space-y-2">
            <li>
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Phone: +84 903
              957 033
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email:
              fengshuikoi@consult.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 px-4 text-center text-sm border-t border-gray-700 pt-4">
        <p>Feng Shui Koi Consulting © 2023 All Rights Reserved.</p>
        <p>Terms of Use | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
