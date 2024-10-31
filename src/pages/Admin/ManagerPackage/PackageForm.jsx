import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios/axiosInstance";

const PackageForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    price: 0,
    duration: 0,
    description: "",
    usesPerDur: 0,
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const fetchPackageData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/service/${id}`);
      console.log("Fetched data:", response.data.service); // Log fetched data
      setFormValues(response.data.service);
    } catch (error) {
      console.error("Error fetching package data:", error);
      toast.error("Failed to fetch package data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      fetchPackageData();
    }
  }, [isEditing, fetchPackageData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    console.log("Form values on submit:", formValues); // Log form values on submit
    try {
      setLoading(true);
      if (isEditing) {
        await axiosInstance.patch(`/service/${id}`, formValues);
        toast.success("Package updated successfully");
      } else {
        await axiosInstance.post("/service", formValues);
        toast.success("Package created successfully");
      }
      navigate("/admin/packages");
    } catch (error) {
      console.error("Error saving package:", error);
      toast.error("Failed to save package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Package" : "Add New Package"}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <form onSubmit={onFinish} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Package Name
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={(e) => handleNumberChange("price", e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Duration (days)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formValues.duration}
                  onChange={(e) => handleNumberChange("duration", e.target.value)}
                  required
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Uses Per Duration
                </label>
                <input
                  type="number"
                  name="usesPerDur"
                  value={formValues.usesPerDur}
                  onChange={(e) => handleNumberChange("usesPerDur", e.target.value)}
                  required
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Create"} Package
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/packages")}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PackageForm;
