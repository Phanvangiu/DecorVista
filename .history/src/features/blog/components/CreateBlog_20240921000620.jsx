import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";
import CIcon from "@coreui/icons-react";
import { cilCloudUpload } from "@coreui/icons";
import { useNavigate } from "react-router-dom"; // Correct hook

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
  text-align: justify;
`;

const StyledImgField = styled.div`
  display: flex;
  flex-direction: column;

  & input {
    display: none;
  }

  & .upload-icon {
    width: 30px;
    margin-right: 5px;
  }

  & button {
    background-color: blue;
    color: white;
    padding: 10px 0px;
    border: 0;
    cursor: pointer;
  }

  & img {
    height: 8rem;
    width: max-content;
    margin-bottom: 10px;
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }
`;

export default function CreateBlog() {
  const imgUploadRef = useRef();
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const titleRef = useRef();
  const createBlogMutation = CreateBlogMutation();
  const navigate = useNavigate(); // Corrected

  const DefaultImg =
    "https://th.bing.com/th/id/OIP.44dnstQAW4ZeGFTCZemrfgHaEb?w=305&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"; // Example default image

  const checkChange = () => {
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (imgUploadRef.current.files.length !== 0) {
      const isValidFileType = Array.from(imgUploadRef.current.files).every(
        (file) => allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        alert("Invalid file type! Please select a valid image file.");
        imgUploadRef.current.value = null; // Reset file input
        setImgSrc(DefaultImg); // Reset image to default
        return;
      }

      const selectedFile = imgUploadRef.current.files[0];
      setImgSrc(URL.createObjectURL(selectedFile)); // Update image preview
    }
  };

  const handleSubmit = () => {
    const file = imgUploadRef.current?.files[0];
    let isError = false;
    const REQUIRED_REGEX = /^.{1,}$/;

    if (!REQUIRED_REGEX.test(titleRef.current.value)) {
      setTitleError(true);
      isError = true;
    } else {
      setTitleError(false);
    }

    if (isError) return;

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("content", content);
    formData.append("imagesFile", file);

    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/blog"); // Corrected navigation
      },
    });
  };

  return (
    <div>
      <StyledError>
        {titleError && <span>This field is required</span>}
      </StyledError>

      <div className="title-block">
        <label htmlFor="title">
          <b>Input Blog Title</b>
        </label>
        <input type="text" name="title" id="title" ref={titleRef} />
      </div>

      <StyledImgField>
        <label htmlFor="images">
          <b>Blog Cover Image</b>
        </label>

        <label htmlFor="images" style={{ cursor: "pointer" }}>
          <CIcon icon={cilCloudUpload} className="upload-icon" />
          <span>Upload Image</span>
        </label>

        <input
          ref={imgUploadRef}
          accept="image/*"
          onChange={checkChange}
          type="file"
          id="images"
        />

        {imgSrc ? (
          <img src={imgSrc} alt="Selected" />
        ) : (
          <img src={DefaultImg} alt="Default" />
        )}
      </StyledImgField>

      <TextEditor state={content} setState={setContent} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}