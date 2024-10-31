import axios from "axios";
import React, { useState } from "react";
const DateGenderForm = () => {
  const [dateOfBirth, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);
  const [openDirection, setOpenDirection] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/calculation-feng-shui",
        {
          dateOfBirth,
          gender,
        }
      );
      console.log("Response:", response.data);
      await setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    }
  };

  const toggleDirection = (id) => {
    setOpenDirection(openDirection === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="border border-gray-300 rounded p-4 mb-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDob(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Xem kết quả
          </button>
        </form>
      </div>

      {/* Display result after successful response */}
      {result && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-gray-800 font-bold mb-2 text-center">Kết quả:</h2>
          <div className="flex flex-col items-center">
            <p>
              <strong>Bạn sinh ngày: </strong> {result.year}
              <span> Dương lịch </span>
            </p>
            <p>
              <strong>Tức ngày </strong> {result.lunarDate}
              <span> Âm Lịch </span>
            </p>
            <p>
              <strong>Giới tính: </strong> {result.gender}
            </p>
            {result.destiny && (
              <>
                <p>
                  <strong>Cung mệnh:</strong> {result.destiny.name}
                </p>
                <img
                  src={result.destiny.image}
                  alt="destiny"
                  className="my-4"
                />
              </>
            )}
          </div>
          {result.direction && (
            <div>
              <h3 className="text-gray-800 font-bold mb-2">Hướng:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded">
                  {result.direction.slice(0, 4).map((dir) => (
                    <div key={dir._id} className="mt-4 relative">
                      <button
                        className="text-gray-700 font-semibold cursor-pointer bold bg-gray-100 hover:bg-gray-200 p-2 rounded"
                        onClick={() => toggleDirection(dir._id)}
                      >
                        {dir.title}
                      </button>
                      {openDirection === dir._id && (
                        <div
                          className="absolute bg-white p-4 border border-gray-300 rounded shadow-md transition-opacity duration-300 mt-2"
                          style={{ zIndex: 10 }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: dir.content }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  {result.direction.slice(4).map((dir) => (
                    <div key={dir._id} className="mt-4 relative">
                      <button
                        className="text-gray-700 font-semibold cursor-pointer bold bg-gray-100 hover:bg-gray-200 p-2 rounded"
                        onClick={() => toggleDirection(dir._id)}
                      >
                        {dir.title}
                      </button>
                      {openDirection === dir._id && (
                        <div
                          className="absolute bg-white p-4 border border-gray-300 rounded shadow-md transition-opacity duration-300 mt-2"
                          style={{ zIndex: 10 }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: dir.content }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateGenderForm;
