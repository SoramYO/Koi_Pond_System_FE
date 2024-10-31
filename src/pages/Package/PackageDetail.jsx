import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../axios/axiosInstance';
import Loading from '../../components/Loading';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchPackageDetail = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/service/${id}`);
        setPackageDetail(response.data.service);
      } catch (err) {
        console.error('Error fetching package detail:', err);
        setError('Failed to fetch package detail');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetail();
  }, [id]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const purchaseData = {
        packageId: id,
        userId: user._id,
      };
      const response = await axiosInstance.post('/purchase', purchaseData);
      if (response.status !== 200) {
        throw new Error('Failed to purchase package');
      }

      toast.success('Package purchased successfully');
      navigate(`/success`);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error purchasing package:', error.response.data);
        toast.error(error.response.data.message || 'Failed to purchase package');
      }
    } finally {
      setLoading(false);
      setShowModal(false); // Close modal after handling purchase
    }
  };

  const openModal = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!packageDetail) {
    return <div className="text-center">No package detail found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {packageDetail.name}
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> ${packageDetail.price}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Duration:</strong> {packageDetail.duration} days
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Uses Per Duration:</strong> {packageDetail.usesPerDur}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Description:</strong>
        </p>
        <div
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: packageDetail.description }}
        />
        <button
          onClick={openModal}
          className="bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Mua ngay
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-center">Confirm Purchase</h3>
            <p className="text-gray-700 mb-4 text-center">Are you sure you want to purchase this package?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePurchase}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
