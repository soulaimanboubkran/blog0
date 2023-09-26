
import Sidebar from '../sidebar/Sidebar'

import MidHeader from '../header/MidHeader.jsx'

import './Home.css'
import Posts from '../posts/Posts'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home(){
  const [posts, setPosts] = useState([]);
  const {search}= useLocation();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts"+search);
      setPosts(res.data)
    }
    fetchPosts();
  },[search])

  return (<>
  <MidHeader/>
    <div className='Home flex posts'>
        <Posts posts={posts}/>
        <Sidebar/>
        </div>
    
    
    </>
  )
}
