import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";

export default function CreateBlog() {
  const StyledError = styled.div`
    color: red;
    font-size: 14px;
    height: 2.5rem;
    padding: 5px 0;
    text-align: justify;
  `;
  const [content, setContent] = useState("");
  const [titleError, settitleError] = useState(false);
  const titleRef = useRef();
  return (
    <div>
      <StyledError>
        {titleError && <span>This field is required</span>}
      </StyledError>
      <div className="title-block">
        <label htmlFor="">
          <b>Input Blog Title</b>
        </label>
        <input type="text" name="title" id="title" ref={titleRef} />
      </div>
      <TextEditor state={content} setState={setContent} />
    </div>
  );
}
