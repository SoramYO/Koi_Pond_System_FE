import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Table, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";
import Loading from "../../../components/Loading";
const { Title } = Typography;
const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/account-manager/accounts");
      setUsers(response.data.accounts);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (username) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `/account-manager/users/${username}/status`
      );
      toast.success(response.data);
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
          onChange={() => handleStatusChange(record.userName)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/edit-user/${record.id}`)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {isLoading && <Loading />}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "20px" }}
      >
        <Col>
          <Title level={2}>Manage Users</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => navigate("/admin/add-user")}
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
    </div>
  );
};

export default ManagerUser;
