import React, { useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
export default function CreateBlog() {
  const [useContent, setContent] = useState();
  return (
    <div>
      <TextEditor setState={useContent} />
    </div>
  );
}
