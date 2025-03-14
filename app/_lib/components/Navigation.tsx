"use client";

import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Title */}
          <h1 className="text-xl font-bold text-gray-800">
            Tour De Mohlenpris
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/login">Login</NavItem>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavItem href="/" mobile>
            Home
          </NavItem>
          <NavItem href="/dashboard" mobile>
            Dashboard
          </NavItem>
          <NavItem href="/login" mobile>
            Login
          </NavItem>
        </div>
      )}
    </nav>
  );
}

// Reusable NavItem Component
function NavItem({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <a
      href={href}
      className={`block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition ${
        mobile ? "text-lg" : "text-base"
      }`}
    >
      {children}
    </a>
  );
}
