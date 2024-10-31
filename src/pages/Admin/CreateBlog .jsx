import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormField from "../../components/FormField";
import { db, storage } from "../../firebase/FirebaseConfig";
import axiosInstance from "../../Axios/axiosInstance";
import Loading from "../../components/Loading";

const CreateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [childTagInput, setChildTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [suggestedChildTags, setSuggestedChildTags] = useState([]);
  const predefinedTags = [
    "KoiFishBreeds",
    "PondFeatures",
    "ZodiacElements",
    "WaterClarity",
    "FishCare",
  ];

  const childTags = {
    KoiFishBreeds: ["Kohaku", "Sanke", "Showa", "Taisho Sanke"],
    PondFeatures: ["Waterfall", "Fountain", "Bridge", "Statue"],
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    image: null,
    imagePreview: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchBlog = async () => {
        try {
          const blogRef = ref(db, `blogs/${id}`); // Reference to the specific blog using the id
          //const snapshot = await get(blogRef); // Get the blog data

          //   if (snapshot.exists()) {
          //     const blogData = snapshot.val();

          //     // Assuming blogData has a nested structure, access the first key
          //     const blogKey = Object.keys(blogData)[0]; // This gets the dynamic key (like "-O99WEzeCm-ElOEqFSeu")

          //     // Now, access the actual blog data
          //     const { title, content, image, createdAt } = blogData[blogKey];

          //     setFormData({
          //       id: id, // Use the id from the URL
          //       title: title,
          //       content: content,
          //       imagePreview: image,
          //       createdAt: createdAt,
          //     });
          //   } else {
          //     console.log("Blog not found.");
          //   }
        } catch (error) {
          console.error("Error fetching blog: ", error);
        } finally {
          setLoading(false); // Stop loading after fetching
        }
      };
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
        setFormData((prevData) => ({
          ...prevData,
          imagePreview: reader.result,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image } = formData;
    if ((title && content && image) || imagePreview) {
      try {
        setLoading(true);
        let imageUrlToSave = imageUrl;

        if (!isEditing) {
          const storageRef = ref(storage, `images/${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          imageUrlToSave = await getDownloadURL(snapshot.ref);
        }

        const blogData = {
          title,
          content,
          image: imageUrlToSave,
        };

        if (isEditing) {
          // const blogRef = doc(db, "blogs", id);
          // await setDoc(blogRef, blogData);
          toast.success("Blog updated successfully!");
          setLoading(false);
        } else {
          console.log(blogData);
          const res = await axiosInstance.post("/blog", blogData);
          toast.success(res.data.message);
          setLoading(false);
        }
        navigate("/admin/blogs");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Error saving blog. Please try again.");
      }
    } else {
      toast.error("Please fill in all fields and upload an image.");
    }
  };

  const { title, content, tags, imagePreview } = formData;
  const handleAddTag = (tag) => {
    if (tag.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
      setSelectedTag(tag);
      setTagInput(tag);
      setSuggestedTags([]); // Clear suggestions

      console.log(childTags[tag]);
      setSuggestedChildTags(childTags[tag] || []);
    }
  };
  const handleRemoveTag = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    setTagInput(input);

    if (input.trim() === "") {
      setSuggestedTags([]);
      return;
    }

    const matchingTags = predefinedTags.filter((tag) =>
      tag.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestedTags(matchingTags);
  };

  const handleChildTagInputChange = (e) => {
    const input = e.target.value;
    setChildTagInput(input);

    if (input.trim() === "") {
      setSuggestedChildTags([]);
      return;
    }

    // Filter child tags based on the input
    const matchingChildTags = childTags[selectedTag].filter((childTag) =>
      childTag.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestedChildTags(matchingChildTags);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isEditing ? "Edit Blog" : "Create a New Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <div className="row">
            <div className="col-6">
              <label
                htmlFor="tag"
                className="block text-lg font-medium text-gray-700"
              >
                Tag
              </label>
              <input
                type="text"
                id="tag"
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Enter a tag name"
                className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Suggested tags */}
              {suggestedTags.length > 0 && (
                <div className="mt-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                  {suggestedTags.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAddTag(suggestion)}
                      className="block text-left w-full p-2 text-blue-700 hover:bg-blue-100"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedTag && (
              <div className="col-6">
                <label
                  htmlFor="childTag"
                  className="block text-lg font-medium text-gray-700"
                >
                  {selectedTag} Elements
                </label>
                <input
                  type="text"
                  id="childTag"
                  value={childTagInput}
                  onChange={handleChildTagInputChange}
                  placeholder={`Search ${selectedTag} elements`}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {suggestedChildTags.length > 0 && (
                  <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 mt-2">
                    {suggestedChildTags.map((childTag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAddTag(childTag)}
                        className="block text-left w-full p-2 text-blue-700 hover:bg-blue-100"
                      >
                        {childTag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Display tags */}
          <div className="mt-2 flex flex-wrap gap-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-white rounded-full p-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <FormField
          id="title"
          label="Blog Title"
          value={title}
          onChange={handleChange}
          placeholder="Enter blog title"
        />
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Blog Content
          </label>

          <Editor
            apiKey="rzelnlucawqxdndppr49miokeqs2tvdf8tjz1dg182z52ucv"
            value={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
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
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700"
          >
            {isEditing ? "Update Blog Image" : "Upload Blog Image"}
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
            {isEditing ? "Update Blog" : "Create Blog"}
          </button>
          {title && content && (
            <button
              type="button"
              onClick={() =>
                alert(`Preview:\nTitle: ${title}\nContent: ${content}`)
              }
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
