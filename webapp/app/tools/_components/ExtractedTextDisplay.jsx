import React from "react";

const ExtractedTextDisplay = ({ extractedText }) => {
  if (!extractedText) return null;

  return (
    <div className="mt-2 p-6 bg-gray-100 rounded shadow border selection:bg-blue-500 selection:text-blue-50">
      <p className="whitespace-pre-wrap ">{extractedText}</p>
    </div>
  );
};

export default ExtractedTextDisplay;
