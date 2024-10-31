import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Background from "../assets/images/project1-2.jpg";
import Loading from "../components/Loading";
import axiosInstance from "./../Axios/axiosInstance";

const HeroSection = () => (
  <section
    className="relative h-[500px] flex items-center justify-center bg-cover"
    style={{ backgroundImage: `url(${Background})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative text-center text-white p-4">
      <h1 className="text-5xl font-bold mb-4 relative group">
        Các Hồ Cá Koi
        <span className="absolute block h-1 bg-white w-0 bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
      </h1>
      <p className="text-xl">Khám phá các dự án hồ cá Koi của chúng tôi</p>
    </div>
  </section>
);

const ProjectPond = () => {
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPonds = async () => {
      try {
        const response = await axiosInstance.get("/display/ponds-display");
        setPonds(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hồ cá koi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPonds();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <Loading />}
      <HeroSection />
      <main className="flex-1 px-4 md:px-10 lg:px-20">
        <section id="ho-ca-koi" className="mt-12">
          <h3 className="font-bold text-4xl text-center mb-8">Các Hồ Cá Koi</h3>
          <div className="flex justify-center flex-wrap mb-20">
            {ponds.map((pond) => (
              <div
                key={pond.id}
                className="flex justify-center"
                style={{ margin: "10px 15px" }}
              >
                <Link to={`/pond/${pond.id}`} className="relative block">
                  <img
                    src={pond.designImage}
                    alt={pond.pondName}
                    className="rounded-lg object-cover h-[380px] w-[380px] transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg">
                    <h4 className="font-semibold text-white text-lg">
                      {pond.pondName}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectPond;
