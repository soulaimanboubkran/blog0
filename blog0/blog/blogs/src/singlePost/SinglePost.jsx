import { useContext, useEffect, useState } from 'react';
import './singlePost.css'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { Context } from '../context/Context';

export default function SinglePost() {
 const location = useLocation();
 const path = location.pathname.split("/")[2];
 const [post , setPost]= useState({});
 const {user}= useContext(Context)
const [title,setTitle]= useState("");
const [desc,setDesc]= useState("");
const [updateMode,setUpdateMode]= useState("");

 useEffect(()=>{
  const getPost = async () =>{
    const res = await axios.get("/posts/"+path);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
    
  };
  getPost()
 },[path]);

 const handleDelete= async () =>{
  try {
    await axios.delete(`/posts/${post._id}`,{
      data : {username:user.username},});
      window.location.replace("/");
  } catch (err) {};
} 
 const handleUpdate = async ()=>{
  try {
    await axios.put(`/posts/${post._id}`,{
      username:user.username,
       title,
       desc,
      });
     setUpdateMode(false)
  } catch (err) {};
 }

 const PF = "http://localhost:27017/images/"
  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photo &&(
      <img
        className="singlePostImg"
        src={PF+post.photo}
        alt=""
      />
      )}
       { updateMode ?( <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>):(
      
      <h1 className="singlePostTitle">
        {title}
        {post.username === user?.username &&(
        <div className="singlePostEdit">
          
          <button onClick={()=> setUpdateMode(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
        </div>)}
      </h1>)}
      <div className="singlePostInfo">
        <span>
          <Link className='link' to={`/?user=${post.username}`}>
          Author: <b>{post.username}</b>
          </Link>
          <b className="singlePostAuthor">
            
          </b>
        </span>
        <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ?(<textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>):(
      <p className="singlePostDesc">
       {desc}
      </p>)}
      {updateMode &&(
      <button onClick={handleUpdate}>upDate</button>)}
    </div>
  </div>
);
}
 

