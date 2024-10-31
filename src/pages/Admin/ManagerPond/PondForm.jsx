import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Switch, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";

const { Title } = Typography;
const { Option } = Select;

const PondForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [zodiacElements, setZodiacElements] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    targetType: "",
    value: "",
    zodiac_element: "",
    status: false, // Initialize with false (Inactive)
  });

  useEffect(() => {
    fetchZodiacElements();
    if (isEditing) {
      fetchData();
    } else {
      form.setFieldsValue({ status: false });
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/pond-feature/${id}`);
      const data = {
        ...response.data.pondFeature,
        zodiac_element: response.data.pondFeature.zodiac_element._id,
        status: response.data.pondFeature.status === "Active",
      };
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Error fetching zodiac elements:", error);
      toast.error("Failed to fetch zodiac elements");
    }
  };

  const fetchZodiacElements = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/zodiac-elements`);
      setZodiacElements(response.data.zodiacs);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        status: values.status ? "Active" : "Inactive",
      };
      if (isEditing) {
        console.log("data", data);
        await axiosInstance.patch(`/pond-feature/${id}`, data);
        toast.success("Updated successfully");
      } else {
        await axiosInstance.post("/pond-feature", data);
        toast.success("Created successfully");
      }
      navigate("/admin/manager-pond");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        {isEditing ? "Edit Zodiac" : "Add New Zodiac"}
      </Title>
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-2xl"
        >
          <Form.Item
            name="targetType"
            label="Target Type"
            rules={[{ required: true, message: "Please input the target type!" }]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: "Please input the value!" }]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="zodiac_element"
            label="Zodiac Element"
            rules={[{ required: true, message: "Please select a zodiac element!" }]}
          >
            <Select className="w-full">
              {zodiacElements.map((element) => (
                <Option key={element._id} value={element._id}>
                  {element.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              defaultChecked={formData.status}
            />
          </Form.Item>

          <Form.Item className="flex justify-start gap-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isEditing ? "Update" : "Create"}
            </Button>
            <Button
              onClick={() => navigate("/admin/manager-pond")}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PondForm;
