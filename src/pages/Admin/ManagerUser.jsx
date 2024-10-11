import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../Axios/axiosInstance";
import Loading from "../../components/Loading";

const { Option } = Select;

const ManagerUser = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(1);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/account-manager/accounts");
      setUsers(response.data.accounts);
      console.log(response.data.accounts);
      const maxId =
        response.data.accounts.length > 0
          ? Math.max(...response.data.accounts.map((u) => u.id))
          : 0;
      setId(maxId + 1);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (values) => {
    form.resetFields();
  };

  const handleAddUser = async (values) => {
    setIsLoading(true);
    try {
      const newUser = { ...values, id };

      await axiosInstance.post("/users", newUser);
      toast.success("User added successfully");

      setId(id + 1);
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOk = (values) => {
    if (editingUser) {
      handleEditUser(values);
    } else {
      handleAddUser(values);
    }
  };

  const handleAddUserClick = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    form.setFieldsValue({ ...user, birthday: moment(user.birthday) });
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleEditUser = async (values) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(
        `/account-manager/users/${editingUser.id}`,
        values
      );
      toast.success("User updated successfully");
      fetchUsers();
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStatusChange = async (username) => {
    setIsLoading(true);
    try {
      const respone = await axiosInstance.put(
        `/account-manager/users/${username}/status`
      );
      toast.success(respone.data);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "userName", key: "userName" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Birthday", dataIndex: "birthday", key: "birthday" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Role", dataIndex: "roleName", key: "roleName" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === true}
          onChange={(checked) => handleStatusChange(record.userName)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {isLoading && <Loading />}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}
      >
        <Col>
          <h1>Manage Users</h1>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={
            editingUser
              ? { ...editingUser, birthday: moment(editingUser.birthday) }
              : {}
          }
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                name="userName"
                label="Username"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input />
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
            {editingUser ? null : (
              <Col xs={24} sm={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input the password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            )}
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
                  <Option value="Admin">Admin</Option>
                  <Option value="Staff">Staff</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {editingUser ? null : (
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="status" label="Status">
                  <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    defaultChecked={editingUser ? editingUser.status : false}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingUser ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUser;
