"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Recolor", href: "/recolor" },
    { name: "Remove", href: "/remove" },
    { name: "Fill", href: "/fill" },
    { name: "Replace", href: "/replace" },
    { name: "Restore", href: "/restore" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full h-20 flex justify-between items-center bg-gray-900 shadow-lg px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              href="/"
              className="text-blue-400 text-2xl md:text-3xl font-bold"
            >
              Edit Aura
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-blue-400 ${
                    pathname === link.href ? "text-blue-400" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-white rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700">
              <SignedIn>
                <SignOutButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : "text-white"
                }`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="text-white rounded-md bg-blue-600 px-6 py-3 hover:bg-blue-700">
              <SignedIn>
                <SignOutButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white focus:outline-none"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}
