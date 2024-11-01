import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axiosInstance';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {

                if (!user) {
                    navigate("/login");
                    toast.error("Vui lòng đăng nhập để xem thông tin tài khoản.");
                    return;
                }
                const userId = user._id;
                const response = await axiosInstance.get(`/user/${userId}`);

                dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });

            } catch (error) {
                toast.error("Failed to fetch user profile");
            }
        };

        fetchUserProfile();
    }, [navigate, dispatch, user]);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4 text-green-600">Purchase Successful!</h2>
                <p className="text-gray-700 mb-6">
                    Thank you for your purchase. Your transaction has been completed successfully.
                </p>
                <button
                    onClick={handleBackToHome}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;