import styles from './Post.module.css'

//Hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'


const Post = () => {
  const { id } = useParams()
  const {document:post, loading}=useFetchDocument("posts",id)
  
  return (
    <div className={styles.post_container}>
      {loading && <h1>Carregando...</h1>}
      {post&& (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title}/>
          <p>{post.body}</p>
          <h3>Esto post trata sobre</h3>
            <div className={styles.tags}> 
              {post.tagsArrays.map((tag)=>(<p key={tag}><span>#</span>{tag}</p>)) }
            </div>
         
        </div>
      )}
    </div>
  )
}

export default Post