import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminLayout = () => {

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                {/* Admin sidebar navigation */}
                <nav className="mt-5">
                    <a href="/admin" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Dashboard</a>
                    <a href="/admin/users" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Users</a>
                    <a href="/admin/projects" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Projects</a>
                    {/* Add more admin navigation items as needed */}
                </nav>
            </aside>
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
