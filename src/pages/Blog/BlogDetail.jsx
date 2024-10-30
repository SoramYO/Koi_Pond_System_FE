import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./../../components/Loading";
import axios from "axios";
const BlogDetail = () => {
  const { id } = useParams(); // Retrieve id from URL
  const [blog, setBlog] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const predefinedTags = [
    "Giống Cá Koi",
    "Tính Năng Hồ",
    "Yếu Tố Cung Hoàng Đạo",
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/blog/${id}`);
        setBlog(res.data.advertisement);
        console.log(blog.tags);

        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading && <Loading />}
      <div>Blog</div>
      <h4
        className="text-5xl font-bold mb-4"
        style={{ fontWeight: "400", fontSize: "24px" }}
      >
        {blog.title}
      </h4>
      {blog &&
        blog?.tags.map((tag, index) => (
          <>
            <span
              // key={index}
              className="mr-3 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
            >
              {tag.TargetType === "KoiFishBreeds"
                ? "Giống Cá Koi"
                : tag.TargetType === "ZodiacElements"
                ? "Yếu Tố Cung Hoàng Đạo"
                : "Tính Năng Hồ"}
            </span>
            <span
              // key={index}
              className="mr-3 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full"
            >
              {tag.attribute_id.name}
            </span>
          </>
        ))}
      <div className="entry-divider is-divider small"></div>
      {/* Render blog content with HTML safely */}
      <div
        className="text-black-100 text-lg"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetail;
