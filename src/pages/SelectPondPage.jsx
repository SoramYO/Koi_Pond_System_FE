import React from "react";
import { useParams } from "react-router-dom";

const SelectPondPage = () => {
    const { id } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Chọn Mẫu Hồ Cá Koi</h1>
            <p className="text-lg mb-4">Bạn đã chọn mẫu hồ cá Koi với ID: {id}</p>
            <p className="text-base">
                Thông tin chi tiết về mẫu hồ cá Koi này sẽ được hiển thị ở đây.
            </p>
            {/* Add more details or options related to the selected pond model */}
        </div>
    );
};

export default SelectPondPage;

