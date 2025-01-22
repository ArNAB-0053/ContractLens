"use client";

import React, { useState } from "react";
import axios from "axios";
import FileUploadForm from "../_components/FileUploadForm";
import ErrorMessage from "../_components/ErrorMessage";
import ExtractedTextDisplay from "../_components/ExtractedTextDisplay";

const TextExtractorPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState("");
  const backendUrl = process.env.NEXT_BACKEND_URL || "http://127.0.0.1:5000";

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a file.");
      return;
    }

    setLoading(true);
    setError("");
    setExtractedText("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${backendUrl}/api/extract-text`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setExtractedText(response.data.extracted_text || "No text extracted.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row px-6 md:px-16 lg:px-28">
      <div className="mt-20 rounded-lg shadow p-6 w-full lg:w-1/3  lg:overflow-y-auto">
        <h1 className="text-xl font-bold mb-6 selection:bg-black selection:text-gray-200">Upload Your File</h1>
        <FileUploadForm
          onSubmit={handleSubmit}
          onFileChange={handleFileChange}
          loading={loading}
          file={file}
          type={1}
        />
      </div>

      <div
        className="flex-1  rounded-lg mt-3 lg:mt-20 shadow p-6  transition-transform"
      >
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader border-t-blue-500"></div>
            <p className="text-gray-600 mt-4">Extracting text, please wait...</p>
          </div>
        ) : extractedText ? (
          <div>
            <h2 className="font-bold mb-1 text-xl">Extracted Text:</h2>
            <ErrorMessage error={error} />
            <ExtractedTextDisplay extractedText={extractedText} />
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            <p>No extracted text yet. Please upload a file to begin.</p>
          </div>
        )}
      </div>

      {/* Loading Spinner Styles */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default TextExtractorPage;
