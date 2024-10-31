import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, Tooltip } from 'antd';
import axiosInstance from '../../../axios/axiosInstance';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const ManagerConsultation = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [rejectionModal, setRejectionModal] = useState({
        visible: false,
        consultationId: null,
    });

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/consultations');
            setConsultations(response.data.consultations);
        } catch (error) {
            toast.error('Failed to fetch consultations');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptBooking = async (id, status, rejectionReason = '') => {
        setLoading(true);
        try {
            const res = await axiosInstance.patch(`/consultations/${id}/status`, {
                status,
                rejectionReason
            });
            toast.success(`Consultation ${status === 'Đã nhận' ? 'accepted' : 'rejected'} successfully`);
            fetchConsultations(); // Refresh the list
        } catch (error) {
            toast.error(`Failed to ${status === 'Đã nhận' ? 'accept' : 'reject'} consultation`);
        } finally {
            setLoading(false);
            // Close rejection modal if it was open
            setRejectionModal({ visible: false, consultationId: null });
        }
    };

    const showRejectionModal = (id) => {
        setRejectionModal({
            visible: true,
            consultationId: id
        });
    };

    const handleRejectionSubmit = (values) => {
        handleAcceptBooking(
            rejectionModal.consultationId,
            'Từ chối',
            values.rejectionReason
        );
    };

    const handleStartConsultation = (id, customerName, record) => {
        navigate(`/admin/consultation/${id}`, { state: { customerName } });
        if (record === 'Đã nhận') {
            handleAcceptBooking(
                rejectionModal.consultationId,
                'Đang tư vấn',
            );
        }
    };

    const columns = [
        {
            title: "ID",
            render: (_, __, index) => index + 1,
            key: "_id",
        },
        {
            title: 'Name',
            dataIndex: ['user', 'name'],
            key: 'name',
            render: (name) => name || 'N/A',
        },
        {
            title: 'Gender',
            dataIndex: ['user', 'gender'],
            key: 'gender',
            render: (gender) => gender || 'N/A',
        },
        {
            title: 'Zodiac Element',
            dataIndex: ['user', 'zodiac_element', 'name'],
            key: 'name',
            render: (name) => name || 'N/A',
        },
        {
            title: 'Consultation Date',
            dataIndex: 'timeBooked',
            key: 'timeBooked',
            render: (timeBooked) => timeBooked
                ? format(parseISO(timeBooked), "HH:mm dd-MM-yyyy")
                : 'N/A',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                if (status === 'Từ chối' && record.rejectionReason) {
                    return (
                        <Tooltip
                            title={
                                <div>
                                    <strong>Rejection Reason:</strong>
                                    <p>{record.rejectionReason}</p>
                                </div>
                            }
                            placement="topLeft"
                        >
                            <span style={{
                                color: 'red',
                                cursor: 'help',
                                textDecoration: 'underline dotted'
                            }}>
                                {status}
                            </span>
                        </Tooltip>
                    );
                }
                return status;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => handleAcceptBooking(record._id, 'Đã nhận')}
                        disabled={record.status !== 'Chưa nhận'}
                    >
                        Nhận
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => showRejectionModal(record._id, record.user.name, record)}
                        disabled={record.status !== 'Chưa nhận'}
                    >
                        Từ chối
                    </Button>
                    {/*Nút bắt đầu tư vấn  */}
                    <Button
                        type="primary"
                        onClick={() => handleStartConsultation(record._id, record.user.name)}
                        disabled={record.status !== 'Đã nhận'}
                    >
                        Bắt đầu tư vấn
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <Title level={2} className="text-center mb-4">
                Manage Consultations
            </Title>
            <Table
                columns={columns}
                dataSource={consultations}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Reject Consultation"
                visible={rejectionModal.visible}
                onCancel={() => setRejectionModal({ visible: false, consultationId: null })}
                footer={null}
            >
                <Form onFinish={handleRejectionSubmit}>
                    <Form.Item
                        name="rejectionReason"
                        rules={[{
                            required: true,
                            message: 'Please input the reason for rejection'
                        }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Enter reason for rejecting the consultation"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit Rejection
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManagerConsultation;