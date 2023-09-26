import { useContext, useState } from "react";
import "./Write.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title,setTitle]= useState("");
  const [desc,setDesc]= useState("");
  const [file,setFile]= useState("");
  const {user} = useContext(Context);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
     {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
    <form className="writeForm"  onSubmit={handleSubmit}>
      <div className="writeFormGroup">
        <label htmlFor="fileInput">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>

        </label>
        <input id="fileInput" type="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}  />
        <input
          className="writeInput"
          placeholder="Title"
          type="text"
          autoFocus={true}
          onChange={e=>setTitle(e.target.value)}
        />
      </div>
      <div className="writeFormGroup">
        <textarea
          className="writeInput writeText"
          placeholder="Tell your story..."
          type="text"
          autoFocus={true}
          onChange={e=>setDesc(e.target.value)}
        />
      </div>
      <button className="writeSubmit" type="submit">
        Publish
      </button>
    </form>
  </div>
  )
}
