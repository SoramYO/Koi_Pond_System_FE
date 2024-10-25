import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { calculatePriceByArea } from "../components/Calculate/PondAreaCalculator";
import ComponentsSelection from "./ComponentsSelection";
import Loading from "./Loading";
import { getStatusColor } from "./utils/helpers";
const OrderDetails = ({ order, customerDetails, onOrderUpdate, isSaving }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [componentsData, setComponentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pondDetails, setPondDetails] = useState({
    pondName: "",
    description: "",
    pondDepth: 0,
    area: 0,
    location: "",
    shape: "",
    accountId: 0,
    designImage: "",
    status: true,
    sampleType: 0,
    listComponent: [],
  });
  const [editedOrder, setEditedOrder] = useState(order);
  const [selectedComponents, setSelectedComponents] = useState({});

  useEffect(() => {
    console.log("Initial Order:", order);
    console.log(
      "Order Components:",
      order?.orderItems?.[0]?.getPondDetailResponse?.components
    );

    if (order?.orderItems?.[0]?.getPondDetailResponse?.components) {
      const componentsObj = {};
      order.orderItems[0].getPondDetailResponse.components.forEach(
        (component) => {
          // Log từng component để kiểm tra cấu trúc
          console.log("Processing component:", component);
          componentsObj[component.componentId] = component.amount;
        }
      );
      console.log("Created componentsObj:", componentsObj);
      setSelectedComponents(componentsObj);
    }
    setEditedOrder(order);
  }, [order]);

  useEffect(() => {
    console.log("Updated selectedComponents:", selectedComponents);
  }, [selectedComponents]);

  useEffect(() => {
    setIsLoading(true);
    const fetchComponents = async () => {
      try {
        const response = await axiosInstance.get("/material/components");
        console.log("Fetched componentsData:", response.data.componentTypes);
        setComponentsData(response.data.componentTypes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching components:", error);
        setIsLoading(false);
      }
    };
    fetchComponents();
  }, []);

  useEffect(() => {
    if (order.orderItems && order.orderItems.length > 0) {
      const initialPondDetails =
        order.orderItems[0].getPondDetailResponse || {};
      console.log("Setting pond details from:", initialPondDetails);

      // Log components từ initialPondDetails
      if (initialPondDetails.components) {
        console.log("Initial pond components:", initialPondDetails.components);
      }

      setPondDetails({
        pondName: initialPondDetails.pondName || "",
        location: initialPondDetails.location || "",
        pondDepth: initialPondDetails.pondDepth || 0,
        area: initialPondDetails.area || 0,
        shape: initialPondDetails.shape || "",
      });
    }
  }, [order]);

  useEffect(() => {
    if (editedOrder) {
      const areaPrice = calculatePriceByArea(pondDetails.area);
      let componentTotal = 0;

      Object.entries(selectedComponents).forEach(([componentId, amount]) => {
        const component = componentsData
          .flatMap((category) => category.components)
          .find((comp) => comp.id === parseInt(componentId));
        if (component) {
          componentTotal += component.price * amount;
        }
      });

      setEditedOrder((prev) => ({
        ...prev,
        area: pondDetails.area,
        areaCost: areaPrice,
        componentsCost: componentTotal,
        totalMoney: areaPrice + componentTotal,
      }));
    }
  }, [pondDetails.area, selectedComponents, componentsData]);

  const totalPrice = useMemo(() => {
    let componentTotal = 0;
    Object.entries(selectedComponents).forEach(([componentId, amount]) => {
      const component = componentsData
        .flatMap((category) => category.components)
        .find((comp) => comp.id === parseInt(componentId));
      if (component) {
        componentTotal += component.price * amount;
      }
    });
    const areaPrice = calculatePriceByArea(pondDetails.area);
    return areaPrice + componentTotal;
  }, [selectedComponents, componentsData, pondDetails.area]);

  const handleAreaChange = (e) => {
    const newArea = parseFloat(e.target.value) || 0;
    setPondDetails((prev) => ({
      ...prev,
      area: newArea,
    }));
  };

  const handleComponentChange = (e, componentId) => {
    const newAmount = parseInt(e.target.value) || 0;
    setSelectedComponents((prev) => ({
      ...prev,
      [componentId]: newAmount,
    }));
  };

  const handlePondDetailChange = (fieldName, newValue) => {
    setPondDetails((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSaveChanges = () => {
    // Implement save logic here
    setIsEditing(false);
    onOrderUpdate(editedOrder);
  };

  const handleCancelChanges = () => {
    setEditedOrder(order);
    if (order?.orderItems?.[0]?.getPondDetailResponse?.components) {
      const componentsObj = {};
      order.orderItems[0].getPondDetailResponse.components.forEach(
        (component) => {
          componentsObj[component.componentId] = component.amount;
        }
      );
      setSelectedComponents(componentsObj);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Order #{order?.id || ""}
          </h2>
          <p className="text-sm text-gray-500">
            Total: {totalPrice.toLocaleString()} VNĐ
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelChanges}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">
            Customer Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">
              <span className="text-gray-500">Name:</span>{" "}
              {customerDetails?.firstName || ""}{" "}
              {customerDetails?.lastName || ""}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">
              <span className="text-gray-500">Total Amount:</span>{" "}
              {(order?.totalMoney || 0).toLocaleString()} VNĐ
            </p>
            <p className="text-sm flex items-center">
              <span className="text-gray-500">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(
                  order?.status || ""
                )}`}
              >
                {order?.status || ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      {order?.orderItems?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Pond Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Pond Name:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={pondDetails?.pondName || ""}
                      onChange={(e) =>
                        handlePondDetailChange("pondName", e.target.value)
                      }
                      className="w-full border rounded-lg px-2 py-1"
                    />
                  ) : (
                    <span>{pondDetails?.pondName || ""}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Location:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={pondDetails?.location || ""}
                      onChange={(e) =>
                        handlePondDetailChange("location", e.target.value)
                      }
                      className="w-full border rounded-lg px-2 py-1"
                    />
                  ) : (
                    <span>{pondDetails?.location || ""}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Depth (m):</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={pondDetails?.pondDepth || ""}
                      onChange={(e) =>
                        handlePondDetailChange(
                          "pondDepth",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-16 border rounded-lg px-2 py-1"
                    />
                  ) : (
                    <span>{pondDetails?.pondDepth || ""}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Area (m²):</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={pondDetails?.area || ""}
                      onChange={handleAreaChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  ) : (
                    <span>{pondDetails?.area || ""}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Shape:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={pondDetails?.shape || ""}
                      onChange={(e) =>
                        handlePondDetailChange("shape", e.target.value)
                      }
                      className="w-full border rounded-lg px-2 py-1"
                    />
                  ) : (
                    <span>{pondDetails?.shape || ""}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ComponentsSelection
        componentsData={componentsData}
        selectedComponents={selectedComponents}
        onComponentChange={handleComponentChange}
        area={pondDetails.area}
        isEditing={isEditing}
      />
    </div>
  );
};

export default OrderDetails;
