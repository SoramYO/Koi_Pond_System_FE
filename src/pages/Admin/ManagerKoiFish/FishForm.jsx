import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Typography,
    Upload,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";
import { storage } from "../../../firebase/FirebaseConfig";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const FishForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [zodiacElements, setZodiacElements] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
    };

    useEffect(() => {
        fetchZodiacElements();
        if (id) {
            getFish(id);
        }
    }, [id]);

    const fetchZodiacElements = async () => {
        try {
            const response = await axiosInstance.get('/zodiac-elements');
            setZodiacElements(response.data.zodiacs);
        } catch (error) {
            toast.error("Failed to fetch zodiac elements");
        }
    };

    const getFish = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/get-koi-by-id/${id}`);
            console.log(response.data.koiFishBreed);
            const fishData = response.data.koiFishBreed;
            form.setFieldsValue({
                name: fishData.name,
                description: fishData.description,
                image_url: fishData.image_url,
                zodiac_element: fishData.zodiac_element._id
            });

            // If there's an existing image, add it to fileList
            if (fishData.image_url) {
                setFileList([{
                    uid: '-1',
                    name: 'existing-image',
                    status: 'done',
                    url: fishData.image_url,
                }]);
            }
        } catch (error) {
            toast.error("Failed to fetch fish details");
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (isEdit) {
                await axiosInstance.patch(`/koi-fish-breed/${id}`, values);
                toast.success("Fish updated successfully");
            } else {
                await axiosInstance.post("/koi-fish-breed", values);
                toast.success("Fish created successfully");
            }
            navigate("/admin/manager-fish");
        } catch (error) {
            toast.error("Failed to save fish");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Title level={2} className="mb-6 text-center">
                {isEdit ? "Edit Fish" : "Add New Fish"}
            </Title>

            <div className="bg-white rounded-lg shadow-md p-6">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    disabled={loading}
                    className="space-y-4"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please input the fish name!" }]}
                    >
                        <Input
                            placeholder="Enter fish name"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please input the description!" }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Enter description"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="image_url"
                        label="Image"
                        rules={[{ required: true, message: "Please upload an image!" }]}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={{ showPreviewIcon: true }}
                            fileList={fileList}
                            onPreview={handlePreview}
                            onRemove={() => {
                                setFileList([]);
                                form.setFieldsValue({ image_url: '' });
                            }}
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const storageRef = ref(storage, `images/${file.name}`);
                                    const snapshot = await uploadBytes(storageRef, file);
                                    const url = await getDownloadURL(snapshot.ref);
                                    form.setFieldsValue({ image_url: url });
                                    setFileList([
                                        {
                                            uid: file.uid,
                                            name: file.name,
                                            status: 'done',
                                            url: url,
                                        },
                                    ]);
                                    onSuccess(null, file);
                                } catch (error) {
                                    toast.error("Failed to upload image");
                                    onError(error);
                                }
                            }}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                        <Modal
                            open={previewVisible}
                            title="Preview Image"
                            footer={null}
                            onCancel={() => setPreviewVisible(false)}
                        >
                            <img
                                alt="Preview"
                                style={{ width: '100%' }}
                                src={previewImage}
                            />
                        </Modal>
                    </Form.Item>

                    <Form.Item
                        name="zodiac_element"
                        label="Zodiac Element"
                        rules={[{ required: true, message: "Please select a zodiac element!" }]}
                    >
                        <Select
                            placeholder="Select zodiac element"
                            className="w-full rounded-md"
                        >
                            {zodiacElements.map(element => (
                                <Option key={element._id} value={element._id}>
                                    {element.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button
                            onClick={() => navigate("/admin/manager-fish")}
                            className="hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            {isEdit ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FishForm;