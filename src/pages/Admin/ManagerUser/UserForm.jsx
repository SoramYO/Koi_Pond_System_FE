import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";

const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Check if id exists to determine if we are editing

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/account-manager/account/${id}`
      );
      const user = response.data;
      form.setFieldsValue({
        ...user,
        birthday: moment(user.birthday),
      });
    } catch (error) {
      toast.error("Failed to fetch user");
      navigate("/admin/manage-users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formattedBirthday = values.birthday.format("YYYY-MM-DD");
      const userData = {
        ...values,
        birthday: formattedBirthday,
      };

      if (id) {
        // Editing existing user
        await axiosInstance.put(`/account-manager/users/${id}`, userData);
        toast.success("User updated successfully");
      } else {
        // Adding new user
        await axiosInstance.post("/users", userData);
        toast.success("User added successfully");
      }
      navigate("/admin/manage-users");
    } catch (error) {
      toast.error(id ? "Failed to update user" : "Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <h1>{id ? "Edit User" : "Add New User"}</h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
            >
              <Input disabled={id} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone (10 digits)"
              rules={[
                { required: true, message: "Please input the phone number!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: !id, message: "Please input the password!" }]} // Only required when adding
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="birthday"
              label="Birthday"
              rules={[
                { required: true, message: "Please input the birthday!" },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="roleName"
              label="Role"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Select>
                <Option value="Manager">Manager</Option>
                <Option value="Customer">Customer</Option>
                <Option value="ConsultingStaff">ConsultingStaff</Option>
                <Option value="DesignStaff">DesignStaff</Option>
                <Option value="ConstructionStaff">ConstructionStaff</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="status" label="Status" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update User" : "Add User"}
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/admin/manage-users")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
