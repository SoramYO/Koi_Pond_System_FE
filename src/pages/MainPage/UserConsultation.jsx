import React, { useContext, useEffect, useState } from 'react';
import { Card, Spin, Empty, Button } from 'antd';
import { CalendarFilled } from '@ant-design/icons';
import { FiAlertCircle, FiMessageSquare } from 'react-icons/fi';
import { TbMailFilled } from 'react-icons/tb';
import { AuthContext } from '../../context/authContext';
import axiosInstance from '../../axios/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';



const UserConsultation = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchConsultations = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/consultations/user/${user._id}`);
                console.log(response.data.consultations);

                setConsultations(response.data.consultations);
            } catch (error) {
                toast.error('Failed to fetch consultations');
            } finally {
                setLoading(false);
            }
        };
        fetchConsultations();
    }, [user._id]);

    const getStatusStyles = (status) => {
        const styles = {
            'Chưa nhận': {
                color: 'bg-blue-50 text-blue-700 border-blue-100',
                icon: 'text-blue-600'
            },
            'Đã nhận': {
                color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                icon: 'text-indigo-600'
            },
            'Từ chối': {
                color: 'bg-red-50 text-red-700 border-red-100',
                icon: 'text-red-600'
            },
            'Đang tư vấn': {
                color: 'bg-amber-50 text-amber-700 border-amber-100',
                icon: 'text-amber-600'
            },
            'Hủy': {
                color: 'bg-slate-50 text-slate-700 border-slate-100',
                icon: 'text-slate-600'
            },
            'Hoàn thành': {
                color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                icon: 'text-emerald-600'
            }
        };
        return styles[status] || styles['Hủy'];
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const handleStartConsultation = (id, customerName) => {
        navigate(`/contact/${id}`, { state: { customerName } });
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Danh sách lịch tư vấn</h2>
                <p className="text-gray-600">
                    Quản lý và theo dõi các buổi tư vấn của bạn
                </p>
            </div>

            {/* Content */}
            {loading ? (
                <Loading />
            ) : consultations.length === 0 ? (
                <Empty
                    className="my-16"
                    description="Bạn chưa có lịch tư vấn nào"
                />
            ) : (
                <div className="space-y-4">
                    {consultations.map((consultation) => (
                        <Card key={consultation.id} className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="space-y-4">
                                {/* Card Header */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold">Tư vấn</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(consultation.status).color}`}>
                                        {consultation.status}
                                    </span>

                                </div>


                                {/* Card Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <TbMailFilled className="w-5 h-5 text-gray-400" />
                                            <span>{consultation.user.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CalendarFilled className="w-5 h-5 text-gray-400" />
                                            <span>{formatDate(consultation.timeBooked)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-2">
                                            <FiMessageSquare className="w-5 h-5 text-gray-400 mt-1" />
                                            <p className="text-gray-600 line-clamp-2">{consultation.description}</p>
                                        </div>
                                        {(consultation.status === 'Đang tư vấn' || consultation.status === 'Đã nhận') && (
                                            // hiện nút chat
                                            <Button
                                                className='w-full'
                                                type="primary"
                                                onClick={() => handleStartConsultation(consultation._id, consultation.user.name)}
                                                disabled={consultation.status === 'Hủy'}
                                            >
                                                Bắt đầu nhận tư vấn
                                            </Button>
                                        )}

                                        {consultation.status === "Từ chối" && consultation.rejectionReason && (
                                            <div className="flex items-start space-x-2 bg-red-50 p-3 rounded-lg">
                                                <FiAlertCircle className="w-5 h-5 text-red-500 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-red-700">Lý do từ chối:</p>
                                                    <p className="text-red-600">{consultation.rejectionReason}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserConsultation;