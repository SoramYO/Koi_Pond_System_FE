import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../Axios/axiosInstance";
import ComponentsSelection from "../components/ComponentsSelection";
import Loading from "../components/Loading";
import { AuthContext } from "../context/authContext";
const calculatePriceByArea = (area) => {
  if (area <= 0) return 0;
  if (area > 0 && area <= 20) return area * 25000000;
  if (area > 20 && area <= 50) return area * 21000000;
  if (area > 50 && area <= 100) return area * 15000000;
  return area * 9000000;
};

const PondAreaCalculator = ({ area, onPriceCalculated }) => {
  const price = useMemo(() => calculatePriceByArea(Number(area)), [area]);

  // Call the callback whenever price changes
  React.useEffect(() => {
    if (onPriceCalculated) {
      onPriceCalculated(price);
    }
  }, [price, onPriceCalculated]);

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Chi phí theo diện tích
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Diện tích:</span>
          <span className="font-medium">{area} m²</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Đơn giá áp dụng:</span>
          <span className="font-medium">
            {area <= 20
              ? "25,000,000"
              : area <= 50
              ? "21,000,000"
              : area <= 100
              ? "15,000,000"
              : "9,000,000"}{" "}
            VNĐ/m²
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-700 font-semibold">
            Tổng chi phí diện tích:
          </span>
          <span className="text-lg font-bold text-blue-600">
            {price.toLocaleString()} VNĐ
          </span>
        </div>
      </div>
    </div>
  );
};
const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const [componentsData, setComponentsData] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({});
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
    accountId: 0,
    designImage: "",
    status: true,
    sampleType: 0,
    listComponent: [],
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchComponents = async () => {
      try {
        const response = await axiosInstance.get("/material/components");
        setComponentsData(response.data.componentTypes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
    fetchComponents();
  }, []);

  // Handle input change for pond details
  const handlePondDetailChange = (e) => {
    const { name, value } = e.target;
    setPondDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const totalPrice = useMemo(() => {
    Object.entries(selectedComponents).forEach(([componentId, amount]) => {
      const component = componentsData
        .flatMap((category) => category.components)
        .find((comp) => comp.id === parseInt(componentId));
      if (component) {
        componentTotal += component.pricePerItem * amount;
      }
    });
    return areaPrice + componentTotal;
  }, [selectedComponents, componentsData, areaPrice]);

  // Handle input change for component selection
  const handleComponentChange = (e, componentId) => {
    const { value } = e.target;
    setSelectedComponents((prev) => ({
      ...prev,
      [componentId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const componentsList = Object.keys(selectedComponents).map(
      (componentId) => ({
        componentId: parseInt(componentId),
        amount: parseInt(selectedComponents[componentId]),
      })
    );

    const payload = {
      accountID: user.id,
      orderItems: [
        {
          serviceID: 1,
          totalPrice: componentTotal,
          status: "Pending",
          pond: { ...pondDetails, listComponent: componentsList },
        },
      ],
      status: "Pending",
      discouId: null,
      totalMoney: totalPrice,
    };

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/order/create-order", payload);
      toast.success("Order created successfully:", response.data);
      setIsLoading(false);
      navigate("/customer/profile");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="p-6">
      {isLoading && <Loading />}
      <h1 className="text-4xl font-bold mb-4">Chọn Mẫu Hồ Cá Koi</h1>

      <form onSubmit={handleSubmit}>
        {/* Pond Details Section */}
        <h2 className="text-xl font-semibold mb-4">Nhập Thông Tin Hồ Cá</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Tên Hồ</label>
            <input
              type="text"
              name="pondName"
              value={pondDetails.pondName}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Mô tả</label>
            <input
              type="text"
              name="description"
              value={pondDetails.description}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
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
            <label className="block mb-2">Vị trí</label>
            <input
              type="text"
              name="location"
              value={pondDetails.location}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Hình dạng</label>
            <select
              name="shape"
              value={pondDetails.shape}
              onChange={handlePondDetailChange}
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>
                Chọn hình dạng hồ cá
              </option>
              <option value="Oval">Hình bầu dục</option>
              <option value="Round">Hình tròn</option>
              <option value="Rectangle">Hình chữ nhật</option>
              <option value="Square">Hình vuông</option>
              <option value="Freeform">Hình tự do</option>
            </select>
          </div>
        </div>
        <ComponentsSelection
          componentsData={componentsData}
          selectedComponents={selectedComponents}
          onComponentChange={handleComponentChange}
        />
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Chi phí diện tích:
              </span>
              <span className="text-xl font-bold text-blue-600">
                {areaPrice.toLocaleString()} VNĐ
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Chi phí thiết bị:
              </span>
              <span className="text-xl font-bold text-blue-600">
                {(totalPrice - areaPrice).toLocaleString()} VNĐ
              </span>
            </div>
            <div className="pt-4 border-t border-blue-200/50 flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-700">
                Tổng chi phí dự kiến:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {totalPrice.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-20 flex justify-center items-center"
        >
          Xác nhận và Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
