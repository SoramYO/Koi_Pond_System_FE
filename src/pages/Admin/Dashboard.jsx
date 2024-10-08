import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Table } from 'antd';
import { ProjectOutlined, DollarOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    ongoingProjects: 0,
    totalRevenue: 0,
    totalClients: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    // For now, we'll use mock data
    setStats({
      totalProjects: 50,
      ongoingProjects: 15,
      totalRevenue: 1000000,
      totalClients: 40,
    });

    setRecentProjects([
      { id: 1, name: 'Hồ Koi Sân Vườn', client: 'Nguyễn Văn A', status: 'Đang tiến hành', completion: 75 },
      { id: 2, name: 'Hồ Koi Mini', client: 'Trần Thị B', status: 'Hoàn thành', completion: 100 },
      { id: 3, name: 'Hồ Koi Biệt Thự', client: 'Lê Văn C', status: 'Lên kế hoạch', completion: 10 },
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
              title="Tổng Doanh Thu"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
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
      </Row>

      <h2 className="text-xl font-semibold mt-8 mb-4">Dự Án Gần Đây</h2>
      <Table dataSource={recentProjects} columns={columns} />

      <Row gutter={16} className="mt-8">
        <Col span={12}>
          <Card title="Phân Bố Trạng Thái Dự Án">
            <Progress
              percent={75}
              success={{ percent: 30 }}
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
    </div>
  );
};

export default AdminDashboard;
