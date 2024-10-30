import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";

const { Title } = Typography;

const ManagerPond = () => {
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPonds();
  }, []);

  const fetchPonds = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/pond/ponds");
      setPonds(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching ponds:", error);
      toast.error("Failed to fetch ponds");
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-pond/${id}`);
  };

  const handleStatusChange = async (username) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(``);
      toast.success(response.data);
      fetchPonds();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Pond Name",
      dataIndex: "pondName",
      key: "pondName",
    },
    {
      title: "Description",
      dataIndex: "decription",
      key: "decription",
    },
    {
      title: "Depth (m)",
      dataIndex: "pondDepth",
      key: "pondDepth",
    },
    {
      title: "Area (m²)",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Switch
            checked={record.status}
            onChange={() => handleStatusChange(record.id)}
          />
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
          <Title level={2}>Pond List</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/admin/add-pond")}
          >
            Add Pond
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={ponds}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ManagerPond;
