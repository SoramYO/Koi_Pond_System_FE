import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios/axiosInstance";

const { Title } = Typography;
const { Option } = Select;

const PondForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      fetchPondData();
    }
  }, [id]);

  const fetchPondData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/get-pond-feature/${id}`);
      form.setFieldsValue(response.data.pond);
    } catch (error) {
      console.error("Error fetching pond data:", error);
      toast.error("Failed to fetch pond data");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (isEditing) {
        await axiosInstance.put(`/pond/pond/${id}`, values);
        toast.success("Pond updated successfully");
      } else {
        await axiosInstance.post("/pond/ponds", values);
        toast.success("Pond created successfully");
      }
      navigate("/ponds");
    } catch (error) {
      console.error("Error saving pond:", error);
      toast.error("Failed to save pond");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>{isEditing ? "Edit Pond" : "Add New Pond"}</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: true }}
        >
          <Form.Item
            name="targetType"
            label="Target Type"
            rules={[{ required: true, message: "Please input the pond name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: "Please input the value!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="shape" label="Shape">
            <Select>
              <Option value="rectangular">Rectangular</Option>
              <Option value="circular">Circular</Option>
              <Option value="irregular">Irregular</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch checked={form.getFieldValue("status") === "Active"}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Create"} Pond
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate("/admin/manager-pond")}
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
