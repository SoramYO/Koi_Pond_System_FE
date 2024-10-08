import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerUser = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(1);  // Initialize ID starting from 1
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
      console.log(response.data.accounts);
      setUsers(response.data.accounts);

      // Get the highest user ID from the existing users and set the next ID
      const maxId = response.data.accounts.length > 0
        ? Math.max(...response.data.accounts.map(u => u.id))
        : 0;
      setId(maxId + 1);  // Set the next ID as maxId + 1
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    form.resetFields();  // Reset the form after submission
  };

  const handleAddUser = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      const newUser = { ...values, id };  // Assign the new ID to the user

      await axios.post("http://localhost:5222/api/v1/users", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User added successfully");

      // After adding the user, increment the ID for the next user
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
    { title: "UserName", dataIndex: "userName", key: "userName" },
    { title: "FirstName", dataIndex: "firstName", key: "firstName" },
    { title: "LastName", dataIndex: "lastName", key: "lastName" },
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
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Users</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          initialValues={editingUser || { id: "", userName: "", firstName: "", lastName: "", email: "", phone: "", birthday: "", gender: "", roleName: "", status: "" }}
          onFinish={handleModalOk}
        >
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="Firstname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Lastname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roleName"
            label="Role"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUser;
