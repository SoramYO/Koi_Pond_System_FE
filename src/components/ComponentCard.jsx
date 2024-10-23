import React from "react";

const ComponentCard = ({ component, amount }) => {
  return (
    <div className="relative group">
      <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800">
            {component.componentName}
          </h4>
          <div className="mt-2 text-sm text-emerald-600 font-medium">
            <span>Số lượng: </span>
            <span>{amount}</span>
          </div>
        </div>
      </div>

      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-50 w-72 bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl p-4 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 left-full ml-3 top-0">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">
            {component.componentName}
          </h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Số lượng:</span>
            <span className="font-semibold text-gray-800">{amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const ComponentsCard = ({ componentsData = [] }) => {
  return (
    <div className="w-full px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Thành Phần Hồ Cá
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentsData.map((component) => (
          <div
            key={component.componentId}
            className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 overflow-hidden"
          >
            <ComponentCard component={component} amount={component.amount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsCard;
