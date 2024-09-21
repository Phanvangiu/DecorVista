import React, { useEffect } from "react";
import { FilterBlogByName } from "../api/blogApi";

export default function BlogFilter({ title }) {
  const { data, isLoading, isError, isSuccess, refetch } =
    FilterBlogByName(title);

  useEffect(() => {
    // Refetch the blogs whenever the title changes
    if (title) {
      refetch();
    }
  }, [title, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blogs</div>;

  return (
    <div>
      {isSuccess && data.data.length > 0 ? (
        data.data.map((blog, index) => (
          <div key={index} className="blog-content">
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} // Render HTML content safely
            />
          </div>
        ))
      ) : (
        <div>No blogs found for this search.</div>
      )}
    </div>
  );
}
