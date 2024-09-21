import React, { useState } from "react";
import { getAllBlog, GetAllBlogByUser } from "../api/blogApi";
import "../css/blog.css";

export default function Blogs() {
  const [ownerBlogId, setOwnerBlogId] = useState(null);
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const getBlogByUser = GetAllBlogByUser(ownerBlogId);

  if (isLoading || getBlogByUser.isLoading) return <div>Loading...</div>;
  if (isError || getBlogByUser.isError) return <div>Error loading blogs</div>;

  const handleFilter = (id) => {
    console.log("Filtering by ID:", id);
    setOwnerBlogId(id); // Set the ownerBlogId to filter blogs
  };

  return (
    <div>
      {/* Display blogs based on the filter */}
      {ownerBlogId
        ? // Display blogs by specific user
          getBlogByUser.isSuccess &&
          getBlogByUser.data.map((blog, index) => (
            <div key={index} className="blog-content">
              <h2>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))
        : // Display all blogs if no filter is applied
          isSuccess &&
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
    </div>
  );
}
