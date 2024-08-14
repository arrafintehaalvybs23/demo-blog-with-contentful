// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { createClient } from "contentful";

// console.log("Space ID:", process.env.CONTENTFUL_SPACE_ID);
// console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);

// // Set up Contentful client
// // const client = createClient({
// //   space: process.env.CONTENTFUL_SPACE_ID,
// //   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
// // });

// const client = createClient({
//   space: "b5o1vh7kxenn",
//   accessToken: "6muMAQT7MxHtCFMEj802LYKO2rV7OGvZYuXwPmwgAkI",
// });

// export function Header() {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [headerData, setHeaderData] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRefs = useRef({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await client.getEntries({
//           content_type: "header",
//           include: 2,
//         });

//         setHeaderData(response?.items[0]?.fields);
//       } catch (error) {
//         console.error("Error fetching header data from Contentful:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClickOutside = (event) => {
//     if (
//       Object.values(dropdownRefs.current).every(
//         (ref) => ref && !ref.contains(event.target)
//       )
//     ) {
//       setOpenDropdown(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = (id) => {
//     setOpenDropdown(openDropdown === id ? null : id);
//   };

//   if (!headerData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <header className="bg-gray-900 text-white w-full py-6 px-4 mb-10">
//       <div className="container mx-auto flex justify-between items-center px-5">
//         {/* Logo */}
//         <Link href="/" className="text-4xl font-bold flex items-center">
//           <img
//             src={headerData.icon.fields.file.url}
//             alt={headerData.icon.fields.title}
//             className="h-12 mr-4"
//           />
//           {headerData.title}
//         </Link>

//         {/* Navigation */}
//         <nav className="relative flex flex-wrap items-center justify-center">
//           {headerData.navigationButtons.map((navItem, index) => (
//             <div
//               key={index}
//               className="inline-block relative"
//               ref={(el) => (dropdownRefs.current[navItem.fields.title] = el)}
//             >
//               <button
//                 onClick={() => handleDropdownToggle(navItem.fields.title)}
//                 className="px-3 hover:underline flex items-center"
//               >
//                 {navItem.fields.title}
//                 {navItem.fields.subNavigation && (
//                   <svg
//                     className="w-4 h-4 ml-1"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 )}
//               </button>
//               {openDropdown === navItem.fields.title &&
//                 navItem.fields.subNavigation && (
//                   <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
//                     {navItem.fields.subNavigation.map(
//                       (subNavItem, subIndex) => (
//                         <li key={subIndex}>
//                           <Link
//                             href={subNavItem.fields.link}
//                             className="block px-4 py-2 hover:bg-gray-200"
//                             onClick={() => setOpenDropdown(null)}
//                           >
//                             {subNavItem.fields.title}
//                           </Link>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }


// // return (
// //   <header className="bg-gray-900 text-white w-full py-6 px-4 mb-10">
// //     <div className="container mx-auto flex justify-between items-center px-5">
// //       {/* Logo */}
// //       <Link href="/" className="text-4xl font-bold flex items-center">
// //         <img
// //           src={headerData.icon.fields.file.url}
// //           alt={headerData.icon.fields.title}
// //           className="h-12 mr-4"
// //         />
// //         {headerData.title}
// //       </Link>

// //       {/* Hamburger Menu */}
// //       <button
// //         className="text-white md:hidden block"
// //         onClick={() => setMenuOpen(!menuOpen)}
// //       >
// //         <svg
// //           className="w-6 h-6"
// //           fill="none"
// //           stroke="currentColor"
// //           viewBox="0 0 24 24"
// //           xmlns="http://www.w3.org/2000/svg"
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             strokeWidth="2"
// //             d="M4 6h16M4 12h16m-7 6h7"
// //           />
// //         </svg>
// //       </button>

// //       {/* Navigation */}
// //       <nav
// //         className={`${
// //           menuOpen ? "block" : "hidden"
// //         } absolute top-full right-0 md:static md:flex md:items-center md:justify-center bg-gray-900 w-full md:w-auto md:bg-transparent z-50`}
// //       >
// //         {headerData.navigationButtons.map((navItem, index) => (
// //           <div
// //             key={index}
// //             className="sm:inline-block relative"
// //             ref={(el) => (dropdownRefs.current[navItem.fields.title] = el)}
// //           >
// //             <button
// //               onClick={() => handleDropdownToggle(navItem.fields.title)}
// //               className="px-3 py-2 hover:underline flex items-center w-full sm:w-auto text-left"
// //             >
// //               {navItem.fields.title}
// //               {navItem.fields.subNavigation && (
// //                 <svg
// //                   className="w-4 h-4 ml-1"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M19 9l-7 7-7-7"
// //                   />
// //                 </svg>
// //               )}
// //             </button>
// //             {openDropdown === navItem.fields.title &&
// //               navItem.fields.subNavigation && (
// //                 <ul className="absolute left-0 mt-2 w-full sm:w-48 bg-white text-black rounded-md shadow-lg z-20">
// //                   {navItem.fields.subNavigation.map(
// //                     (subNavItem, subIndex) => (
// //                       <li key={subIndex}>
// //                         <Link
// //                           href={subNavItem.fields.link}
// //                           className="block px-4 py-2 hover:bg-gray-200"
// //                           onClick={() => {
// //                             setOpenDropdown(null);
// //                             setMenuOpen(false);
// //                           }}
// //                         >
// //                           {subNavItem.fields.title}
// //                         </Link>
// //                       </li>
// //                     )
// //                   )}
// //                 </ul>
// //               )}
// //           </div>
// //         ))}
// //       </nav>
// //     </div>
// //   </header>
// // );
// // }


"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "contentful";

// Set up Contentful client
const client = createClient({
  space: "b5o1vh7kxenn",
  accessToken: "6muMAQT7MxHtCFMEj802LYKO2rV7OGvZYuXwPmwgAkI",
});

export function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="bg-gray-900 text-white w-full py-4 px-4 mb-10">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-4xl font-bold flex items-center"
        >
          <img
            src={headerData.icon.fields.file.url}
            alt={headerData.icon.fields.title}
            className="h-8 md:h-12 mr-2 md:mr-4"
          />
          {headerData.title}
        </Link>

        {/* Hamburger Menu */}
        <button
          className="text-white lg:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } fixed top-0 right-0 h-full bg-gray-800 w-64 z-50 p-6 lg:static lg:flex lg:items-center lg:justify-center lg:w-auto lg:bg-transparent`}
        >
          <button
            className="text-white md:hidden block mb-6"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {headerData.navigationButtons.map((navItem, index) => (
            <div
              key={index}
              className="relative"
              ref={(el) => (dropdownRefs.current[navItem.fields.title] = el)}
            >
              <button
                onClick={() => handleDropdownToggle(navItem.fields.title)}
                className="px-3 py-2 hover:underline flex items-center w-full sm:w-auto text-left"
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
                  <ul className="absolute left-0 mt-2 w-full sm:w-48 bg-white text-black rounded-md shadow-lg z-20">
                    {navItem.fields.subNavigation.map(
                      (subNavItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subNavItem.fields.link}
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={() => {
                              setOpenDropdown(null);
                              setMenuOpen(false);
                            }}
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
