import { EditOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Tabs,
} from "antd";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { FaBirthdayCake, FaTransgender } from "react-icons/fa";
import { TbZodiacCancer } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { format, parseISO } from "date-fns";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";


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


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/my-blogs");
        setBlogs(res.data.advertisements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Blog List
      </h2>
      {user && (
        <Link
          to="/create-blog"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block mb-4"
        >
          Create Blog
        </Link>

      )}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/edit-blog/${blog._id}`} 
              className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />
                )}
                <div
                  className="text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(blog._id)}
              >
                Edit
              </Button>
            </Link>
          ))}
        </div>
      )}
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
  const isInitialMount = useRef(true);
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

  const fetchUserProfile = useCallback(async () => {
    try {
      if (!user) {
        navigate("/login");
        toast.error("Vui lòng đăng nhập để xem thông tin tài khoản.");
        return;
      }
      const userId = user._id;
      const response = await axiosInstance.get(`/user/${userId}`);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  }, [user, navigate, dispatch]);


  useEffect(() => {
    // Only fetch on initial mount or when isRefeshUser changes
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchUserProfile();
    } else if (isRefeshUser) {
      fetchUserProfile();
      // Reset isRefeshUser after fetching
      setRefeshUser(false);
    }
  }, [fetchUserProfile, isRefeshUser]);



  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.toString()) return;

    const verifyPayment = async () => {
      try {
        await axiosInstance.get(`/vnpay-ipn?${searchParams}`);
        window.history.replaceState({}, '', window.location.pathname);
      } catch (error) {
        toast.error("Failed to verify payment");
      }
    };

    verifyPayment();
  }, []);


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
      toast.success("Thông tin cá nhân đã được cập nhật thành công!");
    } catch (error) {
      toast.error("Cập nhật thông tin cá nhân thất bại. Vui lòng thử lại.");
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
      setDepositModalVisible(false);
    } catch (error) {
      toast.error("Nạp tiền thất bại. Vui lòng thử lại.");
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
      <BlogList className='mt-4 mb-5' />
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
