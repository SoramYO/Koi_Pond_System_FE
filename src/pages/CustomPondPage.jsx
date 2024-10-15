import React from "react";
import { useParams } from "react-router-dom";

const CustomPondPage = () => {
    const { id } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Tùy Chỉnh Hồ Cá Koi</h1>
            <p className="text-lg mb-4">Tùy chỉnh hồ cá Koi với ID: {id}</p>
            <p className="text-base">
                Tại đây, bạn có thể tùy chỉnh kích thước, hình dáng và các tính năng khác của hồ cá Koi.
            </p>
            {/* Add customization options for the pond */}
        </div>
    );
};

export default CustomPondPage;

