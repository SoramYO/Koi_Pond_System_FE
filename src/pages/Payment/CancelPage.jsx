import React from 'react';
import { useNavigate } from 'react-router-dom';


const CancelPage = () => {

 
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4 text-red-600">Purchase Canceled</h2>
                <p className="text-gray-700 mb-6">
                    Your purchase has been canceled. If you have any questions, please contact our support team.
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

export default CancelPage;