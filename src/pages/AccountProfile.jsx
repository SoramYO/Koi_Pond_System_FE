import { EditOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Tabs,
  message,
} from "antd";

import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { FaBirthdayCake, FaTransgender } from "react-icons/fa";
import { TbZodiacCancer } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { format, parseISO } from "date-fns";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const UserInfo = ({ user, showEditModal, showDepositModal }) => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-xl font-bold mb-2">{user?.name}</div>
        <div className="text-gray-700">
          <p className="flex items-center">
            <MailOutlined className="mr-2" /> {user?.email}
          </p>
          <p className="flex items-center">
            <FaTransgender className="mr-2" />
            {user?.gender}
          </p>
          <p className="flex items-center">
            <FaBirthdayCake className="mr-2" />{" "}
            {format(parseISO(user?.birth), "dd/MM/yyyy")}
          </p>
          <p className="flex items-center">
            <TbZodiacCancer className="mr-2" /> {user?.zodiac_element.name}
          </p>
          <p className="flex items-center">
            Số dư tài khoản:{" "}
            {new Intl.NumberFormat("vi-VN").format(user?.balance)}đ
          </p>
        </div>
        <div className="mt-4">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={showEditModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Chỉnh sửa
          </Button>
          <Button
            type="primary"
            icon={<CiWallet />}
            onClick={showDepositModal}
            className="bg-blue-500 text-white px-4 py-2 rounded ms-4"
          >
            Nạp tiền
          </Button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [form] = Form.useForm();
  const { user, dispatch } = useContext(AuthContext);
  const [isDepositModalVisible, setDepositModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isRefeshUser, setRefeshUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        birth: moment(user.birth),
      });
    }
  }, [user, form]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          message.error("Vui lòng đăng nhập để xem thông tin tài khoản.");
          return;
        }
        const userId = user._id;
        const response = await axiosInstance.get(`/user/${userId}`);

        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        // setPonds(response.data.ponds);
        // setOrders(response.data.orders);
      } catch (error) {
        message.error("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, [navigate, dispatch, isRefeshUser]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.toString()) {
      verifyPayment(searchParams);
    }
  }, []);

  // Verify payment status
  const verifyPayment = async (searchParams) => {
    try {
      const response = await axiosInstance.get(`/vnpay-ipn?${searchParams}`);

      if (response.data.RspCode === "00") {
        message.success(response.data.Message);
        setRefeshUser(!isRefeshUser);
      }
    } catch (error) {
      message.error("An error occurred during payment verification.");
    }
  };

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSubmit = async (values) => {
    try {
      const userId = user._id;
      console.log(values);
      await axiosInstance.patch(`/user/${userId}`, values);

      setRefeshUser(!isRefeshUser);
      setEditModalVisible(false);
      message.success("Thông tin cá nhân đã được cập nhật thành công!");
    } catch (error) {
      message.error("Cập nhật thông tin cá nhân thất bại. Vui lòng thử lại.");
    }
  };

  const showDepositModal = () => {
    setDepositModalVisible(true);
  };

  const handleDepositCancel = () => {
    setDepositModalVisible(false);
  };

  const handleDepositSubmit = async (values) => {
    const { amount } = values;
    try {
      const res = await axiosInstance.post(`/deposit`, {
        amount,
        returnUrl: "http://localhost:3000/profile",
      });

      window.location.href = res.data.paymentUrl;

      // message.success("Tiền đã được nạp vào ví của bạn!");
      setDepositModalVisible(false);
    } catch (error) {
      message.error("Nạp tiền thất bại. Vui lòng thử lại.");
    }
  };

  const setAmount = (amount) => {
    form.setFieldsValue({ amount });
  };

  return user ? (
    <div className="container mx-auto">
      <UserInfo
        user={user}
        showEditModal={showEditModal}
        showDepositModal={showDepositModal}
      />
      <Tabs defaultActiveKey="1" className="mt-4">
        {/* <TabPane tab="Orders" key="2">
          <OrdersList orders={orders} />
        </TabPane> */}
      </Tabs>
      {/* Deposit Modal */}
      <Modal
        title="Nạp tiền vào ví"
        onCancel={handleDepositCancel}
        open={isDepositModalVisible}
        footer={null}
      >
        <Form form={form} onFinish={handleDepositSubmit}>
          <Form.Item
            name="amount"
            label="Số tiền nạp"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <Input type="number" min="1" placeholder="Nhập số tiền" />
          </Form.Item>
          <div className="flex gap-2 mb-4">
            <Button onClick={() => setAmount(50000)}>50.000đ</Button>
            <Button onClick={() => setAmount(100000)}>100.000đ</Button>
            <Button onClick={() => setAmount(200000)}>200.000đ</Button>
            <Button onClick={() => setAmount(500000)}>500.000đ</Button>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Xác nhận nạp tiền
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
          <Form.Item
            name="name"
            label="Tên"
            initialValue={user.name}
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            initialValue={user.email}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            initialValue={user.gender}
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="Male">Nam</Select.Option>
              <Select.Option value="Female">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="birth"
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker
              className="w-full rounded-md"
              placeholder="Chọn ngày sinh"
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  ) : (
    <p className="text-center mt-4">Loading...</p>
  );
};

export default Profile;
