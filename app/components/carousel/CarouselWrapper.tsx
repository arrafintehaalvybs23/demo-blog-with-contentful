"use client";

import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { client } from "../Header";

export function CarouselWrapper() {
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "blogPost",
          // include: 2,
        });
        console.log("🚀 ~ fetchData ~ response:", response);

        setFeaturedData(response?.items);
      } catch (error) {
        console.error("Error fetching header data from Contentful:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Carousel className="rounded-xl">
      {featuredData?.map((item) => (
        <>
          <div className="relative h-full w-full">
            <img
              src={item.fields.image.fields.file.url}
              alt={item.fields.image.fields.file.fileName}
              className="h-96 w-96 object-contain"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {item?.fields?.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  {item?.fields?.description}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Button size="lg" color="white">
                    Explore
                  </Button>
                  <Button size="lg" color="white" variant="text">
                    Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </Carousel>
  );
}
