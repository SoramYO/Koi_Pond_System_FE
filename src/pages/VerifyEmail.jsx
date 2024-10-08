import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../assets/images/logo.png";

function VerifyEmail() {
    const [email, setEmail] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    const handleVerify = async () => {
        setIsVerifying(true);
        try {
            console.log(email)
            const response = await axios.post('http://localhost:5222/api/v1/authenticate/verify-email', { email });
            toast.success(response.data.message)
            // Redirect to login page after 3 seconds
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.Message[0].DescriptionError);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img className="mx-auto h-24 w-auto" src={logo} alt="SGL Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Verify Your Email
                    </h2>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address to verify
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleVerify}
                                disabled={isVerifying}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isVerifying ? 'Verifying...' : 'Confirm Email'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
