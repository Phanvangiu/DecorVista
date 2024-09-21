import React from "react";
import { getAllBlog } from "../api/blogApi";
import "../css/blog.css";
export default function Blogs() {
  const { data, isLoading, isError, isSuccess } = getAllBlog();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      {isSuccess &&
        data.data.map((blog, index) => (
          <div key={index}>
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
          </div>
        ))}
    </div>
  );
}
