import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Table } from 'antd';
import { ProjectOutlined, DollarOutlined, TeamOutlined, ClockCircleOutlined, UserOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    totalCosts: 0,
    totalClients: 0,
    totalEmployees: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    // For now, we'll use mock data
    setStats({
      totalProjects: 45,
      ongoingProjects: 15,
      completedProjects: 30,
      totalRevenue: 1000000,
      totalCosts: 500000,
      totalClients: 40,
      totalEmployees: 20,
    });

    setRecentProjects([
      { id: 1, name: 'Hồ Koi Sân Vườn', client: 'Nguyễn Văn A', status: 'Đang tiến hành', completion: 75 },
      { id: 2, name: 'Hồ Koi Mini', client: 'Trần Thị B', status: 'Hoàn thành', completion: 100 },
      { id: 3, name: 'Hồ Koi Biệt Thự', client: 'Lê Văn C', status: 'Lên kế hoạch', completion: 10 },
    ]);

    // Mock data for revenue per month
    setRevenueData([
      { month: 'Tháng 1', revenue: 100000 },
      { month: 'Tháng 2', revenue: 150000 },
      { month: 'Tháng 3', revenue: 120000 },
      { month: 'Tháng 4', revenue: 170000 },
      { month: 'Tháng 5', revenue: 200000 },
      { month: 'Tháng 6', revenue: 250000 },
      { month: 'Tháng 7', revenue: 230000 },
      { month: 'Tháng 8', revenue: 220000 },
      { month: 'Tháng 9', revenue: 210000 },
      { month: 'Tháng 10', revenue: 240000 },
      { month: 'Tháng 11', revenue: 280000 },
      { month: 'Tháng 12', revenue: 300000 },
    ]);
  }, []);

  const columns = [
    { title: 'Tên Dự Án', dataIndex: 'name', key: 'name' },
    { title: 'Khách Hàng', dataIndex: 'client', key: 'client' },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Tiến Độ',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion) => <Progress percent={completion} size="small" />,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bảng Điều Khiển</h1>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Số Dự Án"
              value={stats.totalProjects}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dự Án Đang Tiến Hành"
              value={stats.ongoingProjects}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dự Án Hoàn Thành"
              value={stats.completedProjects}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Doanh Thu"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              precision={0}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mt-4">
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Chi Phí"
              value={stats.totalCosts}
              prefix={<FallOutlined />}
              precision={0}
              suffix="VNĐ"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Số Khách Hàng"
              value={stats.totalClients}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng Số Nhân Viên"
              value={stats.totalEmployees}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <h2 className="text-xl font-semibold mt-8 mb-4">Dự Án Gần Đây</h2>
      <Table dataSource={recentProjects} columns={columns} />

      <Row gutter={16} className="mt-8">
        <Col span={12}>
          <Card title="Phân Bố Trạng Thái Dự Án">
            <Progress
              percent={(stats.ongoingProjects / stats.totalProjects) * 100}
              success={{ percent: (stats.completedProjects / stats.totalProjects) * 100 }}
              type="dashboard"
              format={() => 'Đang tiến hành'}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Mức Độ Hài Lòng Của Khách Hàng">
            <Progress
              percent={90}
              success={{ percent: 90 }}
              type="dashboard"
              format={(percent) => `${percent}%`}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Bar Chart */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Biểu Đồ Doanh Thu Hàng Tháng</h2>
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
