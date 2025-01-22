import React, { useState } from "react";
import { AlertCircle, ArrowRightLeft } from "lucide-react";
import UploadCard from "./UploadCard";
import ComparisonCard from "./ComparisonCard";
import UniqueContent from "./UniqueSection";
import { Button } from "./ui/button";

const Home = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) return;

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log(data)
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container px-32 py-12">
        <div className="text-center my-12">
          <h1 className="text-3xl font-bold mb-4">Contract Comparison Tool</h1>
          <p className="text-gray-600">
            Compare and analyze your contracts to identify changes and
            similarities
          </p>
        </div>

        <div className="bg-white border rounded-2xl py-8 px-6 md:px-8 lg:px-16 mb-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-x-16">
              <UploadCard type={1} file={file1} setFile={setFile1} />
              <UploadCard type={2} file={file2} setFile={setFile2} />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={!file1 || !file2 || loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg
                    hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center space-x-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Compare Documents</span>
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 animate-pulse">
              Analyzing Contracts...
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8">Comparison Results</h2>
              {result.results.map((pair, index) => (
                <ComparisonCard key={index} pair={pair} />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Unique to Contract 1 */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-red-600 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Unique to Contract 1
                </h2>
                {result.unique_in_contract1?.length > 0 ? (
                  result.unique_in_contract1.map((para, index) => (
                    <UniqueContent key={index} para={para} type={1} />
                  ))
                ) : (
                  <div className="flex items-center space-x-2 bg-red-100 text-red-600 p-4 rounded-lg">
                    <AlertCircle className="w-6 h-6" />
                    <p className="text-sm font-medium">
                      No unique content found in Contract 1.
                    </p>
                  </div>
                )}
              </div>

              {/* Unique to Contract 2 */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-green-600 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Unique to Contract 2
                </h2>
                {result.unique_in_contract2?.length > 0 ? (
                  result.unique_in_contract2.map((para, index) => (
                    <UniqueContent key={index} para={para} type={2} />
                  ))
                ) : (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-600 p-4 rounded-lg">
                    <AlertCircle className="w-6 h-6" />
                    <p className="text-sm font-medium">
                      No unique content found in Contract 2.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
