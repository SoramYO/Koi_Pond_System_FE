import React from 'react';
import { Outlet } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiFileText } from 'react-icons/fi'; // Import icons from react-icons

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                {/* Admin sidebar navigation */}
                <nav className="mt-5">
                    <a href="/admin" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <FiHome className="mr-2" /> {/* Home icon for Dashboard */}
                        Dashboard
                    </a>
                    <a href="/admin/users" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <FiUsers className="mr-2" /> {/* Users icon */}
                        Users
                    </a>
                    <a href="/admin/projects" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <FiClipboard className="mr-2" /> {/* Projects icon */}
                        Projects
                    </a>
                    <a href="/admin/create-blog" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
                        <FiFileText className="mr-2" /> {/* Blog icon */}
                        Blog
                    </a>
                    {/* Add more admin navigation items with icons as needed */}
                </nav>
            </aside>
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
