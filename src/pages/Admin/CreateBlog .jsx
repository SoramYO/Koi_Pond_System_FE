import React, { useState } from 'react';

// Component for handling form fields
const FormField = ({ id, label, value, onChange, placeholder, type = 'text', isTextArea = false }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-lg font-medium text-gray-700">
            {label}
        </label>
        {isTextArea ? (
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder={placeholder}
                rows="8"
            ></textarea>
        ) : (
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder={placeholder}
            />
        )}
    </div>
);

// Main Blog Creation Component
const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        imagePreview: null,
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form data changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData((prevData) => ({ ...prevData, imagePreview: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, content, imagePreview } = formData;
        if (title && content && imagePreview) {
            const newBlog = {
                id: Date.now(),
                title,
                content,
                image: imagePreview,
            };
            const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
            blogs.push(newBlog);
            localStorage.setItem('blogs', JSON.stringify(blogs));

            // Reset form after successful submission
            setFormData({ title: '', content: '', image: null, imagePreview: null });
            setErrorMessage('');
            alert('Blog created successfully!');
        } else {
            setErrorMessage('Please fill in all fields and upload an image.');
        }
    };

    const { title, content, imagePreview } = formData;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h2>

            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <FormField
                    id="title"
                    label="Blog Title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                />

                {/* Content Field */}
                <FormField
                    id="content"
                    label="Blog Content"
                    value={content}
                    onChange={handleChange}
                    placeholder="Write your blog content here"
                    isTextArea
                />

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                        Upload Blog Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Selected"
                                className="mt-2 w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Submit and Preview Buttons */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Blog
                    </button>
                    {title && content && (
                        <button
                            type="button"
                            onClick={() => alert(`Preview:\nTitle: ${title}\nContent: ${content}`)}
                            className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Preview Blog
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
