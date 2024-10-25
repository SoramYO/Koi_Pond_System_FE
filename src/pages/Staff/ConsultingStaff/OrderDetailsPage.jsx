import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";
import { calculateOrderTotal } from "../../../components/Calculate/PondAreaCalculator";
import Loading from "../../../components/Loading";
import ChatPanel from "./../../../components/ChatPanel";
import OrderDetails from "./../../../components/OrderDetails";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const orderResponse = await axiosInstance.get(
        `/order/get-order/${orderId}`
      );
      const customerResponse = await axiosInstance.get(
        `/account-manager/account-by-order/${orderId}`
      );

      setOrder(orderResponse.data);
      setCustomerDetails(customerResponse.data);
    } catch (error) {
      console.error("Error fetching order or customer details:", error);
      toast.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderUpdate = async (updatedOrderData) => {
    setIsLoading(true);
    try {
      setIsSaving(true);

      // Calculate the new total before updating
      const totals = calculateOrderTotal(
        updatedOrderData.area,
        updatedOrderData.selectedComponents,
        updatedOrderData.componentsData
      );

      // Include the calculated total in the update
      const orderWithTotal = {
        ...updatedOrderData,
        totalMoney: totals.totalCost,
        areaCost: totals.areaCost,
        componentsCost: totals.componentsCost,
      };

      await axiosInstance.put(`/order/update/${orderId}`, orderWithTotal);

      // Update local state with new totals
      setOrder((prev) => ({
        ...prev,
        ...orderWithTotal,
      }));

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin hồ cá");
    } finally {
      setIsSaving(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex-1 lg:mr-4">
            {order && customerDetails && (
              <OrderDetails
                order={order}
                customerDetails={customerDetails}
                onOrderUpdate={handleOrderUpdate}
                isSaving={isSaving}
              />
            )}
          </div>

          <div className="lg:w-1/3 w-full h-full flex flex-col gap-4">
            <div className="w-full">
              {customerDetails && (
                <ChatPanel
                  chatId={`${customerDetails.id} ${customerDetails.firstName} ${customerDetails.lastName}`}
                  customerName={`${customerDetails.firstName} ${customerDetails.lastName}`}
                  orderId={order?.id}
                />
              )}
            </div>

            <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
              <button className="btn btn-primary w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold shadow-md transition-all duration-200">
                Hoàn thành báo giá
              </button>
              <button className="btn btn-secondary w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold shadow-md transition-all duration-200">
                Hủy báo giá
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;
