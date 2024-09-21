import React, { useRef, useState } from "react";
import TextEditor from "@/features/product/components/TextEditor/TextEditor";
import styled from "styled-components";
import { CreateBlogMutation } from "../api/blogApi";

import { useNavigate } from "react-router-dom";
const StyledError = styled.div`
  color: red;
  font-size: 14px;
  height: 2.5rem;
  padding: 5px 0;
  text-align: justify;
`;
const ContainerButton = styled.div`
  text-align: right;
`;
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  align-self: flex-end; // Đưa button qua phải khi sử dụng flexbox

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
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
  const StyledContainer = styled.div`
    width: 85%;
    margin: 0 auto;
  `;
  // Styled components
  const Container = styled.div`
    margin-bottom: 16px;
  `;

  const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  `;
  return (
    <StyledContainer>
      <Container>
        <Label htmlFor="title">Input Blog Title</Label>
        <Input type="text" name="title" id="title" ref={titleRef} />
      </Container>

      {titleError && <StyledError>This field is required</StyledError>}

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
      <ContainerButton>
        <StyledButton onClick={handleSubmit}>Submit</StyledButton>
      </ContainerButton>
    </StyledContainer>
  );
}
