import { Button, Form, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerUser = () => {
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
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Lấy và phân tích cú pháp JSON
      const token = user.accessToken; // Lấy accessToken từ đối tượng
      await axios.delete(
        `http://localhost:5222/api/v1/account-manager/account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleModalOk = async (values) => {
    try {
      const token = localStorage.getItem("accessToken"); // Lấy token từ local storage
      if (editingUser) {
        await axios.put(
          `http://localhost:5222/api/v1/users/${editingUser.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:5222/api/v1/users", values, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        toast.success("User added successfully");
      }
      fetchUsers();
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to save user");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const columns = [
    { title: "Username", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
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
          initialValues={editingUser || { userName: "", email: "", role: "" }}
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
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
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
