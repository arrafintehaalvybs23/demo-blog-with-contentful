"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const handleClickOutside = (event) => {
    if (
      Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      )
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <header className="bg-gray-900 text-white w-full py-10 px-4 mb-10">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link href="/" className="text-5xl font-bold flex items-center">
          Contentful Demo
        </Link>

        {/* Navigation */}
        <nav className="relative">
          {/* Home with Dropdown */}
          <div
            className="inline-block relative"
            ref={(el) => (dropdownRefs.current.home = el)}
          >
            <button
              onClick={() => handleDropdownToggle('home')}
              className="px-3 hover:underline flex items-center"
            >
              Home
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openDropdown === 'home' && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Home 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Home 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Home 3
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Posts with Dropdown */}
          <div
            className="inline-block relative"
            ref={(el) => (dropdownRefs.current.posts = el)}
          >
            <button
              onClick={() => handleDropdownToggle('posts')}
              className="px-4 hover:underline flex items-center"
            >
              Posts
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openDropdown === 'posts' && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Post 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Post 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Post 3
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Other Links */}
          <Link href="/" className="px-4 hover:underline">
            Fashion
          </Link>
          <Link href="/" className="px-4 hover:underline">
            Lifestyle
          </Link>
          <Link href="/" className="px-4 hover:underline">
            Technology
          </Link>
          <Link href="/" className="px-4 hover:underline">
            Sports
          </Link>

          {/* Pages with Dropdown */}
          <div
            className="inline-block relative"
            ref={(el) => (dropdownRefs.current.pages = el)}
          >
            <button
              onClick={() => handleDropdownToggle('pages')}
              className="px-3 hover:underline flex items-center"
            >
              Pages
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openDropdown === 'pages' && (
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Page 1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Page 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Page 3
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
