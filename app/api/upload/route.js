import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = getAuth(req);
  console.log(userId);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { originalUrl, prompt } = await req.json();
  if (!originalUrl) {
    return NextResponse.json(
      { error: "No image URL provided" },
      { status: 400 }
    );
  }
  console.log(originalUrl);
  console.log(prompt);
  const editedUrl = `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/e_gen_remove:prompt_${prompt};multiple_true/${originalUrl
    .split("/")
    .pop()}`;

  console.log(editedUrl);
  try {
    console.log("Database Insert Payload:", {
      userId,
      originalUrl,
      editedUrl,
      prompt,
    });

    const image = await prisma.Image.create({
      data: {
        userId,
        originalUrl,
        editedUrl,
        prompt,
      },
    });

    return NextResponse.json({ image });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
