import React, { useState } from "react";
import { getAllBlog, GetAllBlogByUser } from "../api/blogApi";
import "../css/blog.css";

export default function Blogs() {
  const [ownerBlogId, setOwnerBlogId] = useState(null);
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const getBlogByUser = GetAllBlogByUser(ownerBlogId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  const handleFilter = (id) => {
    setOwnerBlogId(id); // Set the ownerBlogId to filter blogs
  };

  return (
    <div>
      {/* Display all blogs */}
      {isSuccess &&
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
            <button onClick={() => handleFilter(blog.interior_designer_id)}>
              Filter
            </button>
          </div>
        ))}

      {/* Display blogs by specific user */}
      {getBlogByUser.isSuccess &&
        getBlogByUser.data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))}
    </div>
  );
}
