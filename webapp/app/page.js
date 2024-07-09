"use client";
import { useState } from "react";
import Image from "next/image";
import Loader from "../Components/Loader"

export default function Home() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);  // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) return;

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    setLoading(true);  // Start loading

    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl uppercase font-bold mb-4 text-center font-[Montserrat]">
        Contract Comparison
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 border-2 flex items-center justify-center p-6 flex-col bg-[#dadada]/20 rounded-xl font-[Montserrat]"
      >
        <div className="mb-4 flex items-center justify-center p-6 space-x-[6rem]">
          <div className="mb-2 flex items-center justify-center flex-col">
            <label className="block">Contract 1:</label>
            <div className="custom-file-input bg-[#060effd2] hover:bg-[#1306ff] px-8 py-4 rounded-lg">
              <input
                type="file"
                id="file1"
                onChange={(e) => setFile1(e.target.files[0])}
              />
              <label htmlFor="file1">
                {file1 ? file1.name : "Choose File"}
              </label>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-center flex-col">
            <label className="block">Contract 2:</label>
            <div className="custom-file-input hover:bg-[#c106ffdc] bg-[#c106ff] px-8 py-4 rounded-lg">
              <input
                type="file"
                id="file2"
                onChange={(e) => setFile2(e.target.files[0])}
              />
              <label htmlFor="file2">
                {file2 ? file2.name : "Choose File"}
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#ff0606] rounded-full text-white px-4 py-2 hover:bg-[#d00505] trans"
        >
          Compare Contracts
        </button>
      </form>

      {loading ? (
        <div className="w-full flex items-center justify-center place-items-center">
          <Loader/>
        </div>        
      ) : (
        result && (
          <div>
            <div className="mb-4 mt-8">
              <div className="flex items-center justify-between">
                <h1 className="w-[42%] flex items-center justify-center text-3xl font-bold font-[Montserrat]">
                  Contract 1
                </h1>
                <h1 className="w-[42%] flex items-center justify-center text-3xl font-bold font-[Montserrat]">
                  Contract 2
                </h1>
              </div>
              {result.results.map((pair, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-center justify-between space-x-0"
                >
                  <div className="contract border w-[42%] p-4 rounded-lg mb-4 bg-blue-200/20">
                    <h3 className="font-semibold mb-3 text-lg">
                      Paragraph {pair.paragraph_no_1}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: pair.paragraph_text_1 }}
                    ></p>
                  </div>
                  <Image
                    src="/left.png"
                    width={70}
                    height={80}
                    alt="Picture of the author"
                    className="grayscale contrast-[0.1]"
                  />
                  <span className="flex items-center justify-center rounded-xl p-4 bg-green-800 text-white text-sm font-[Montserrat] text-[0.8rem]">
                    <span className="italic text-center">
                      <p className="italic font-semibold">Similarity: </p>
                      <p> {(pair.similarity * 100).toFixed(2)} %</p>
                    </span>
                  </span>
                  <Image
                    src="/right.png"
                    width={70}
                    height={80}
                    alt="Picture of the author"
                    className="grayscale contrast-[0.1]"
                  />
                  <div className="contract mb-4 border w-[42%] p-4 rounded-lg bg-[#dadada]/20">
                    <h3 className="font-semibold mb-3 text-lg">
                      Paragraph {pair.paragraph_no_2}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: pair.paragraph_text_2 }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="font-bold text-xl mt-10">Unique to Contract 1:</h2>
            <ul>
              {result.unique_in_contract1.map((para, index) => (
                <li key={index}>
                  <div className="border w-[90%] p-3 my-2 bg-red-200">
                    <h3 className="font-semibold">
                      Paragraph {para.paragraph_no}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: para.paragraph_text }}
                    ></p>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-xl mt-4">Unique to Contract 2:</h2>
            <ul>
              {result.unique_in_contract2.map((para, index) => (
                <li key={index}>
                  <div className="border w-[90%] p-3 my-2 bg-green-200">
                    <h3 className="font-semibold">
                      Paragraph {para.paragraph_no}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: para.paragraph_text }}
                    ></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
