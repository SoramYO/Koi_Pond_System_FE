import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/blogs");
        setBlogs(res.data.advertisements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Blog List
      </h2>
      {user && ( 
        <Link
          to="/create-blog"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block mb-4"
        >
          Create Blog
        </Link>

      )}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`} // This is correct
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
                  className="text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
