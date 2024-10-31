import { Editor } from "@tinymce/tinymce-react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormField from "../../../components/FormField";
import { storage } from "../../../firebase/FirebaseConfig";
import axiosInstance from "../../../axios/axiosInstance";
import Loading from "../../../components/Loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [pondFeature, setPondFeature] = useState([]);
  const [koiFishBreeds, setKoiFishBreeds] = useState([]);
  const [zodiacElements, setZodiacElements] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [childTagInput, setChildTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [suggestedChildTags, setSuggestedChildTags] = useState([]);
  const predefinedTags = [
    "Giống Cá Koi",
    "Tính Năng Hồ",
    "Yếu Tố Cung Hoàng Đạo",
  ];
  const vietnameseTranslation = {
    koiFishBreeds: "Giống Cá Koi",
    pondFeature: "Tính Năng Hồ",
    zodiacElements: "Yếu Tố Cung Hoàng Đạo",
  };

  const translateToVietnamese = (key) => vietnameseTranslation[key] || key;

  const childTags = {
    [translateToVietnamese("pondFeature")]: pondFeature.map(
      (feature) => feature.targetType + ":" + feature.value
    ),
    [translateToVietnamese("koiFishBreeds")]: koiFishBreeds.map(
      (breed) => breed.name
    ),
    [translateToVietnamese("zodiacElements")]: zodiacElements.map(
      (element) => element.name
    ),
  };

  const [formData, setFormData] = useState({
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
        const pondFeatures = await axiosInstance.get(`/pond-features`);
        setPondFeature(pondFeatures.data.pondFeatures);

        const koiFishBreeds = await axiosInstance.get(`/koi-fish-breeds`);
        setKoiFishBreeds(koiFishBreeds.data.koiFishBreeds);

        const zodiacElements = await axiosInstance.get(`/zodiac-elements`);
        setZodiacElements(zodiacElements.data.zodiacs);
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
    const { title, content, image, tags } = formData;
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
          image: imageUrlToSave,
          tags: formData.tags,
        };

        console.log(blogData);
        const res = await axiosInstance.post("/blog", blogData);
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

  const { title, content, tags, imagePreview } = formData;

  const handleAddTag = (tag) => {
    // Check if the tag already exists
    if (!formData.tags.some((t) => t.tag === tag)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, { tag: tag, childTags: [] }], // Create new tag with empty childTags
      }));
      setSelectedTag(tag);
      setTagInput(""); // Clear input after adding
      setSuggestedTags([]); // Clear suggested tags

      const childTagsForTag = childTags[tag] || [];
      setSuggestedChildTags(childTagsForTag);
    } else {
      toast.warning("Tag đã được chọn trước đó!");
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

    // Kiểm tra lại selectedTag và childTags[selectedTag] trước khi lọc
    if (selectedTag && childTags[selectedTag]) {
      const matchingChildTags = childTags[selectedTag].filter((childTag) =>
        childTag.toLowerCase().includes(input.toLowerCase())
      );

      setSuggestedChildTags(matchingChildTags);
      console.log("Matching child tags:", matchingChildTags); // Kiểm tra các gợi ý phù hợp
    } else {
      setSuggestedChildTags([]);
    }
  };
  const handleAddChildTag = (childTag) => {
    if (childTag.trim() !== "") {
      setFormData((prevData) => {
        const updatedTags = prevData.tags.map((item) => {
          if (item.tag === selectedTag) {
            // If the selected tag matches, add the child tag
            return { ...item, childTags: [...item.childTags, childTag] };
          }
          return item; // Return the tag unchanged
        });

        return {
          ...prevData,
          tags: updatedTags, // Update the tags with the new child tag
        };
      });
      setChildTagInput(""); // Clear child tag input after adding
      setSuggestedChildTags([]); // Clear suggested child tag suggestions
    }
  };
  const handleRemoveChildTag = (tagIndex, childTagIndex) => {
    setFormData((prevData) => {
      const updatedTags = prevData.tags.map((tag, index) => {
        if (index === tagIndex) {
          // Remove the child tag by filtering out the specific childTag
          return {
            ...tag,
            childTags: tag.childTags.filter(
              (_, cIndex) => cIndex !== childTagIndex
            ),
          };
        }
        return tag; // Return the tag unchanged
      });

      return {
        ...prevData,
        tags: updatedTags, // Update the tags with the modified child tag
      };
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a New Blog</h2>

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
                    {suggestedChildTags.map((childTag) => (
                      <div
                        key={childTag}
                        className="block text-left w-full p-2 text-blue-700 hover:bg-blue-100"
                        onClick={() => handleAddChildTag(childTag)}
                      >
                        {childTag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Display tags */}
          <div className="mt-2 flex flex-wrap gap-4">
            {tags.map((tag, index) => (
              <div>
                <span
                  // key={index}
                  className="mr-3 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
                >
                  {tag.tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </span>
                {tag.childTags.length > 0 && (
                  <div className="ml-5">
                    {tag.childTags.map((childTag, childIndex) => (
                      <span
                        key={childIndex}
                        className="mt-2 inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full"
                      >
                        {childTag}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveChildTag(index, childIndex)
                          }
                          className="ml-1 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                'media', 'table', 'paste', 'code', 'help', 'wordcount', 'emoticons',
                'codesample', 'hr', 'pagebreak', 'nonbreaking', 'toc', 'imagetools',
                'textpattern', 'noneditable', 'template', 'save', 'directionality',
                'visualchars', 'quickbars'
              ],
              toolbar1: `undo redo | formatselect | bold italic underline strikethrough | 
              alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
              forecolor backcolor | link image media | removeformat code fullscreen help`,
              toolbar2: `styleselect | blocks | fontfamily fontsize | paste pastetext | emoticons hr | 
              table tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | 
              tableinsertcolbefore tableinsertcolafter tabledeletecol`,
              toolbar_mode: 'sliding', // Enable toolbar sliding for better mobile experience
              block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6; Quote=blockquote; Code=code',
              fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
              style_formats: [
                {
                  title: 'Headings', items: [
                    { title: 'Heading 1', format: 'h1' },
                    { title: 'Heading 2', format: 'h2' },
                    { title: 'Heading 3', format: 'h3' }
                  ]
                },
                {
                  title: 'Inline', items: [
                    { title: 'Bold', format: 'bold' },
                    { title: 'Italic', format: 'italic' },
                    { title: 'Underline', format: 'underline' },
                    { title: 'Strikethrough', format: 'strikethrough' },
                    { title: 'Code', format: 'code' }
                  ]
                },
                {
                  title: 'Blocks', items: [
                    { title: 'Paragraph', format: 'p' },
                    { title: 'Blockquote', format: 'blockquote' },
                    { title: 'Code Block', format: 'pre' }
                  ]
                }
              ],
              content_style: `
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
      code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
      blockquote { border-left: 3px solid #ccc; margin-left: 1.5em; padding-left: 1em; }
    `,
              image_advtab: true,
              paste_data_images: true,
              automatic_uploads: true,
              file_picker_types: 'image',
              quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
              contextmenu: 'link image table',
              browser_spellcheck: true,
              resize: true,
              autosave_interval: '30s',
              autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
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
            Create Blog
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
