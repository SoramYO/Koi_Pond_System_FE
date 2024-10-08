import axios from "axios";
import React, { useEffect, useState } from "react";

const ServicesDisplay = () => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5222/api/v1/display/services-display"
      );
      setServiceData(response.data.serviceTypesResponses);
    } catch (error) {
      console.error("Failed to fetch services");
    }
  };

  return (
    <div className="p-4">
      {serviceData.map((serviceType) => (
        <div key={serviceType.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{serviceType.typeName}</h2>
          <div className="flex flex-wrap justify-between">
            {serviceType.serviceResponses.map((service) => (
              <div
                key={service.id}
                className="bg-white shadow-md rounded-lg p-6 m-2 w-1/4 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-700 mb-2">{service.decription}</p>
                <p className="text-gray-900 font-bold">
                  Giá: {service.pricePerM2.toLocaleString()} VNĐ/m²
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesDisplay;
