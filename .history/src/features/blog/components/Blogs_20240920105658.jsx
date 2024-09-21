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
    console.log("Filtering by ID:", id);
    setOwnerBlogId(id);
  };

  return (
    <div>
      {isSuccess &&
        ownerBlogId == null &&
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

      {getBlogByUser.isSuccess &&
        ownerBlogId != null &&
        getBlogByUser.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))}
    </div>
  );
}
