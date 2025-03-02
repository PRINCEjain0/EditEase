"use client";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      {/* hero section  */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0a0f1e] to-[#111936]  ">
        <div className="max-w-5xl flex flex-col items-center">
          <motion.h1
            className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4a90e2] to-[#a25af7]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            AI-Powered Image Editing
          </motion.h1>
          <p className="text-xl text-gray-300 mt-4  max-w-3xl">
            Harness the power of advanced AI to remove objects, change colors,
            replace elements, and transform backgrounds with just one click.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className=" text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg bg-blue-600 hover:bg-blue-800 mt-8"
          >
            Try Now
          </motion.button>
        </div>
      </section>
      {/* features section  */}
      <section className="h-screen bg-gradient-to-br from-[#0a0f1e] to-[#111936] flex flex-col items-center justify-center text-center"></section>
    </>
  );
}
