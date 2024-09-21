import React, { useState } from "react";
import { FilterBlogByName, GetAllBlogByUser } from "../api/blogApi";

export default function BlogFilter() {
  const { data, isLoading, isError, isSuccess } = FilterBlogByName();
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
