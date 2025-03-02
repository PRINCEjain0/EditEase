"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Download,
  Wand2,
  Layers,
  Paintbrush,
  Eraser,
  ImagePlus,
  Replace,
  PaintBucket,
  Twitter,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const transformationExamples = [
    {
      id: "recolor",
      title: "Recolor Elements",
      description:
        "Change colors of specific objects while maintaining natural lighting and shadows",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      icon: <Paintbrush className="h-5 w-5" />,
    },
    {
      id: "remove",
      title: "Remove Objects",
      description:
        "Seamlessly remove unwanted objects from your images with AI precision",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      icon: <Eraser className="h-5 w-5" />,
    },
    {
      id: "fill",
      title: "Fill",
      description:
        "Intelligently fill in missing parts with content-aware technology",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      icon: <PaintBucket className="h-5 w-5" />,
    },
    {
      id: "replace",
      title: "Replace Objects",
      description:
        "Swap objects in your images while maintaining perfect perspective and lighting",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      icon: <Replace className="h-5 w-5" />,
    },
    {
      id: "bg-change",
      title: "Background Change",
      description:
        "Transform your image backgrounds to any scene or color you can imagine",
      beforeImage: "/placeholder.svg?height=400&width=600",
      afterImage: "/placeholder.svg?height=400&width=600",
      icon: <ImagePlus className="h-5 w-5" />,
    },
  ];
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
      <section className=" bg-gradient-to-b from-blue-900 to-black text-center">
        <motion.div
          className=" flex flex-col items-center justify-center p-28"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-blue-300 bg-blue-500/20 rounded-lg px-2 py-1">
            Powerful Features
          </p>
          <h2 className="text-5xl text-white font-bold tracking-tighter mt-4">
            Transform Images Like Never Before
          </h2>
          <p className="text-xl text-gray-400 mt-4 max-w-3xl">
            Our AI-powered tools make complex image editing simple and
            accessible to everyone.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Color Transformation",
                description:
                  "Change colors of specific objects while preserving natural lighting",
                icon: <Paintbrush className="h-10 w-10 text-purple-400" />,
              },
              {
                title: "Object Removal",
                description:
                  "Remove unwanted objects, people, or elements from your photos",
                icon: <Eraser className="h-10 w-10 text-blue-400" />,
              },
              {
                title: "Smart Fill",
                description:
                  "Fill in gaps with AI-generated content that matches the surroundings",
                icon: <PaintBucket className="h-10 w-10 text-pink-400" />,
              },
              {
                title: "Object Replacement",
                description:
                  "Replace objects with other elements while maintaining perspective",
                icon: <Replace className="h-10 w-10 text-green-400" />,
              },
              {
                title: "Background Change",
                description:
                  "Swap backgrounds or remove them entirely with perfect edge detection",
                icon: <ImagePlus className="h-10 w-10 text-yellow-400" />,
              },
              {
                title: "Batch Processing",
                description:
                  "Transform multiple images with consistent results",
                icon: <Layers className="h-10 w-10 text-red-400" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-4 rounded-lg border border-blue-800 bg-blue-950/50 p-6 text-center"
              >
                <div className="rounded-full bg-blue-900/50 p-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* demo section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                See the Magic in Action
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our transformation examples and see what our AI can do
                for your images.
              </p>
            </div>
          </div>

          <Tabs defaultValue="recolor" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800">
                {transformationExamples.map((example) => (
                  <TabsTrigger
                    key={example.id}
                    value={example.id}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      {example.icon}
                      <span>{example.title.split(" ")[0]}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {transformationExamples.map((example) => (
              <TabsContent key={example.id} value={example.id} className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4 ml-12">
                    <h3 className="text-2xl font-bold">{example.title}</h3>
                    <p className="text-gray-400">{example.description}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Try {example.title.split(" ")[0]} Now
                    </Button>
                  </div>
                  <div className="relative mr-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative rounded-lg overflow-hidden border border-gray-800">
                        <div className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-1 rounded">
                          Before
                        </div>
                        <Image
                          src={"/a.jpg"}
                          alt={`Before ${example.title}`}
                          width={300}
                          height={200}
                          className="object-cover w-full aspect-[4/3]"
                        />
                      </div>
                      <div className="relative rounded-lg overflow-hidden border border-gray-800">
                        <div className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-1 rounded">
                          After
                        </div>
                        <Image
                          src={"/a2.jpg"}
                          alt={`After ${example.title}`}
                          width={300}
                          height={200}
                          className="object-cover w-full aspect-[4/3]"
                        />
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full p-2 shadow-lg shadow-blue-600/50"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-black ">
        <div className="p-24">
          <motion.div
            initital={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center text-white"
          >
            <h1 className="text-5xl text-white font-bold ">How It Works</h1>
            <p className="text-gray-400 text-xl mt-4">
              Transform your images in three simple steps
            </p>
          </motion.div>
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Upload Your Image",
                description:
                  "Upload any image from your device or choose from our stock library",
                icon: <Upload className="h-10 w-10 text-blue-400" />,
                step: "01",
              },
              {
                title: "Apply Transformation",
                description:
                  "Apply the transformation and get your desired result in seconds",
                icon: <Wand2 className="h-10 w-10 text-purple-400" />,
                step: "02",
              },
              {
                title: "Download Result",
                description:
                  "Preview the result and download your transformed image in high quality",
                icon: <Download className="h-10 w-10 text-green-400" />,
                step: "03",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initital={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center space-y-4
                text-center"
              >
                <h1 className="text-3xl text-white ">{step.step}</h1>
                <motion.div
                  className="rounded-full bg-blue-900/20 p-4 mb-4 mt-8"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white ">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* //  footer */}
      <hr className="border-gray-400" />
      <section className="bg-black text-white pt-8 pb-8">
        <div className="flex justify-center items-center space-x-6 mt-4 md:mt-0">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-700 transition-colors" />
          </a>
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 hover:text-blue-700 transition-colors" />
          </a>
        </div>
      </section>
    </>
  );
}
