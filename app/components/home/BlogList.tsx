import { getAllBlogPosts } from "@/lib/api";
import { draftMode } from "next/headers";
import React from "react";
import BlogItem from "./BlogItem";

export default async function BlogList({}) {
  const { isEnabled } = draftMode();
  const allPosts = await getAllBlogPosts(isEnabled);
  // console.log("🚀 ~ BlogList ~ allPosts:", allPosts);
  return (
    <section>
      {React.Children.toArray(
        allPosts?.map((post) => (
          <BlogItem
            title={post.title}
            coverImage={post.image}
            date={post.publishedDate}
            excerpt={post.excerpt}
            author={post.author}
            slug={post.slug}
          />
        ))
      )}
    </section>
  );
}
