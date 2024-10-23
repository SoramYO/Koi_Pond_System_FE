import { EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Tabs, message } from "antd";

import React, { useEffect, useState } from "react";
import axiosInstance from "./../Axios/axiosInstance";

const { TabPane } = Tabs;

const UserInfo = ({ user, showModal }) => (
  <div className="p-4">
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="text-xl font-bold mb-2">
        {user?.firstName} {user?.lastName}
      </div>
      <div className="text-gray-700">
        <p className="flex items-center">
          <MailOutlined className="mr-2" /> {user?.email}
        </p>
        <p className="flex items-center">
          <PhoneOutlined className="mr-2" /> {user?.phone}
        </p>
      </div>
      <div className="mt-4">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Button>
      </div>
    </div>
  </div>
);

const PondsList = ({ ponds }) => (
  <div className="p-4">
    {ponds.map((pond) => (
      <div key={pond.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h3 className="text-lg font-bold">{pond.pondName}</h3>
        <p>Description: {pond.decription}</p>
        <p>Depth: {pond.pondDepth}</p>
        <p>Area: {pond.area}</p>
        <p>Location: {pond.location}</p>
        <p>Shape: {pond.shape}</p>
      </div>
    ))}
  </div>
);

const OrdersList = ({ orders }) => (
  <div className="p-4">
    {orders.map((order) => (
      <div key={order.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h3 className="text-lg font-bold">Order #{order.id}</h3>
        <p>Created On: {new Date(order.createOn).toLocaleDateString()}</p>
        <p>Status: {order.status}</p>
        <p>Total Money: {order.totalMoney}</p>
      </div>
    ))}
  </div>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const response = await axiosInstance.get(
          `account-manager/get-user-profile/${userId}`
        );
        setUser(response.data.account);
        setPonds(response.data.ponds);
        setOrders(response.data.orders);
      } catch (error) {
        message.error("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const showModal = () => {
    // Implement modal logic here
  };

  return user ? (
    <div className="container mx-auto">
      <UserInfo user={user} showModal={showModal} />
      <Tabs defaultActiveKey="1" className="mt-4">
        <TabPane tab="Ponds" key="1">
          <PondsList ponds={ponds} />
        </TabPane>
        <TabPane tab="Orders" key="2">
          <OrdersList orders={orders} />
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <p className="text-center mt-4">Loading...</p>
  );
};

export default Profile;
