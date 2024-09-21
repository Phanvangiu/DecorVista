import React, { useState } from "react";
import { getAllBlog, GetAllBlogByUser } from "../api/blogApi";
import "../css/blog.css";
export default function Blogs() {
  const [title, setTitle] = useState();
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const getAllBlogByUser = GetAllBlogByUser();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      <div>
        <label htmlFor="">Search blog</label>
        <input type="text" />
      </div>
      {isSuccess &&
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
