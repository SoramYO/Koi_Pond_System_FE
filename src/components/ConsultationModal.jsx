import React, { useState, useEffect } from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
    DatePicker,
    Typography
} from 'antd';
import axiosInstance from '../axios/axiosInstance';
import { toast } from 'react-toastify';
import { push, ref, serverTimestamp } from 'firebase/database';
import { db } from '../firebase/FirebaseConfig';

const { Title } = Typography;

const ConsultationModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {




            const res = await axiosInstance.post('/consultation', {
                timeBooked: values.consultationDate.toISOString(),
                description: values.message,
            });

            const chatId = res.data.consultation._id;

            const newMessage = {
                message: `
                  <div style="font-size: 16px;">
                    <strong>📅 Có một cuộc tư vấn mới đã được đặt lịch:</strong><br/>
                    <strong>Date:</strong> ${values.consultationDate.toISOString()}<br/>
                    <strong>Description:</strong> ${values.message}
                  </div>
                `,
                sender: `System`,
                timestamp: serverTimestamp(),
                read: false,
            };

            push(ref(db, `messages/${chatId}`), newMessage);


            toast.success(res.data.message);
            form.resetFields();
            onCancel();
        } catch (error) {
            toast.error('Failed to book consultation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={<Title level={4}>Đặt lịch tư vấn</Title>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="consultationDate"
                    label="Ngày tư vấn mong muốn"
                    rules={[{ required: true, message: 'Hãy chọn ngày tư vấn' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder="Chọn ngày tư vấn"
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                    />
                </Form.Item>

                <Form.Item
                    name="message"
                    label="Ghi chú bổ sung"
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Bất kỳ thông tin bổ sung hoặc câu hỏi cụ thể"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Đặt lịch tư vấn
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConsultationModal;