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
      {ownerBlogId ? (
        // If ownerBlogId is set, show filtered blogs
        getBlogByUser.isSuccess && getBlogByUser.data.length > 0 ? (
          getBlogByUser.data.map((blog, index) => (
            <div key={index} className="blog-content">
              <h2>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          ))
        ) : (
          <div>No blogs found for this designer.</div>
        )
      ) : (
        // If no filter is applied, show all blogs
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
        ))
      )}
    </div>
  );
}
