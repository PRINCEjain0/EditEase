import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, text, color } = await req.json();

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

  const editedUrl = `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/e_gen_recolor:prompt_${text};to-color_${color};multiple_true/${imageUrl
    .split("/")
    .pop()}`;

  try {
    const image = await prisma.image.create({
      data: {
        userId: user.id,
        originalUrl: imageUrl,
        editedUrl: editedUrl,
        prompt: text,
        transformationType: "Recolor",
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
