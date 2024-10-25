// src/components/utils/helpers.js
export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-800";
    case "Completed":
      return "bg-green-200 text-green-800";
    case "Cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
