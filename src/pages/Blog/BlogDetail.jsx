import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/FirebaseConfig';
import Loading from './../../components/Loading';
const BlogDetail = () => {
    const { id } = useParams(); // Retrieve id from URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            try {
                const blogRef = ref(db, `blogs/${id}`); // Reference to the specific blog using the id
                const snapshot = await get(blogRef); // Get the blog data

                if (snapshot.exists()) {
                    const blogData = snapshot.val();

                    // Assuming blogData has a nested structure, access the first key
                    const blogKey = Object.keys(blogData)[0]; // This gets the dynamic key (like "-O99WEzeCm-ElOEqFSeu")

                    // Now, access the actual blog data
                    const { title, content, image, createdAt } = blogData[blogKey];

                    setBlog({
                        id: id, // Use the id from the URL
                        title: title,
                        content: content,
                        image: image,
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
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <Loading />;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {loading && <Loading />}
            <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="mb-4 w-full h-96 object-cover rounded"
                />
            )}
            {/* Render blog content with HTML safely */}
            <div
                className="text-black-100 text-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    );
};

export default BlogDetail;
