"use client";

import dynamic from "next/dynamic";

export default function EmptyState() {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-[#211C84] rounded-lg shadow-lg p-6">
      {/* Lottie Animation */}
      <div className="w-52 h-52">
        <Lottie animationData={require("/public/aaa.json")} loop={true} />
      </div>

      {/* Text */}
      <p className="text-2xl font-semibold text-white mt-4">
        No Images Available
      </p>
      <p className="text-white text-sm opacity-80 mt-2">
        Start Transforming some amazing images now!
      </p>

      {/* Upload Button */}
      <button className="mt-5 px-6 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-md hover:bg-gray-100 transition">
        TransForm Image 📤
      </button>
    </div>
  );
}
