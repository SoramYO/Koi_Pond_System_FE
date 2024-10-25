import React, { useMemo } from "react";
import { calculateOrderTotal } from "../components/Calculate/PondAreaCalculator";

const ComponentCard = ({ component, selectedAmount, onAmountChange }) => {
  const totalPrice = useMemo(() => {
    return component.pricePerItem * (selectedAmount || 0);
  }, [component.pricePerItem, selectedAmount]);

  return (
    <div className="relative group">
      <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-3">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {component.name}
            </h4>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs whitespace-nowrap">
              {component.unit}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span>Đơn giá:</span>
              <span className="font-medium text-gray-700">
                {component.pricePerItem.toLocaleString()} VND
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={selectedAmount || 0}
                  onChange={(e) => onAmountChange(e, component.id)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white/70 backdrop-blur-sm"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-50 w-72 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl p-4 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 left-full ml-3 top-0">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">{component.name}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {component.description}
          </p>
          <div className="pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đơn giá:</span>
                <span className="font-semibold text-gray-800">
                  {component.pricePerItem.toLocaleString()} VND
                </span>
              </div>
              {selectedAmount > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedAmount} {component.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-600 font-medium pt-1">
                    <span>Thành tiền:</span>
                    <span>{totalPrice.toLocaleString()} VND</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComponentsSelection = ({
  componentsData,
  selectedComponents,
  onComponentChange,
  area,
  onTotalUpdate,
}) => {
  const totals = useMemo(() => {
    return calculateOrderTotal(area, selectedComponents, componentsData);
  }, [area, componentsData, selectedComponents]);

  // Notify parent component when totals change
  React.useEffect(() => {
    if (onTotalUpdate) {
      onTotalUpdate(totals);
    }
  }, [totals, onTotalUpdate]);

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Chọn Thành Phần Hồ Cá
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentsData.map((category) => (
          <div
            key={category.id}
            className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>
                <div className="text-xs text-white/90">
                  {totals.categoryTotals[category.id]?.toLocaleString() || "0"}{" "}
                  VND
                </div>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 gap-3">
              {category.components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  selectedAmount={selectedComponents[component.id]}
                  onAmountChange={onComponentChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-600">
              Chi phí diện tích
            </div>
            <div className="text-lg font-bold text-blue-600">
              {totals.areaCost.toLocaleString()} VND
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-600">
              Chi phí thành phần
            </div>
            <div className="text-lg font-bold text-blue-600">
              {totals.componentsCost.toLocaleString()} VND
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-600">
              Tổng chi phí
            </div>
            <div className="text-lg font-bold text-blue-600">
              {totals.totalCost.toLocaleString()} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsSelection;
