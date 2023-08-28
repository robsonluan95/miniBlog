import React from 'react'
import styles from "./PostDetail.module.css"
import { Link } from 'react-router-dom'
//Criando um arquivo que recebe pros
const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>

        <img src={post.image} alt={post.title}></img>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className={styles.createdby}>{post.createBy}</p>
        <div className={styles.tags}>
            {//aqui pegamos o array de tags do posto e exibimos
            post.tagsArrays.map((tag)=>(
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link className='btn-outline' to={`/Post/${post.id}`}>Ler</Link>
    </div>
  )
}

export default PostDetail