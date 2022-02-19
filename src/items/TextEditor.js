import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./textEditor.style.css";

const TextEditor = () => {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <ReactQuill
        modules={modules}
        theme="snow"
        placeholder="Enter the content here..."
        onChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
