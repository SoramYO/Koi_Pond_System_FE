import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { onChildAdded, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/FirebaseConfig";
import axios from "axios";

const ManagerBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/blogs");
        setBlogs(res.data.advertisements);
        console.log(res.data.advertisements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (blogId) => {
    navigate(`/admin/edit-blog/${blogId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Blog List
      </h2>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">
          No blogs found.
          <button
            onClick={() => navigate("/admin/create-blog")}
            className="text-blue-500 underline"
          >
            Create a new one!
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />
                )}
                <div
                  className="text-gray-600 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: blog.content + "..." }}
                />
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(blog.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerBlog;
