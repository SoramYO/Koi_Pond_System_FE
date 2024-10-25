import React from "react";
import Loading from "./Loading";
import { getStatusColor } from "./utils/helpers";

const OrdersList = ({ orders, isLoading, onOrderClick, selectedOrderId }) => {
  if (isLoading) return <Loading />;

  return (
    <div className="w-5/12 overflow-auto p-6">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedOrderId === order.id
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200"
            }`}
            onClick={() => onOrderClick(order)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">ID: {order.accountId}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {new Date(order.createOn).toLocaleString()}
              </span>
              <span className="font-medium">
                {order.totalMoney.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrdersList;
