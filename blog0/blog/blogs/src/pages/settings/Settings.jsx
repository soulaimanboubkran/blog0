
import { useContext, useState } from 'react';
import Sidebar from '../../sidebar/Sidebar'
import './settings.css'
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Settings() {
  
  const { user, dispatch } = useContext(Context);
  const [file,setFile]= useState("")
  const [username,setUsername]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [success,setSuccess]= useState(false)
  const PF = "http://localhost:27017/images/"
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
    <div className="settingsWrapper">
      <div className="settingsTitle">
        <span className="settingsTitleUpdate">Update Your Account</span>
        <span className="settingsTitleDelete">Delete Account</span>
      </div>
      <form className="settingsForm" onSubmit={handleSubmit}>
        <label>Profile Picture</label>
        <div className="settingsPP">
          <img
            src={file ? URL.createObjectURL(file):PF+user.profilePic}
            alt=""
          />
          <label htmlFor="fileInput">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput"
            setFile={(e)=>(e.target.files[0])}
          />
        </div>
        <label>Username</label>
        <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} />
        <button className="settingsSubmitButton" type="submit">
          Update
        </button>
        {success && <span>user has been updated</span>}
      </form>
    </div>
  <Sidebar/>
  </div>
  )
}
