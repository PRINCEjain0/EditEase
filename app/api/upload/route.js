import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId: clerkId } = getAuth(req);
  console.log(clerkId);

  if (!clerkId) {
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

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const editedUrl = `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/e_gen_remove:prompt_${prompt};multiple_true/${originalUrl
    .split("/")
    .pop()}`;

  console.log(editedUrl);

  try {
    console.log("Database Insert Payload:", {
      userId: user.id,
      originalUrl,
      editedUrl,
      prompt,
    });

    const image = await prisma.image.create({
      data: {
        userId: user.id,
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
