import React, { useState } from "react";
import { getAllBlog, GetAllBlogByUser } from "../api/blogApi";
import "../css/blog.css";
export default function Blogs() {
  const [ownerBlogId, setOwnerBlogId] = useState(null); // You can dynamically set this
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const getBlogByUser = GetAllBlogByUser(ownerBlogId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;
  const hanldeFilter = (id) => {
    getBlogByUser(id);
  };
  return (
    <div>
      {isSuccess &&
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
            <button onClick={hanldeFilter(blog.interior_designer_id)}>
              filter
            </button>
          </div>
        ))}
      {getBlogByUser.isSuccess &&
        getBlogByUser.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))}
    </div>
  );
}
