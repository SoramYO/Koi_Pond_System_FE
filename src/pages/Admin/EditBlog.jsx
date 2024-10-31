import { Editor } from "@tinymce/tinymce-react";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormField from "../../components/FormField";
import { storage } from "../../firebase/FirebaseConfig";
import axiosInstance from "../../axios/axiosInstance";
import Loading from "../../components/Loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    content: "",
    tags: [],
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/blog/${id}`);
        setFormData(res.data.advertisement);
      } catch (error) {
        console.error("Error fetching blog: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    const { _id, title, content, image, tags } = formData;
    if ((title && content && image && tags) || imagePreview) {
      try {
        setLoading(true);
        let imageUrlToSave = "";
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrlToSave = await getDownloadURL(snapshot.ref);
        const blogData = {
          title: formData.title,
          content: formData.content,
          image: imageUrlToSave
        };

        const res = await axiosInstance.patch(`/blog/${_id}`, blogData);
        toast.success(res.data.message);
        setLoading(false);

        navigate("/admin/blogs");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Error saving blog. Please try again.");
      }
    } else {
      toast.error("Please fill in all fields and upload an image.");
    }
  };

  const { title, content, imagePreview } = formData;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit a Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          {/* Display tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <div>
                <span
                  // key={index}
                  className="mr-3 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
                >
                  {tag.attribute_id.name}
                </span>
              </div>
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
              menubar: true, // Enable menubar for additional options
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "paste",
                "code",
                "help",
                "wordcount",
                "emoticons",
                "codesample",
                "hr",
                "pagebreak",
                "nonbreaking",
                "toc",
                "imagetools",
                "textpattern",
                "noneditable",
                "template",
                "save",
                "directionality",
                "visualchars",
                "quickbars",
              ],
              toolbar1: `undo redo | formatselect | bold italic underline strikethrough | 
              alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
              forecolor backcolor | link image media | removeformat code fullscreen help`,
              toolbar2: `styleselect | blocks | fontfamily fontsize | paste pastetext | emoticons hr | 
              table tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | 
              tableinsertcolbefore tableinsertcolafter tabledeletecol`,
              toolbar_mode: "sliding", // Enable toolbar sliding for better mobile experience
              block_formats:
                "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6; Quote=blockquote; Code=code",
              fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
              style_formats: [
                {
                  title: "Headings",
                  items: [
                    { title: "Heading 1", format: "h1" },
                    { title: "Heading 2", format: "h2" },
                    { title: "Heading 3", format: "h3" },
                  ],
                },
                {
                  title: "Inline",
                  items: [
                    { title: "Bold", format: "bold" },
                    { title: "Italic", format: "italic" },
                    { title: "Underline", format: "underline" },
                    { title: "Strikethrough", format: "strikethrough" },
                    { title: "Code", format: "code" },
                  ],
                },
                {
                  title: "Blocks",
                  items: [
                    { title: "Paragraph", format: "p" },
                    { title: "Blockquote", format: "blockquote" },
                    { title: "Code Block", format: "pre" },
                  ],
                },
              ],
              content_style: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
      code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
      blockquote { border-left: 3px solid #ccc; margin-left: 1.5em; padding-left: 1em; }
    `,
              image_advtab: true,
              paste_data_images: true,
              automatic_uploads: true,
              file_picker_types: "image",
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote",
              contextmenu: "link image table",
              browser_spellcheck: true,
              resize: true,
              autosave_interval: "30s",
              autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
              autosave_restore_when_empty: true,
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
            Update Blog Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img
                src={formData.imagePreview ? formData.imagePreview : formData.image}
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
             Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
