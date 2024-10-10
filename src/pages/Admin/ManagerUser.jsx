import { Button, Form, Input, Modal, Table, Row, Col, Space, Select, DatePicker, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const ManagerUser = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(1);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      const response = await axios.get(
        "http://localhost:5222/api/v1/account-manager/accounts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.accounts);

      const maxId =
        response.data.accounts.length > 0
          ? Math.max(...response.data.accounts.map((u) => u.id))
          : 0;
      setId(maxId + 1);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleSubmit = (values) => {
    form.resetFields();
  };

  const handleAddUser = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      const newUser = { ...values, id };

      await axios.post("http://localhost:5222/api/v1/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User added successfully");

      setId(id + 1);
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      await axios.delete(
        `http://localhost:5222/api/v1/account-manager/account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleModalOk = (values) => {
    if (editingUser) {
      handleEditUser(values);
    } else {
      handleAddUser(values);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const handleEditUser = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:5222/api/v1/users/${editingUser.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully");
      fetchUsers();
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to update user");
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
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
        <Col>
          <h1>Manage Users</h1>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsModalVisible(true)}
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
              : { id: "", userName: "", firstName: "", lastName: "", email: "", phone: "", birthday: "", gender: "", roleName: "", status: "" }
          }
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Form.Item name="userName" label="Username" rules={[{ required: true, message: "Please input the username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please input the first name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please input the last name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone (10 numbers)"
            rules={[
              { required: true, message: "Please input the phone number!" },
              { pattern: /^[0-9]{10}$/, message: "Phone number must be exactly 10 digits!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Birthday" rules={[{ required: true, message: "Please input the birthday!" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please select gender!" }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="roleName" label="Role" rules={[{ required: true, message: "Please input the role!" }]}>
            <Select>
              <Option value="male">Admin</Option>
              <Option value="female">Satff</Option>
              <Option value="female">Customer</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
            <Radio.Group>
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
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
