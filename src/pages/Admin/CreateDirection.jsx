import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormField from '../../components/FormField';
import axios from 'axios';

const CreateDirection = () => {
    const navigate = useNavigate();
    const [destinies, setDestinies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        destiny: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/destinies`);
                setDestinies(response.data.destinies);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching destinies:", error);
                toast.error("Error loading destinies.");
            }
        };
        getdata();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, destiny } = formData;
        if (title && content && destiny) {
            try {
                const directionData = {
                    title,
                    content,
                    destiny,
                };
                const res = await axios.post('http://localhost:8080/api/v1/direction', directionData);
                toast.success(res.data.message);
            } catch (error) {
                console.error("Error saving blog:", error);
                toast.error('Error saving blog. Please try again.');
            }
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    const { title, content } = formData;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {isEditing ? 'Edit Blog' : 'Create a New Direction'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="title"
                    label="Direction Title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                />
                <div className="mb-4">
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                        Direction Content
                    </label>

                    <Editor
                        apiKey="rzelnlucawqxdndppr49miokeqs2tvdf8tjz1dg182z52ucv"
                        value={content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar: `undo redo | formatselect | bold italic backcolor | 
                                      alignleft aligncenter alignright alignjustify | 
                                      bullist numlist outdent indent | removeformat | help`,
                        }}
                        onEditorChange={(newContent) =>
                            setFormData((prevData) => ({ ...prevData, content: newContent }))
                        }
                    />
                </div>

                {/* Dropdown for Destiny */}
                <div className="mb-4">
                    <label htmlFor="destiny" className="block text-lg font-medium text-gray-700">
                        Select Destiny
                    </label>
                    <select
                        id="destiny"
                        value={formData.destiny}
                        onChange={handleChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a destiny...</option>
                        {!loading && destinies.map((destiny) => (
                            <option key={destiny._id} value={destiny._id}>
                                {destiny.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isEditing ? 'Update Blog' : 'Create Blog'}
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

export default CreateDirection;
