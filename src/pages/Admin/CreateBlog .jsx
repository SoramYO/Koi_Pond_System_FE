import { Editor } from '@tinymce/tinymce-react';
import { get, push, ref } from "firebase/database";
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref as refStorage, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormField from '../../components/FormField';
import { db } from '../../firebase/FirebaseConfig';

const CreateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        imagePreview: null,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true)
            const fetchBlog = async () => {
                try {
                    const blogRef = ref(db, `blogs/${id}`); // Reference to the specific blog using the id
                    const snapshot = await get(blogRef); // Get the blog data

                    if (snapshot.exists()) {
                        const blogData = snapshot.val();

                        // Assuming blogData has a nested structure, access the first key
                        const blogKey = Object.keys(blogData)[0]; // This gets the dynamic key (like "-O99WEzeCm-ElOEqFSeu")

                        // Now, access the actual blog data
                        const { title, content, image, createdAt } = blogData[blogKey];

                        setFormData({
                            id: id, // Use the id from the URL
                            title: title,
                            content: content,
                            imagePreview: image,
                            createdAt: createdAt,
                        });

                    } else {
                        console.log("Blog not found.");
                    }
                } catch (error) {
                    console.error("Error fetching blog: ", error);
                } finally {
                    setLoading(false); // Stop loading after fetching
                }
            }
            fetchBlog();
        }
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({ ...prevData, imagePreview: reader.result, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, image } = formData;
        if (title && content && image || imagePreview) {
            try {

                if (!isEditing) {
                    const storage = getStorage();
                    const storageRef = refStorage(storage, `images/${image.name}`); // Create a reference to the file
                    await uploadBytes(storageRef, image); // Upload the file

                    imageUrl = await getDownloadURL(storageRef); // Get the download URL
                }
                // Now, save the blog data in Firestore
                const blogData = {
                    title,
                    content,
                    image: imageUrl,
                    createdAt: new Date().toISOString()
                };

                // Use Firestore for both create and update operations
                if (isEditing) {
                    const blogRef = doc(db, 'blogs', id);
                    await setDoc(blogRef, blogData); // Use setDoc to update the existing blog
                    toast.success('Blog updated successfully!');
                } else {
                    const id = `blog-${Math.random().toString(36).substr(2, 9)}`
                    await push(ref(db, `blogs/${id}`), blogData);
                    toast.success('Blog created successfully!');
                }

                navigate('/admin/blogs');
            } catch (error) {
                console.error("Error adding document: ", error);
                toast.error('Error saving blog. Please try again.');
            }
        } else {
            toast.error('Please fill in all fields and upload an image.');
        }
    };


    const { title, content, imagePreview } = formData;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
                {isEditing ? 'Edit Blog' : 'Create a New Blog'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    id="title"
                    label="Blog Title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                />
                <div className="mb-4">
                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                        Blog Content
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

                <div className="mb-4">
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                        {isEditing ? 'Update Blog Image' : 'Upload Blog Image'}
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

export default CreateBlog;