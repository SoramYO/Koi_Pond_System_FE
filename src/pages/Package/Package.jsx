import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../axios/axiosInstance";
import Loading from "../../components/Loading";

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPackages = async () => {
            try {
                const res = await AxiosInstance.get("/services");
                setPackages(res.data.services); // Access the services array
                console.log(res.data.services);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    console.log(packages);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Package List
            </h2>
            {packages.length === 0 ? (
                <p className="text-center text-gray-600">
                    No packages found. Create a new one!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="flex flex-col h-full">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Gói {pkg.name}
                                </h3>
                                <p className="text-gray-600 mb-2"><strong> Giá:</strong> {new Intl.NumberFormat("vi-VN").format(pkg.price) + "đ"}</p>
                                <p className="text-gray-600 mb-2"><strong>Thòi hạn:</strong> {pkg.duration} days</p>
                                <p className="text-gray-600 mb-2"><strong>Số lần sử dụng: </strong> {pkg.usesPerDur}</p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Thông tin thêm:</strong>
                                </p>
                                <div
                                    className="text-gray-600 line-clamp-3 mb-4"
                                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                                />
                                <Link
                                    to={`/package/${pkg._id}`} // Adjust the route as needed
                                    className="mt-auto bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                                >
                                    Mua gói
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PackageList;