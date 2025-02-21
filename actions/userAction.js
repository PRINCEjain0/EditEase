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
