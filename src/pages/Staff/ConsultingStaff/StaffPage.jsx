import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";
import OrdersList from "./../../../components/OrdersList";

const StaffPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get("/order/orders");
      console.log(response.data);
      setOrders(response.data);
    } catch (err) {
      toast.error("Failed to load orders.");
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    navigate(`/consultingstaff/orders/${order.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Order Management
          </h1>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <OrdersList
            orders={orders}
            isLoading={isLoading}
            onOrderClick={handleOrderClick}
          />
        </main>
      </div>
    </div>
  );
};

export default StaffPage;
