import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";
import CIcon from "@coreui/icons-react";
import { cilCloudUpload } from "@coreui/icons";
import { Navigate, useNavigate } from "react-router-dom";
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
  const navi = useNavigate();
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
        return;
      }

      const selectedFile = imgUploadRef.current.files[0];
      setImgSrc(URL.createObjectURL(selectedFile)); // Cập nhật hình ảnh
      console.log(selectedFile.name);
    }
  };

  const handleSubmit = () => {
    // Kiểm tra xem có file nào được chọn hay không
    const file = imgUploadRef.current?.files[0];

    let isError = false;
    const REQUIRED_REGEX = /^.{1,}$/;

    // Kiểm tra tiêu đề blog có hợp lệ hay không
    if (!REQUIRED_REGEX.test(titleRef.current.value)) {
      setTitleError(true);
      isError = true;
    } else {
      setTitleError(false);
    }

    const formData = new FormData();

    // Append các dữ liệu cần thiết vào FormData
    formData.append("title", titleRef.current.value);
    formData.append("content", content);
    formData.append("imagesFile", file); // Append tệp hình ảnh

    // Gọi mutation để submit form
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        navi("/blog");
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

        <label htmlFor="images" style={{ cursor: "pointer" }}>
          <img
            src="https://th.bing.com/th/id/OIP.sYWsdZEy2DrCuWwga-IYmQHaHa?rs=1&pid=ImgDetMain" // Example icon URL
            alt="Upload Icon"
            style={{ width: "50px", height: "50px" }}
          />
        </label>

        <input
          ref={imgUploadRef}
          accept="image/*"
          onChange={checkChange}
          type="file"
          id="images"
          style={{ display: "none" }} // Hide the file input
        />

        {imgSrc && <img src={imgSrc} alt="Selected" />}
      </div>

      <TextEditor state={content} setState={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
