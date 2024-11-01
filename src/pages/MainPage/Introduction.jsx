import React from 'react';
import { Card, Button, Typography, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faFish,
    faHome,
    faCalculator,
    faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const { Title, Paragraph } = Typography;

const Introduction = () => {
    const navigate = useNavigate();
    
    const features = [
        {
            icon: <FontAwesomeIcon icon={faCompass} className="text-4xl text-blue-600" />,
            title: "Tư Vấn Phong Thủy",
            description: "Hệ thống tư vấn thông minh giúp bạn chọn cá Koi và thiết kế hồ phù hợp với bản mệnh của mình."
        },
        {
            icon: <FontAwesomeIcon icon={faFish} className="text-4xl text-blue-600" />,
            title: "Đa Dạng Giống Koi",
            description: "Thông tin chi tiết về các loại cá Koi Nhật Bản với 8 tiêu chuẩn màu sắc khác nhau."
        },
        {
            icon: <FontAwesomeIcon icon={faHome} className="text-4xl text-blue-600" />,
            title: "Thiết Kế Hồ Cá",
            description: "Tư vấn về hình dáng, vị trí và hướng đặt hồ cá theo phong thủy."
        },
        {
            icon: <FontAwesomeIcon icon={faCalculator} className="text-4xl text-blue-600" />,
            title: "Tính Toán Bản Mệnh",
            description: "Xác định bản mệnh chính xác dựa trên năm sinh và giới tính của bạn."
        },
        {
            icon: <FontAwesomeIcon icon={faShoppingBag} className="text-4xl text-blue-600" />,
            title: "Marketplace",
            description: "Nền tảng đăng tin mua bán cá Koi và phụ kiện trang trí hồ cá theo phong thủy."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <div className="flex justify-center items-center mb-4">
                    <FontAwesomeIcon icon={faFish} className="text-6xl text-blue-600" />
                </div>
                <Title level={1} className="text-4xl mb-6">
                    Koi Phong Thủy
                </Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                    "Nuôi cá dưỡng tâm, nuôi chim dưỡng chí, nuôi cây dưỡng thần"
                </Paragraph>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => navigate('/consultation')} type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                        <FontAwesomeIcon icon={faCompass} className="mr-2" />
                        Tư Vấn Ngay
                    </Button>
                    <Button size="large">
                        <FontAwesomeIcon icon={faFish} className="mr-2" />
                        Tìm Hiểu Thêm
                    </Button>
                </div>
            </div>

            <Divider />

            {/* Features Section */}
            <div className="max-w-6xl mx-auto">
                <Title level={2} className="text-center mb-12">
                    Tính Năng Nổi Bật
                </Title>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-all duration-300 group"
                            bordered={false}
                        >
                            <div className="text-center">
                                <div className="flex justify-center group-hover:transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <Title level={4} className="mt-4 mb-2">
                                    {feature.title}
                                </Title>
                                <Paragraph className="text-gray-600">
                                    {feature.description}
                                </Paragraph>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Quote Section */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
                <Card className="bg-blue-50">
                    <div className="flex justify-center mb-4">
                        <FontAwesomeIcon icon={faFish} className="text-4xl text-blue-600" />
                    </div>
                    <Paragraph className="text-lg italic text-gray-700">
                        "Cá Koi không chỉ là một loài cá cảnh thông thường, mà còn là biểu tượng của sự may mắn,
                        thịnh vượng và bình an trong văn hóa phương Đông. Hãy để chúng tôi giúp bạn chọn những
                        chú cá Koi phù hợp nhất với bản mệnh của mình."
                    </Paragraph>
                </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
                <Title level={3} className="mb-6">
                    Bắt Đầu Hành Trình Phong Thủy Của Bạn
                </Title>
                <Button onClick={() => navigate("/feng-shui")} type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                    <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                    Tính Bản Mệnh Ngay
                </Button>
            </div>
        </div>
    );
};

export default Introduction;