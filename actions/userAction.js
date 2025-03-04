"use server";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createUser() {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const user = await currentUser();

  if (!user) {
    return { error: "User not found" };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: userId,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`.trim(),
      imageUrl: user.imageUrl,
    },
  });

  return { message: "User created", user: newUser };
}

export async function User() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Unauthorized" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    return { message: "User found", User: existingUser };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Internal server error" };
  }
}

export async function getUserImages(userId) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });

    const count = await prisma.image.count({
      where: { userId: user.id },
    });

    console.log(count);

    const images = await prisma.image.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { message: "Images found", images, count: count };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { error: "Internal server error" };
  }
}
