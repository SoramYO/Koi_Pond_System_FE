import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axios/axiosInstance";
import PondAreaCalculator from "../../components/Calculate/PondAreaCalculator";
import ComponentsCard from "../../components/ComponentCard";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";

const SelectPondPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [componentsData, setComponentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [areaPrice, setAreaPrice] = useState(0);
  let componentTotal = 0;
  const [pondDetails, setPondDetails] = useState({
    pondName: "",
    description: "",
    pondDepth: 0,
    area: 0,
    location: "",
    shape: "",
    accountId: user.id,
    designImage: "",
    status: true,
    sampleType: 0,
    listComponent: [],
  });
  const [selectedComponents, setSelectedComponents] = useState({});

  useEffect(() => {
    const fetchPondDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/pond/pond/${id}`);
        const pondData = response.data;
        if (Array.isArray(pondData.components)) {
          setComponentsData(pondData.components);
        }
        setSelectedComponents(pondData.components);
        setPondDetails({
          ...pondData,
          pondDepth: pondData.pondDepth || 0,
          area: pondData.area || 0,
          listComponent: componentsData,
        });
      } catch (error) {
        console.error("Error fetching pond details:", error);
        toast.error("Không thể tải thông tin hồ cá");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPondDetails();
    }
  }, [id]);

  const handlePondDetailChange = (e) => {
    const { name, value } = e.target;
    setPondDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice = useMemo(() => {
    Object.entries(selectedComponents).forEach(([componentId, amount]) => {
      const component = componentsData.find(
        (comp) => comp.id === parseInt(componentId)
      );
      if (component) {
        componentTotal += component.pricePerItem * amount;
      }
    });

    return areaPrice + componentTotal;
  }, [selectedComponents, componentsData, areaPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, components, samplePrice, ...pondDetailsWithoutId } =
      pondDetails;

    // Construct the payload based on the required structure
    const payload = {
      accountID: user.id,
      orderItems: [
        {
          serviceID: 1,
          totalPrice: totalPrice,
          status: "Pending",
          pond: {
            ...pondDetailsWithoutId,
            listComponent: componentsData,
            status: true,
          },
        },
      ],
      status: "Pending",
      discouId: null,
      totalMoney: totalPrice,
    };

    try {
      setIsLoading(true);
      console.log(payload);
      const response = await axiosInstance.post("/order/create-order", payload);
      toast.success(response.data);
      navigate("/customer/profile");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {isLoading && <Loading />}
      <h1 className="text-4xl font-bold mb-4">Chọn Mẫu Hồ Cá Koi</h1>

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Thông Tin Hồ Cá</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Tên Hồ</label>
            <input
              type="text"
              name="pondName"
              value={pondDetails.pondName}
              className="border p-2 w-full bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block mb-2">Mô tả</label>
            <input
              type="text"
              name="description"
              value={pondDetails.description}
              className="border p-2 w-full bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Độ sâu (m)</label>
            <input
              type="number"
              name="pondDepth"
              value={pondDetails.pondDepth}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Diện tích (m²)</label>
            <input
              type="number"
              name="area"
              value={pondDetails.area}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
              required
            />
            {pondDetails.area > 0 && (
              <PondAreaCalculator
                area={pondDetails.area}
                onPriceCalculated={setAreaPrice}
              />
            )}
          </div>
          <div>
            <label className="block mb-2">Địa điểm</label>
            <input
              type="text"
              name="location"
              value={pondDetails.location}
              className="border p-2 w-full bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block mb-2">Hình dạng</label>
            <input
              type="text"
              name="shape"
              value={pondDetails.shape}
              className="border p-2 w-full bg-gray-100"
              disabled
            />
          </div>
          <div>
            <label className="block mb-2">Hình ảnh thiết kế</label>
            <img
              src={pondDetails.designImage}
              alt="Design"
              className="w-full h-auto"
            />
          </div>
        </div>

        <ComponentsCard componentsData={componentsData} />

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">
            Tổng chi phí: {totalPrice.toLocaleString()} VNĐ
          </h3>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default SelectPondPage;
