import { StarFilled, } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { LuFish, LuNewspaper, LuUser } from "react-icons/lu";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import axiosInstance from './../../axios/axiosInstance';
const KoiFengShuiDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeConsultations: 0,
    completedConsultations: 0,
    totalRevenue: 0,
    totalAds: 0,
    premiumUsers: 0,
    koiVarieties: 0,
    averageRating: 4.7
  });

  const [recentConsultations, setRecentConsultations] = useState([]);
  const [elementDistribution, setElementDistribution] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState([]);

  useEffect(() => {

    // Mock data - sẽ được thay thế bằng API calls
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/revenew");
        setStats(res.data.stats);
        const res2 = await axiosInstance.get("/piechart");
        setElementDistribution(res2.data.elementDistribution);
        const res3 = await axiosInstance.get("/barchart");
        setMonthlyStats(res3.data.monthlyStats);
        const res4 = await axiosInstance.get("/nearlyConsultation");
        setRecentConsultations(res4.data.recentConsultations);
        const res5 = await axiosInstance.get("/premiumUsers");
        setPremiumUsers(res5.data.premiumUsers);
        console.log(res5.data.premiumUsers);

      } catch (error) {
        console.error(error);
      }
    };
    setStats({
      activeConsultations: 45,
      completedConsultations: 180,
      totalRevenue: 75000000,
      premiumUsers: 320,
      averageRating: 4.8
    });

    getData();
  }, []);

  const columns = [
    {
      title: "Khách Hàng",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "Bản Mệnh",
      dataIndex: "element",
      key: "element",
      render: (element) => {
        const colors = {
          Kim: "gold",
          Mộc: "green",
          Thủy: "blue",
          Hỏa: "red",
          Thổ: "brown"
        };
        return <Tag color={colors[element]}>{element}</Tag>;
      }
    },
    {
      title: "Loại Koi",
      dataIndex: "koiType",
      key: "koiType"
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Hoàn thành" ? "green" : "blue"}>{status}</Tag>
      )
    },
    {
      title: "Phần Trăm Hoàn Thành",
      dataIndex: "compatibility",
      key: "compatibility",
      render: (compatibility) => (
        <Progress percent={compatibility} style={{ width: '100%' }} />
      )

    }
  ];

  const columnPremiumUser = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Birth Date',
      dataIndex: 'birth',
      key: 'birth',
      render: (birth) => new Date(birth).toLocaleDateString() // Format date
    },
    {
      title: 'Zodiac Element',
      dataIndex: 'zodiacElement',
      key: 'zodiacElement',
      render: (element) => {
        const colors = {
          Kim: 'gold',
          Mộc: 'green',
          Thủy: 'blue',
          Hỏa: 'red',
          Thổ: 'brown'
        };
        return <Tag color={colors[element]}>{element}</Tag>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => `${new Intl.NumberFormat("vi-VN").format(balance)} đ`
    },
    {
      title: 'Token Points',
      dataIndex: 'tokenPoint',
      key: 'tokenPoint'
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Tổng Quan Hệ Thống Tư Vấn Koi Phong Thủy</h1>

      {/* Thống kê tổng quan */}
      <Row className="gap-6">
        <Col className="flex-1">
          <Card>
            <div className="flex items-center gap-4">
              <LuUser className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Tổng Người Dùng</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col className="flex-1">
          <Card>
            <div className="flex items-center gap-4">
              <LuFish className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Loại Koi</p>
                <p className="text-2xl font-bold">{stats.koiVarieties}</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col className="flex-1">
          <Card>
            <div className="flex items-center gap-4">
              <LuNewspaper className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Tin Đăng</p>
                <p className="text-2xl font-bold">{stats.totalAds}</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col className="flex-1">
          <Card>
            <div className="flex items-center gap-4">
              <StarFilled className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Đánh Giá TB</p>
                {/* <p className="text-2xl font-bold">{stats.averageRating}/5</p> */}
                <p className="text-2xl font-bold">4.6/5</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ và bảng */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Phân Bố Ngũ Hành</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={elementDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {elementDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Thống Kê Theo Tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Doanh Thu" stroke="#8884d8" fill="#82ca9d" />
              <Area type="monotone" dataKey="ads" name="Tin Đăng" stroke="#82ca9d" fill="#ffc658" />
              <Area type="monotone" dataKey="consultations" name="Lượt Tư Vấn" stroke="#ffc658" fill="#8884d8" />

            </AreaChart>
          </ResponsiveContainer>
        </Card>

      </div>

      {/* Bảng tư vấn gần đây */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Tư Vấn Gần Đây</h2>
        <Table columns={columns} dataSource={recentConsultations} />
      </Card>

      {/* Thống kê chi tiết */}
      <div className="mt-8 ">
        <Card className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Người Dùng Premium</h2>
          <Table columns={columnPremiumUser} dataSource={premiumUsers} />
        </Card>
      </div>
    </div>
  );
};

export default KoiFengShuiDashboard;