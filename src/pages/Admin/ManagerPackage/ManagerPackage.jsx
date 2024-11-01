import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";

const { Title } = Typography;

const ManagerPackage = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/services");
            setServices(response.data.services);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Failed to fetch services");
            setIsLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-package/${id}`);
    };

    const columns = [
        {
            title: "ID",
            render: (_, __, index) => index + 1,
            key: "_id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Uses Per Duration",
            dataIndex: "usesPerDur",
            key: "usesPerDur",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record._id)}>Edit</Button>
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
                        onClick={() => navigate("/admin/add-package")}
                    >
                        Add AdPackage
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={services}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ManagerPackage;