"use client";
import { createUser } from "@/actions/userAction";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSignedIn) return;

    async function addUse() {
      const res = await createUser();
      if (res?.error) {
        setError(res.error);
      } else {
        setUser(res.message);
      }
    }
    addUse();
  }, [isSignedIn]);

  if (error) return <h1>Error: {error}</h1>;

  return <h1>Welcome, {user?.name || "User"}!</h1>;
}
