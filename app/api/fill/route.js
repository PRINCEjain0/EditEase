import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, aspectRatio } = await req.json();

  if (!imageUrl) {
    return NextResponse.json(
      { error: "No image URL provided" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let x = "h";

  if (aspectRatio === "16:9") {
    x = "w";
  }

  const editedUrl = `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/ar_${aspectRatio},b_gen_fill,c_pad,${x}_1250/${imageUrl
    .split("/")
    .pop()}`;

  try {
    const image = await prisma.image.create({
      data: {
        userId: user.id,
        originalUrl: imageUrl,
        editedUrl: editedUrl,
        prompt: aspectRatio,
        transformationType: "Fill",
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
