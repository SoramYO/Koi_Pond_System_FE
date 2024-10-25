import React, { useMemo } from "react";

export const calculatePriceByArea = (area) => {
  if (area <= 0) return 0;
  if (area > 0 && area <= 20) return area * 25000000;
  if (area > 20 && area <= 50) return area * 21000000;
  if (area > 50 && area <= 100) return area * 15000000;
  return area * 9000000;
};
export const calculateOrderTotal = (
  area,
  selectedComponents,
  componentsData
) => {
  // Calculate area cost
  const areaCost = calculatePriceByArea(area);

  let componentsCost = 0;
  let categoryTotals = {};

  if (Array.isArray(componentsData)) {
    componentsData.forEach((category) => {
      let categoryTotal = 0;
      if (Array.isArray(category.components)) {
        category.components.forEach((component) => {
          const amount = Number(selectedComponents[component.id]) || 0;
          const total = component.pricePerItem * amount;
          categoryTotal += total;
          componentsCost += total;
        });
      }
      categoryTotals[category.id] = categoryTotal;
    });
  }

  const totalCost = areaCost + componentsCost;

  return {
    areaCost,
    componentsCost,
    categoryTotals,
    totalCost,
  };
};

const PondAreaCalculator = ({ area, onPriceCalculated }) => {
  const price = useMemo(() => calculatePriceByArea(Number(area)), [area]);

  // Call the callback whenever price changes
  React.useEffect(() => {
    if (onPriceCalculated) {
      onPriceCalculated(price);
    }
  }, [price, onPriceCalculated]);

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Chi phí theo diện tích
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Diện tích:</span>
          <span className="font-medium">{area} m²</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Đơn giá áp dụng:</span>
          <span className="font-medium">
            {area <= 20
              ? "25,000,000"
              : area <= 50
              ? "21,000,000"
              : area <= 100
              ? "15,000,000"
              : "9,000,000"}{" "}
            VNĐ/m²
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-gray-700 font-semibold">
            Tổng chi phí diện tích:
          </span>
          <span className="text-lg font-bold text-blue-600">
            {price.toLocaleString()} VNĐ
          </span>
        </div>
      </div>
    </div>
  );
};

export default PondAreaCalculator;
