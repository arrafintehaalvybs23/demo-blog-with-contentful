"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "contentful";

console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);
console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);

// Set up Contentful client
// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
// });

export const client = createClient({
  space: "b5o1vh7kxenn",
  accessToken: "6muMAQT7MxHtCFMEj802LYKO2rV7OGvZYuXwPmwgAkI",
});

export function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "header",
          include: 2,
        });

        setHeaderData(response?.items[0]?.fields);
      } catch (error) {
        console.error("Error fetching header data from Contentful:", error);
      }
    };

    fetchData();
  }, []);

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

  if (!headerData) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-gray-900 text-white w-full py-6 px-4 mb-10">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold flex items-center">
          <img
            src={headerData.icon.fields.file.url}
            alt={headerData.icon.fields.title}
            className="h-12 mr-4"
          />
          {headerData.title}
        </Link>

        {/* Navigation */}
        <nav className="relative flex flex-wrap items-center justify-center">
          {headerData.navigationButtons.map((navItem, index) => (
            <div
              key={index}
              className="inline-block relative"
              ref={(el) => (dropdownRefs.current[navItem.fields.title] = el)}
            >
              <button
                onClick={() => handleDropdownToggle(navItem.fields.title)}
                className="px-3 hover:underline flex items-center"
              >
                {navItem.fields.title}
                {navItem.fields.subNavigation && (
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
                )}
              </button>
              {openDropdown === navItem.fields.title &&
                navItem.fields.subNavigation && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                    {navItem.fields.subNavigation.map(
                      (subNavItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subNavItem.fields.link}
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subNavItem.fields.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
