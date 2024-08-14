"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "contentful";

const client = createClient({
  space: "b5o1vh7kxenn",
  accessToken: "6muMAQT7MxHtCFMEj802LYKO2rV7OGvZYuXwPmwgAkI",
});

export function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [footerIncludes, setFooterIncludes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "footer",
          include: 2,
        });

        setFooterData(response?.items);
        setFooterIncludes(response?.includes?.Entry || []);
      } catch (error) {
        console.error("Error fetching footer data from Contentful:", error);
      }
    };

    fetchData();
  }, []);

  if (!footerData || !footerIncludes) {
    return <div>Loading...</div>;
  }

  const columnCount = footerData.length;

  return (
    <footer className="bg-gray-800 text-white py-6 px-7">
      <div className="container mx-auto px-5">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
        >
          {" "}
          {footerData.map((footer, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">{footer.fields.title}</h2>
              <ul className="space-y-2">
                {footer.fields.footerNavigationButtons.map(
                  (navItem, navIndex) => {
                    const navItemData = footerIncludes.find(
                      (item) => item.sys.id === navItem.sys.id
                    );
                    return (
                      <li key={navIndex}>
                        <Link
                          href={navItemData.fields.link}
                          className="text-white hover:underline"
                        >
                          {navItemData.fields.title}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
