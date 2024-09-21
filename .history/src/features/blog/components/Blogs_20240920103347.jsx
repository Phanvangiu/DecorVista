import React, { useState } from "react";
import { getAllBlog, GetAllBlogByUser } from "../api/blogApi";
import "../css/blog.css";

export default function Blogs() {
  const [ownerBlogId, setOwnerBlogId] = useState(null); // You can dynamically set this
  const { data, isLoading, isError, isSuccess } = getAllBlog();
  const getBlogByUser = GetAllBlogByUser(ownerBlogId); // Fetch blogs by user ID

  // if (isLoading || getBlogByUser.isLoading) return <div>Loading...</div>;
  // if (isError || getBlogByUser.isError) return <div>Error loading blogs</div>;

  return (
    <div>
      {/* Blogs from all users */}
      {isSuccess &&
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))}

      {/* Blogs from specific user */}
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
