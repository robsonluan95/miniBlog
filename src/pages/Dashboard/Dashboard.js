import React from 'react'
import styles from "./Dashboard.module.css"

import {Link} from "react-router-dom"


//Hooks

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'


const Dashboard = () => {
  const {user}=useAuthValue();
  const uid = user.uid
  const {deleteDocument}=useDeleteDocument("posts")


  //Posts do usuario
  const {documents:posts,loading}=useFetchDocuments("posts",null,uid)
  if(loading){
    return <p>Carregando...</p>
  }
  return (
      <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie seus Posts</p>
        {posts && posts.length === 0 ? (
              <div className={styles.noposts}>
                <p>Você ainda não tem nenhum post</p>
                <Link to="/Posts/Create" className="btn">Criar Primeiro posts </Link>
              </div>
            ) : (
              <>
                <div className={styles.post_header}>
                  <span>Título</span>
                  <span>Ações</span>
                </div>
                
                {posts && posts.map((post)=>
                <div key={post.id} className={styles.post_row}>
                  <p>{post.title}</p>
                  
                  <div>
                    <Link to={`/Post/${post.id}`} className="btn btn-outline">Ver</Link>

                    <Link to={`/Posts/Edit/${post.id}`} className="btn btn-outline">Editar</Link>
                    <button onClick={()=>deleteDocument(post.id) } className='btn btn-outline btn-danger'>Excluir</button>
                  </div>    
                              
                </div>)}            
              </>  
            )
          }
        </div>
    )
  }

export default Dashboard