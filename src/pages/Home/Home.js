//Import CSS
import styles from "./Home.module.css"


import { useAuthentication } from "../../hooks/useAuthentication"
import { useContext, useEffect, useState } from "react"
import { useAuthValue } from "../../context/AuthContext"
import {Link, useNavigate} from 'react-router-dom'
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
//Components
import PostDetail from "../../Components/PostDetail/PostDetail"


const Home = () => {
  //Setando arquivos para que possam ser alterados apos
  const [query,setQuery]=useState("")
  const [name,setName]=useState(" ")
  const {user}=useAuthValue()

  //Puxando do nosso custom Hooks e enviando o que queremos fazer,"posts"-> isso vai direto para o switch
  const {documents:posts,loading,error}=useFetchDocuments("posts")

  //Puxando funcao do useNavigate()
  const navigate = useNavigate();
  
  function handleSubmit(e){
    e.preventDefault()
    if(query){
      return navigate(`/Search?q=${query}`);
    }
  }
  useEffect(()=>{
    if(user){
      async function mudaNome(){
        await setName(user.displayName)
      }
      mudaNome();
    }else{

    }
  },[name])
 
  return (
    
    <div className={styles.home}>
      <h1 className={styles.title}>{!user===null ? `Olá! ${name}`:"Bem-Vindo!"} </h1>
      <h3>Veja nossos posts mais recentes!</h3>
       <form onSubmit={handleSubmit} className={styles.search_form}>
          <input type="text" placeholder="O que deseja buscar?" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <button className="btn btn-dark ">Pesquisar</button>
       </form>
       <div>
        {posts&&posts.map((post)=>(
          <PostDetail key={post.id} post={post}/>
        ))}
        {posts&& posts.length === 0 &&(
          <div className={styles.noposts}>
            <p>Nenhum post encontrado</p>
            <Link className="btn" to="/Posts/Create">Criar primeiro posts</Link>
          </div> 
        )}
       </div>
    </div>
  )
}

export default Home