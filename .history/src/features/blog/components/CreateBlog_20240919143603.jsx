import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";
import CIcon from "@coreui/icons-react";
const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
  text-align: justify;
`;
export default function CreateBlog() {
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const DefaultImg =
    "https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?w=299&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  const [imgSrc, setImgSrc] = useState();
  const titleRef = useRef();
  const createBlogMutation = CreateBlogMutation(DefaultImg);

  const onUploadImg = (ev) => {
    ev.preventDefault();
    imgUploadRef.current.click();
  };
  const handleSubmit = () => {
    let isError = false;
    const REQUIRED_REGEX = /^.{1,}$/;
    //check requied
    if (!REQUIRED_REGEX.test(titleRef.current.value)) {
      setTitleError(true);
      isError = true;
    } else {
      setTitleError(false);
    }

    if (isError === true) {
      return;
    } else {
      setTitleError(false);
    }

    const formData = new FormData();

    formData.append("title", document.getElementById("title").value);
    formData.append("content", content);
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        //page reload again
        window.location.reload();
      },
    });
  };
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
      <div>
        <label>
          <b>Blog Cover Image</b>
        </label>
        <input
          ref={imgUploadRef}
          accept="image/*"
          onChange={checkChange}
          type="file"
          id="image"
        />
        <img src={imgSrc} alt="img" />
        <button onClick={onUploadImg}>
          <CIcon icon={cilCloudUpload} customClassName="upload-icon" />
          Image Upload Here
        </button>
      </div>
      <TextEditor
        state={content}
        setState={setContent}
        name="content"
        id="content"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}