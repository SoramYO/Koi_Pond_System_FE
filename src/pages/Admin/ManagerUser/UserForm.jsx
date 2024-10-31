import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
  Divider,
} from "antd";
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";
import Loading from "../../../components/Loading";
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const UserForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    gender: '',
    birthday: null,
    status: true,
    roleName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/user/${id}`);
      if (response.data.errCode === 0) {
        const user = response.data.user;
        // Convert the date string to moment object for DatePicker
        const birthdayMoment = user.birth ? moment(user.birth) : null;

        const userData = {
          email: user.email,
          password: user.password ? user.password : '',
          name: user.name,
          gender: user.gender,
          birthday: birthdayMoment,
          status: user.status ?? true,
          roleName: user.role
        };
        setFormData(userData);

        form.setFieldsValue(userData);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Format the birthday properly
      const formattedData = {
        ...values,
        birth: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
        role: values.roleName // Map roleName to role for the API
      };

      console.log('Submitting data:', formattedData);

      if (id) {
        await axiosInstance.patch(`/user/${id}`, formattedData);
        console.log(formattedData);
        toast.success("User updated successfully");
      } else {
        await axiosInstance.post("/users", formattedData);
        toast.success("User added successfully");
      }
      navigate("/admin/manage-users");
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(id ? "Failed to update user" : "Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-lg">
        <div className="mb-6">
          <Title level={2} className="text-center mb-2">
            {id ? "Edit User" : "Add New User"}
          </Title>
          <Divider className="my-4" />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
          className="space-y-4"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  disabled={id}
                  className="rounded-md"
                  placeholder="Enter email"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please input full name!" }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  className="rounded-md"
                  placeholder="Enter full name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  className="rounded-md"
                  placeholder="Select gender"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Role"
                name="roleName"
                rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select
                  className="rounded-md"
                  placeholder="Select role"
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="User">User</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: "Please select birthday!" }]}
              >
                <DatePicker
                  className="w-full rounded-md"
                  placeholder="Select birthday"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            {!id && (
              <Col xs={24} md={12}>
                <Form.Item
                  label="Password"
                  name="password"
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    className="rounded-md"
                    placeholder="Enter password"
                  />
                </Form.Item>
              </Col>
            )}

            <Col xs={24} md={12}>
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                className="pt-2"
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  defaultChecked={formData.status}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider className="my-6" />

          <Form.Item className="flex justify-end space-x-4 mb-0">
            <Button
              onClick={() => navigate("/admin/manage-users")}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {id ? "Update User" : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;