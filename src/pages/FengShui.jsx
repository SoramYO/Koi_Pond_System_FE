import React, { useState } from 'react';
import { DatePicker, Select, Card, Collapse, Typography, Divider, Row, Col } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const DateGenderForm = () => {
  const [dateOfBirth, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/calculation-feng-shui",
        {
          dateOfBirth,
          gender,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-md mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Text className="block mb-2 text-gray-700">Ngày sinh:</Text>
                <DatePicker
                  value={dateOfBirth ? moment(dateOfBirth) : null}
                  onChange={(date, dateString) => setDob(dateString)}
                  className="w-full"
                  placeholder="Chọn ngày sinh"
                />
              </div>
              <div className="flex-1">
                <Text className="block mb-2 text-gray-700">Giới tính:</Text>
                <Select
                  value={gender}
                  onChange={setGender}
                  className="w-full"
                >
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Xem kết quả
            </button>
          </form>
        </Card>

        {result && (
          <Card className="shadow-lg">
            <Title level={3} className="text-center mb-6">Kết quả phân tích</Title>

            <div className="text-center mb-6">
              <Row gutter={[16, 16]} className="mb-4">
                <Col span={24} md={8}>
                  <Card className="bg-gray-50">
                    <Text strong>Dương lịch:</Text>
                    <div className="text-lg">{result.year}</div>
                  </Card>
                </Col>
                <Col span={24} md={8}>
                  <Card className="bg-gray-50">
                    <Text strong>Âm lịch:</Text>
                    <div className="text-lg">{result.lunarDate}</div>
                  </Card>
                </Col>
                <Col span={24} md={8}>
                  <Card className="bg-gray-50">
                    <Text strong>Giới tính:</Text>
                    <div className="text-lg">{result.gender}</div>
                  </Card>
                </Col>
              </Row>

              {result.destiny && (
                <div className="mb-6">
                  <Card className="bg-gray-50">
                    <Title level={4}>Cung mệnh</Title>
                    <Text className="text-lg">{result.destiny.name}</Text>
                    {result.destiny.image && (
                      <img
                        src={result.destiny.image}
                        alt="destiny"
                        className="mx-auto mt-4 max-w-xs"
                      />
                    )}
                  </Card>
                </div>
              )}
            </div>

            {result.direction && (
              <div>
                <Divider>
                  <Title level={4}>Hướng nhà theo phong thủy</Title>
                </Divider>

                <Row gutter={[16, 16]}>
                  <Col span={24} md={12}>
                    <Card title="Hướng tốt" className="h-full">
                      <Collapse className="bg-white">
                        {result.direction.slice(0, 4).map((dir) => (
                          <Panel
                            header={
                              <Text strong className="text-green-600">
                                {dir.title}
                              </Text>
                            }
                            key={dir._id}
                            className="border border-green-100"
                          >
                            <div dangerouslySetInnerHTML={{ __html: dir.content }} />
                          </Panel>
                        ))}
                      </Collapse>
                    </Card>
                  </Col>
                  <Col span={24} md={12}>
                    <Card title="Hướng xấu" className="h-full">
                      <Collapse className="bg-white">
                        {result.direction.slice(4).map((dir) => (
                          <Panel
                            header={
                              <Text strong className="text-red-600">
                                {dir.title}
                              </Text>
                            }
                            key={dir._id}
                            className="border border-red-100"
                          >
                            <div dangerouslySetInnerHTML={{ __html: dir.content }} />
                          </Panel>
                        ))}
                      </Collapse>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default DateGenderForm;