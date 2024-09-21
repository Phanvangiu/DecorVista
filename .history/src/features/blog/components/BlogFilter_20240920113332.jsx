import React, { useState } from "react";
import { FilterBlogByName, GetAllBlogByUser } from "../api/blogApi";

export default function BlogFilter(title) {
  const { data, isLoading, isError, isSuccess } = FilterBlogByName(title);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;
  return (
    <div>
      {isSuccess &&
        title === "" &&
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
          </div>
        ))}
    </div>
  );
}
