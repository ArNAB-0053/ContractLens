import React from 'react';
import { FileText, Upload, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // For utility functions (optional)
import { Button } from '@/Components/ui/button';

const FileUploadForm = ({ onSubmit, onFileChange, loading, file }) => {
  // Blue color scheme only
  const color = { accent: 'bg-blue-500', light: 'bg-blue-50' };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded flex w-full  items-center justify-center flex-col select-none"
    >
      <div className="relative w-full">
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm text-white font-medium z-10 bg-gradient-to-br from-blue-500 to-blue-400"
        >
          Contract
        </div>

        {/* Card for File Upload */}
        <div
          className={cn(
            `rounded-xl w-full p-6 transition-all duration-300 border border-gray-200`,
            file ? 'bg-green-50' : color.light
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Icon */}
            <div className={`p-3 ${color.light} rounded-full`}>
              {file ? (
                <Sparkles
                  className={`w-6 h-6 text-blue-500`}
                />
              ) : (
                <FileText
                  className={`w-6 h-6 text-blue-500`}
                />
              )}
            </div>

            {/* File Name */}
            <div className="text-center w-full">
              <p className="text-sm text-gray-600 truncate max-w-[200px] mx-auto">
                {file ? file.name : 'No file selected'}
              </p>
            </div>

            {/* File Upload Button */}
            <div className="relative w-full cursor-pointer">
              <Button
                type="button"
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2
                    ${file ? 'bg-green-500 hover:bg-green-600' : color.accent}
                    text-white transition-all duration-300 text-sm cursor-pointer`}
              >
                <Upload className="w-4 h-4" />
                <span>{file ? 'Change' : 'Select File'}</span>
              </Button>
              <input
                type="file"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={`bg-purple-600 hover:bg-purple-700 rounded-lg w-[90%]  transition-all duration-300 text-white ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={loading || !file}
      >
        {loading ? 'Extracting...' : 'Extract Text'}
      </Button>
    </form>
  );
};

export default FileUploadForm;
