import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="text-red-500 bg-red-50 p-4 rounded shadow mb-4">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
