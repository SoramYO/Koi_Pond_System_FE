import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Space, Switch, Table, Typography } from "antd";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";

const { Title } = Typography;

const ManagerKoiFish = () => {
    const [koiFish, setKoiFish] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFish();
    }, []);

    const fetchFish = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/koi-fish-breeds");
            setKoiFish(response.data.koiFishBreeds);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching koi fish breeds:", error);
            toast.error("Failed to fetch koi fish breeds");
            setIsLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-koi-fish/${id}`);
    };
    const handleStatusChange = async (id) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.patch(`/koi-fish-breeds/${id}/status`);
            toast.success(response.data.message);
            fetchFish();
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
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "image_url",
            key: "image_url",
            render: (text) => (
                <Image
                    width={100}
                    src={text}
                    alt="Koi Fish"
                    preview={{ mask: "View Image" }}
                />
            ),
        },
        {
            title: "Zodiac Element",
            render: (record) => record.zodiac_element?.name || "N/A",
            key: "zodiac_element",
        },
        {
            title: "Created At",
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
                    <Title level={2}>Koi Fish List</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/admin/add-koi-fish")}
                    >
                        Add Koi Fish
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={koiFish}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ManagerKoiFish;