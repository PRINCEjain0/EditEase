import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
export default function navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 flex justify-between items-center bg-gray-900  shadow-lg">
        <div className="space-x-8 flex items-center">
          <a href="/" className="text-blue-400 ml-8 text-3xl font-bold">
            Edit Aura
          </a>
          <span className="space-x-8">
            <a href="/recolor" className="text-white hover:text-blue-400">
              Recolor
            </a>
            <a href="/remove" className="text-white hover:text-blue-400">
              Remove
            </a>
            <a href="/fill" className="text-white hover:text-blue-400">
              Fill
            </a>
            <a href="/replace" className="text-white hover:text-blue-400">
              Replace
            </a>
            <a href="/restore" className="text-white hover:text-blue-400">
              Restore
            </a>
          </span>
        </div>

        <div className="space-x-8 mr-12">
          <a href="/profile" className="text-white hover:text-blue-400 ">
            Profile
          </a>
          <span className="text-white rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700 mr-12">
            <SignedIn>
              <SignOutButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </span>
        </div>
      </nav>
    </>
  );
}
