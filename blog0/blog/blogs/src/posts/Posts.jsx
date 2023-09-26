import Post from '../Post/Post'
import './Post.css'



export default function Posts({posts}) {
  return (
    <div className='w-9/12  posts'>
      {posts.map(p=>(
        <Post post={p}/>
      ))}
     

    </div>
  )
}
