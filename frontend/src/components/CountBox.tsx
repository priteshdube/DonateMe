import React from "react";

const CountBox = ({ title, value }: any) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-center hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Value */}
      <div className="text-4xl font-extrabold mb-3">{value}</div>

      {/* Title */}
      <div className="text-lg font-medium text-gray-300">{title}</div>
    </div>
  );
};

export default CountBox;
