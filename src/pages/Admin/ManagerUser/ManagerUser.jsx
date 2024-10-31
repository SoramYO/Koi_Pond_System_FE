import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Table, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";
import Loading from "../../../components/Loading";
import { format, parseISO } from "date-fns";
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
      const response = await axiosInstance.get("/users");
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(`/user/${id}/status`);
      console.log(response);
      
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { title: "Id", render: (_, __, index) => index + 1, key: "_id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "First Name", dataIndex: "name", key: "name" },
    {
      title: "Birthday",
      key: "birth",
      render: (record) => format(parseISO(record.birth), "dd-MM-yyyy"),
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Zodiac Name",
      render: (record) => record.zodiac_element?.name || "N/A",
      key: "zodiac_element.name",
    },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record) => (
        <Switch
          checked={record.status === 'Active'}
          onChange={() => handleStatusChange(record._id)}
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
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManagerUser;
