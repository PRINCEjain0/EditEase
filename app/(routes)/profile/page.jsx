"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Clock, Wand2 } from "lucide-react";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { User, getUserImages } from "@/actions/userAction";
import { Button } from "@/components/ui/button";

import EmptyState from "@/components/lottie";
export default function ProfilePage() {
  const [u, setU] = useState({});
  const [transformations, setTransformations] = useState({});
  const [num, setNum] = useState(0);
  useEffect(() => {
    async function findUser() {
      const us = await User();
      const images = await getUserImages();
      setU(us.User);
      setTransformations(images.images);
      setNum(images.count);
      console.log(images.images);
    }
    findUser();
  }, []);

  return (
    <>
      <div className="pt-20 min-h-screen  bg-black">
        {/* // header */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/90 via-blue-900/30 to-purple-900/30 
        rounded-2xl flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Avatar className="h-24 w-24 md:h-28 md:w-28 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-black/50 shadow-lg">
            {u?.imageUrl ? (
              <AvatarImage src={u.imageUrl} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-xl md:text-2xl font-bold text-white">
                {u?.name ? u.name[0] : "A"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {u?.name || "User"}
            </h1>
            <h2 className="text-md text-gray-500">{u.email}</h2>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg px-4 py-3 border border-gray-700/30"
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-gray-400">Member since</p>
                </div>
                <p className="font-medium text-white">
                  {u?.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg px-4 py-3 border border-gray-700/30"
              >
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-gray-400">Transformations</p>
                </div>
                <p className="font-medium text-white">{num}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* // All transformations */}

        <div className="mt-8 bg-gray-900/80 flex flex-col justify-start p-8 space-y-6">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex justify-center">
            Your Transformations
          </div>
          <Tabs defaultValue="All" className="w-full ">
            <div className="flex justify-center mx-4">
              <TabsList className="bg-gray-800 mb-6">
                <TabsTrigger
                  value="All"
                  className="data-[state=active]:bg-blue-600"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="Recolor"
                  className="data-[state=active]:bg-blue-600"
                >
                  Recolor
                </TabsTrigger>
                <TabsTrigger
                  value="Remove"
                  className="data-[state=active]:bg-blue-600"
                >
                  Remove
                </TabsTrigger>
                <TabsTrigger
                  value="Fill"
                  className="data-[state=active]:bg-blue-600"
                >
                  Fill
                </TabsTrigger>
                <TabsTrigger
                  value="Replace"
                  className="data-[state=active]:bg-blue-600"
                >
                  Replace
                </TabsTrigger>
                <TabsTrigger
                  value="Restore"
                  className="data-[state=active]:bg-blue-600"
                >
                  Restore
                </TabsTrigger>
              </TabsList>
            </div>
            {transformations && transformations.length > 0 ? (
              <>
                <TabsContent value="All">
                  <div className="grid-cols-3 gap-6">
                    {transformations && transformations.length > 0 ? (
                      transformations.map((item) => (
                        <TransformationCard key={item.id} item={item} />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="Recolor">
                  <div className="grid-cols-3 gap-6">
                    {transformations &&
                    transformations.filter(
                      (item) => item.transformationType === "Recolor"
                    ).length > 0 ? (
                      transformations
                        .filter((item) => item.transformationType === "Recolor")
                        .map((item) => (
                          <TransformationCard key={item.id} item={item} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="Remove">
                  <div className="grid-cols-3 gap-6">
                    {transformations &&
                    transformations.filter(
                      (item) => item.transformationType === "Remove"
                    ).length > 0 ? (
                      transformations
                        .filter((item) => item.transformationType === "Remove")
                        .map((item) => (
                          <TransformationCard key={item.id} item={item} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="Fill">
                  <div className="grid-cols-3 gap-6">
                    {transformations &&
                    transformations.filter(
                      (item) => item.transformationType === "Fill"
                    ).length > 0 ? (
                      transformations
                        .filter((item) => item.transformationType === "Fill")
                        .map((item) => (
                          <TransformationCard key={item.id} item={item} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="Replace">
                  <div className="grid-cols-3 gap-6">
                    {transformations &&
                    transformations.filter(
                      (item) => item.transformationType === "Replace"
                    ).length > 0 ? (
                      transformations
                        .filter((item) => item.transformationType === "Replace")
                        .map((item) => (
                          <TransformationCard key={item.id} item={item} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="Restore">
                  <div className="grid-cols-3 gap-6">
                    {transformations &&
                    transformations.filter(
                      (item) => item.transformationType === "Restore"
                    ).length > 0 ? (
                      transformations
                        .filter((item) => item.transformationType === "Restore")
                        .map((item) => (
                          <TransformationCard key={item.id} item={item} />
                        ))
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </TabsContent>
              </>
            ) : (
              <EmptyState />
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
}

// List view for transformations
function TransformationCard({ item }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-3 flex flex-col md:flex-row gap-4"
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <div className="grid grid-cols-2 gap-2 md:w-1/3">
        <div className="relative aspect-[4/3]">
          <Image
            src={item.originalUrl}
            alt="Original"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute top-1 left-1 bg-black/70 text-xs px-1 py-0.5 rounded text-white">
            Original
          </div>
        </div>
        <div className="relative aspect-[4/3]">
          <Image
            src={item.editedUrl}
            alt="Transformed"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          <div className="absolute top-1 left-1 bg-black/70 text-xs px-1 py-0.5 rounded text-white">
            Transformed
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded">
              {item.transformationType}
            </span>
            <span className="text-gray-400 text-xs">
              {" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 hover:bg-gray-700"
            onClick={async () => {
              if (!item.editedUrl) {
                alert("No transformed image available to download.");
                return;
              }

              try {
                const response = await fetch(item.editedUrl);
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
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
