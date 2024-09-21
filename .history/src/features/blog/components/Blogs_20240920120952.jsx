import React, { useState } from "react";
import { getAllBlog, GetBlogById } from "../api/blogApi";
import "../css/blog.css";
import BlogFilter from "./BlogFilter";
import { Navigate } from "react-router-dom";

export default function Blogs() {
  const [title, setTitle] = useState("");
  const [idBlog, setIdBlog] = useState();
  const getBlogById = GetBlogById(idBlog);
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const navi = Navigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  const onCLickBlog = () => {};
  return (
    <div>
      <div className="search-container">
        <label htmlFor="search">Search blog</label>
        <input
          type="text"
          id="search"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      {title && <BlogFilter title={title} />}

      {isSuccess &&
        title === "" &&
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2 onClick={() => onCLickBlog()}>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
          </div>
        ))}
    </div>
  );
}
