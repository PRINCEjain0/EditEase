"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecolorPage() {
  const [imageUrl, setImageUrl] = useState(
    "/placeholder.svg?height=300&width=400"
  );
  const [transformedImageUrl, setTransformedImageUrl] = useState(
    "/placeholder.svg?height=300&width=400"
  );
  const [selectedObject, setSelectedObject] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6"); // Default to a blue color
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        // In a real application, you would send this image to your backend for processing
        // and receive the initial transformed image URL
        setTransformedImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleObjectChange = (event) => {
    setSelectedObject(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const applyRecolor = () => {
    // In a real application, you would send the selected object and color to your backend
    // and receive the updated transformed image URL
    console.log(`Recoloring ${selectedObject} with color ${selectedColor}`);
    // Simulate a change in the transformed image
    setTransformedImageUrl(
      `/placeholder.svg?height=300&width=400&text=Recolored`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white mt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Recolor Your Image
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Preview Section */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Original Image"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Original Image</p>
                </div>
              )}
            </div>
            <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
              {transformedImageUrl ? (
                <Image
                  src={transformedImageUrl || "/placeholder.svg"}
                  alt="Transformed Image"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Transformed Image</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
            <div>
              <Button
                onClick={() => fileInputRef.current.click()}
                variant="outline"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="object-input" className="text-sm">
                Object to Recolor
              </Label>
              <Input
                id="object-input"
                placeholder="e.g., sky, car, dress"
                value={selectedObject}
                onChange={handleObjectChange}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="color-input" className="text-sm">
                New Color
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  id="color-input"
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="w-10 h-10 p-1 rounded bg-gray-700 border-gray-600"
                />
                <Input
                  type="text"
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="flex-grow bg-gray-700 border-gray-600 text-white"
                  placeholder="#000000"
                />
              </div>
            </div>

            <Button
              onClick={applyRecolor}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Wand2 className="mr-2 h-4 w-4" /> Apply Recolor
            </Button>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Download className="mr-2 h-4 w-4" /> Download Result
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
