import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Switch, Table, Tag, Typography } from "antd";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import axiosInstance from "../axios/axiosInstance";
import Loading from "../components/Loading";
import { data } from "autoprefixer";
import { render } from "react-dom";

const { Title } = Typography;
const Billing = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/my-transaction");
      
      setTransactions(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { title: "Id", render: (_, __, index) => index + 1, key: "_id" },
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Amount", key: "amount", render: (record) => new Intl.NumberFormat("vi-VN").format(record.amount) + "đ" },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
    {
      title: "Created at",
      render: (record) => format(parseISO(record.createdAt), "dd-MM-yyyy HH:mm"),
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let text;
  
        // Determine the color and text based on the status
        if (status === "Pending") {
          color = "yellow";
          text = "Pending";
        } else if (status === "Completed") {
          color = "green";
          text = "Completed";
        } else {
          color = "red";
          text = status; // Default to showing the status text
        }
  
        return <Tag color={color}>{text}</Tag>; // Render a Tag component
      },
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          {isLoading && <Loading />}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "20px" }}
          >
            <Col>
              <Title level={2}>My Transactions</Title>
            </Col>
          </Row>

          <Table
            dataSource={transactions}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Billing;
