import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";
import { format, parseISO } from "date-fns";
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
      const response = await axiosInstance.get("/pond-features");
      setPonds(response.data.pondFeatures);

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

  const handleStatusChange = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(`/pond-features/${id}/status`);
      toast.success(response.data.message);
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
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: "Target Type",
      dataIndex: "targetType",
      key: "targetType",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Zodiac Name",
      key: "zodiac_element.name",
      render: (record) => record.zodiac_element?.name || "N/A",
    },
    {
      title: "CreatedAt",
      key: "createdAt",
      render: (record) =>
        format(parseISO(record.createdAt), "dd-MM-yyyy HH:mm:ss"),
    },
    {
      title: "Status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={record.status === "Active"}
          onChange={() => handleStatusChange(record._id)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
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
