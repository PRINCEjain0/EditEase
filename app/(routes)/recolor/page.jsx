"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Download, Wand2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function RecolorPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [editedUrl, setEditedUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, [imageUrl]);

  const handleTranformation = async () => {
    if (!imageUrl || !text || !color) {
      alert("Please enter a prompt and upload an image.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/recolor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, text, color }),
      });

      if (!res.ok) {
        alert("An error occurred while processing the image");
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      const newImageUrl = data.image.editedUrl;

      const img = new Image();
      img.src = newImageUrl;
      img.onload = () => {
        setEditedUrl(newImageUrl);
        setIsLoading(false);
      };
      img.onerror = () => {
        alert("Failed to load image.");
        setIsLoading(false);
      };
    } catch (error) {
      alert("An error occurred while processing the image.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0f1e] to-[#111936] min-h-screen overflow-auto px-4 md:px-10 lg:px-20">
      <h1 className="pt-20 md:pt-28 text-2xl md:text-4xl font-bold text-transparent bg-clip-text text-center bg-gradient-to-r from-blue-400 to-purple-500">
        Recolor Your Image
      </h1>

      {/* Input Fields */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex flex-col w-full md:w-1/2">
          <Label
            htmlFor="object"
            className="text-gray-300 text-base md:text-xl mb-2"
          >
            Object to Recolor
          </Label>
          <Input
            id="object"
            placeholder="e.g. car, sky, etc."
            className="bg-[#0F3460] text-white w-full h-10 md:h-12 border border-gray-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <Label
            htmlFor="color"
            className="text-gray-300 text-base md:text-xl mb-2"
          >
            New Color
          </Label>
          <Input
            id="color"
            placeholder="e.g. blue, red, etc."
            className="bg-[#0F3460] text-white w-full h-10 md:h-12 border border-gray-500"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      {/* Image Upload and Preview */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-20">
        {/* Original Image */}
        <div className="w-full md:w-1/2 max-w-md">
          <h1 className="text-xl md:text-2xl text-gray-300 text-center md:text-left">
            Original
          </h1>
          <div className="border border-gray-500 h-48 md:h-72 mt-4 flex justify-center items-center bg-[#0F3460]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            ) : (
              <CldUploadWidget
                uploadPreset="EditEase1"
                onSuccess={(result) => setImageUrl(result.info.secure_url)}
              >
                {({ open }) => (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload an Image
                  </Button>
                )}
              </CldUploadWidget>
            )}
          </div>
        </div>

        {/* Transformed Image */}
        <div className="w-full md:w-1/2 max-w-md">
          <h1 className="text-xl md:text-2xl text-gray-300 text-center md:text-left">
            Transformed
          </h1>
          <div className="border border-gray-500 h-48 md:h-72 mt-4 flex justify-center items-center bg-[#0F3460]">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin text-gray-300 h-8 md:h-12 w-8 md:w-12 mb-2" />
                <p className="text-gray-300 text-sm md:text-base">
                  Processing...
                </p>
              </div>
            ) : editedUrl ? (
              <img
                src={editedUrl}
                alt="Transformed"
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-gray-300 text-center text-sm md:text-base mt-4">
                Transformed image will appear here.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <Button
          onClick={handleTranformation}
          className="w-full md:w-2/3 bg-blue-500 hover:bg-blue-600 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" /> Applying...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> Apply Transformation
            </>
          )}
        </Button>

        <Button
          onClick={async () => {
            if (!editedUrl) {
              alert("No transformed image available to download.");
              return;
            }

            try {
              const response = await fetch(editedUrl);
              const blob = await response.blob();
              const blobUrl = URL.createObjectURL(blob);

              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = "transformed-image.jpg";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              URL.revokeObjectURL(blobUrl);
            } catch (error) {
              console.error("Error downloading the image:", error);
              alert("Failed to download the image. Try again.");
            }
          }}
          className="w-full md:w-2/3 bg-purple-500 hover:bg-purple-600 transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" /> Preparing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Download Result
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
