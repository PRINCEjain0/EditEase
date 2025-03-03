"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Download, Wand2 } from "lucide-react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function RecolorPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  const handleTranformation = () => {
    console.log("Transforming");
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-black ">
        <h1 className="pt-28 text-4xl font-bold text-transparent bg-clip-text text-center bg-gradient-to-r from-blue-400 to-purple-600">
          Recolor Your Image
        </h1>
        <div className="flex justify-between items-center mt-8 px-40 space-x-8">
          <div className="flex flex-col w-1/2">
            <Label id="object" className="text-white text-xl mb-2">
              Object to Recolor
            </Label>
            <Input
              id="object "
              placeholder="eg car, sky, etc."
              className="text-white w-full h-12"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <Label id="color" className="text-white text-xl mb-2">
              New color
            </Label>
            <Input
              id="color "
              placeholder="eg car, sky, etc."
              className=" text-white w-full h-12"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center px-40 mt-8 space-x-52">
          <div>
            <h1 className="text-2xl text-white ">Original</h1>
            <div className="border border-white w-96 h-72 mt-4 flex justify-center items-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
                  <Upload className="h-4 w-4" />
                  <CldUploadWidget
                    uploadPreset="EditEase"
                    onSuccess={(result) => setImageUrl(result.info.secure_url)}
                  >
                    {({ open }) => (
                      <button onClick={() => open()}>Upload an Image</button>
                    )}
                  </CldUploadWidget>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-white ">Transformed</h1>
            <div className="border border-white w-96 h-72 mt-4"></div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <Button
            onClick={handleTranformation}
            className="w-2/3 bg-blue-600 hover:bg-blue-700  mt-8"
          >
            <Wand2 className="mr-2 h-4 w-4" /> Apply Transformation
          </Button>

          <Button className="w-2/3 bg-purple-600 hover:bg-purple-700 mt-8 mb-12">
            <Download className="mr-2 h-4 w-4" /> Download Result
          </Button>
        </div>
      </div>
    </>
  );
}
