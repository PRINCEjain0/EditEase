import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0a0f1e] to-[#111936] ">
        <SignIn />
      </div>
    </>
  );
}
