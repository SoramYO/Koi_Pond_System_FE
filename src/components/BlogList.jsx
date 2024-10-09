import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
    }, []);

    return (

        <div className="max-w-6xl mx-auto p-4">
            <div
                className="bg-cover bg-center min-h-screen"
                style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663948060611-4168fe397a7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            ></div>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Blog List</h2>
            {blogs.length === 0 ? (
                <p className="text-center text-gray-600">No blogs found. Create a new one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blog/${blog.id}`}
                            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-40 w-full object-cover rounded-md mb-4"
                                    />
                                )}
                                <p className="text-gray-600 line-clamp-3">
                                    {blog.content.length > 150
                                        ? blog.content.substring(0, 150) + '...'
                                        : blog.content}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
