import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const selectedBlog = storedBlogs.find((blog) => blog.id === parseInt(id, 10));
        if (selectedBlog) {
            setBlog(selectedBlog);
        }
    }, [id]);

    if (!blog) {
        return <div className="max-w-4xl mx-auto p-4">Blog not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="mb-4 w-full h-96 object-cover rounded"
                />
            )}
            <p className="text-black-100 text-lg">{blog.content}</p>
        </div>
    );
};

export default BlogDetail;
