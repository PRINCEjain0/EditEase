"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function ObjectRemovePage() {
  const [prompt, setPrompt] = useState("");
  const [originalUrl, setOriginalUrl] = useState(null);
  const [editedUrl, setEditedUrl] = useState(null);

  const handleUpload = (result) => {
    const uploadedUrl = result.info.secure_url;
    setOriginalUrl(uploadedUrl);
    setEditedUrl(null);
  };

  const applyTransformation = async () => {
    if (!originalUrl || !prompt) {
      alert("Please enter a prompt and upload an image.");
      return;
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl, prompt }),
    });

    const data = await res.json();
    console.log(data);
    console.log(data.image.editedUrl);
    setEditedUrl(data.image.editedUrl);
  };

  return (
    <div className="flex gap-8 p-8">
      <div className="w-1/2 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter transformation prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 w-full"
        />

        <CldUploadWidget uploadPreset="EditEase" onSuccess={handleUpload}>
          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Upload Image
            </button>
          )}
        </CldUploadWidget>

        {originalUrl && (
          <img
            src={originalUrl}
            alt="Uploaded"
            className="w-full max-w-xs mt-4"
          />
        )}

        <button
          onClick={applyTransformation}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Apply Transformation
        </button>
      </div>

      <div className="w-1/2 flex justify-center items-center border p-4">
        {editedUrl ? (
          <div>
            <img
              src={editedUrl}
              alt="Transformed"
              className="w-full max-w-xs"
            />
            <h>wbddju</h>
          </div>
        ) : (
          <p className="text-gray-500">Transformed image will appear here.</p>
        )}
      </div>
    </div>
  );
}
