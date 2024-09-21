import React, { useState } from "react";
import { getAllBlog } from "../api/blogApi";
import "../css/blog.css";
import BlogFilter from "./BlogFilter";

export default function Blogs() {
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const [title, setTitle] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      <div>
        <label htmlFor="search">Search blog</label>
        <input
          type="text"
          id="search"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      {/* Conditionally render BlogFilter if title is not empty */}
      {title && <BlogFilter title={title} />}

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
