import React, { useState } from 'react';
import {
    Button,
    Card,
    Typography,
    Row,
    Col,
    Statistic
} from 'antd';
import {
    CalendarOutlined,
    MessageOutlined,
    TeamOutlined
} from '@ant-design/icons';
import ConsultationModal from '../components/ConsultationModal';

const { Title, Paragraph, Text } = Typography;

const ConsultationPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Hero Section */}
                <Card
                    className="shadow-xl rounded-2xl overflow-hidden"
                    cover={
                        <div
                            className="h-96 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/diamondvaluation-1718484187119.appspot.com/o/images%2FRed%20Green%20Koi%20Contest%20Festival%20Facebook%20Cover.png?alt=media&token=70eb284c-c2d8-4a52-b414-dba2b0e69e5d')`,
                            }}
                        >
                            {/* Ensuring there is some content in the div to help render the image */}
                            <div className="h-full w-full opacity-0">Image Background</div>
                        </div>
                    }
                >
                    <div className="text-center space-y-6 p-6">
                        <Title
                            level={2}
                            className="text-3xl font-bold text-blue-600 mb-4"
                        >
                            Tư vấn cá Koi
                        </Title>

                        <Paragraph
                            className="text-gray-600 max-w-2xl mx-auto text-lg"
                        >
                            Khám phá bí mật hành trình nuôi cá Koi của bạn với dịch vụ tư vấn cá nhân của chúng tôi. Hướng dẫn chuyên môn phù hợp với nhu cầu riêng của bạn.
                        </Paragraph>

                        <Button
                            type="primary"
                            size="large"
                            onClick={showModal}
                            className="transform hover:scale-105 transition-transform duration-300"
                        >
                            Đặt lịch tư vấn của bạn
                        </Button>
                    </div>
                </Card>

                {/* Features Section */}
                <Row gutter={[16, 16]} className="mb-8">
                    <Col xs={24} sm={8}>
                        <Card
                            hoverable
                            className="h-full text-center shadow-md rounded-2xl"
                        >
                            <CalendarOutlined
                                className="text-5xl text-blue-500 mb-4"
                            />
                            <Title level={4}>Lịch trình linh hoạt</Title>
                            <Text type="secondary">
                                Chọn thời gian tư vấn phù hợp với lịch trình của bạn
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card
                            hoverable
                            className="h-full text-center shadow-md rounded-2xl"
                        >
                            <MessageOutlined
                                className="text-5xl text-green-500 mb-4"
                            />
                            <Title level={4}>Hướng dẫn của chuyên gia</Title>
                            <Text type="secondary">
                                Tư vấn cá nhân từ các chuyên gia về cá Koi
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card
                            hoverable
                            className="h-full text-center shadow-md rounded-2xl"
                        >
                            <TeamOutlined
                                className="text-5xl text-purple-500 mb-4"
                            />
                            <Title level={4}>Hỗ trợ cộng đồng</Title>
                            <Text type="secondary">
                                Kết nối với những người đam mê cá Koi giàu kinh nghiệm
                            </Text>
                        </Card>
                    </Col>
                </Row>

                {/* Statistics Section */}
                <Row gutter={[16, 16]} className="bg-white shadow-md rounded-2xl p-6">
                    <Col xs={24} sm={8} className="text-center">
                        <Statistic
                            title="Tổng số lượt tư vấn"
                            value={1240}
                            prefix="+"
                            className="text-blue-600"
                        />
                    </Col>
                    <Col xs={24} sm={8} className="text-center">
                        <Statistic
                            title="Độ hài lòng của khách hàng"
                            value={95}
                            suffix="%"
                            className="text-green-600"
                        />
                    </Col>
                    <Col xs={24} sm={8} className="text-center">
                        <Statistic
                            title="Số năm kinh nghiệm"
                            value={10}
                            prefix="+"
                            className="text-purple-600"
                        />
                    </Col>
                </Row>

                {/* Consultation Modal */}
                <ConsultationModal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default ConsultationPage;
