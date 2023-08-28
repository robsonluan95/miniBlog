import styles from "./CreatePost.module.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";//Usando para renderizar depois de selecionado
import { useAuthValue } from "../../context/AuthContext";// Pegar os calores de usuarios

import React from 'react'
import { useInsertDocument } from "../../hooks/useInserDocuments";

const CreatePost = () => {
  //Aqui estamos usando useState para gerar os posts
  const [title,setTitle]= useState('');
  const [image,setImage]= useState('');
  const [body,setBody]=useState('');
  const [tags,setTags]=useState([]);
  const [formError,setFormError]=useState(null);

  //usando o hooks do useNavigate e desconstruindo(ele é que faz o redirecionamento)
  const navigate = useNavigate()

  //Buscando o valor do usuario com context
  const {user}=useAuthValue()

  const {insertDocument ,response}=useInsertDocument("posts")

  

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    setFormError("")

    //Validando image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }

    //Criar Array de Tags - neles estamos recebendo as tags separando-as pela vrigula 
    const tagsArrays =tags.split(",").map((tag)=>tag.trim().toLowerCase())

    //Checar todos os valores
    if (!title||!image||!tags||!body){
      setFormError("Preencha todos os campos!")
    }
    if(formError) return;
    
    //Criando o objeto (que é o post com as infos)
    insertDocument({
      title,image,body,tagsArrays,uid:user.uid,createBy:user.displayName
    })

    //Redirect home page
    navigate("/")

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser compartilhar!</p>
      
      <form onSubmit={handleSubmit} >
        <label>
          <span>Título:</span>
          <input
            type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Seu Título aqui"/>
        </label>

        <label>
          <span>Url da Image:</span>
          <input
          type="text" value={image} required onChange={(e)=>setImage(e.target.value)}  placeholder="Url da imagem que deseja usar no post"/>

        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
          value={body} name="body" onChange={(e)=>setBody(e.target.value)} required placeholder="Escreva sua mensagem aqui"/>
        </label>

        <label>
          <span>Tag's:</span>
          <input type="text" onChange={(e)=>setTags(e.target.value)} value={tags} required placeholder={`insira as tag's do post separadas por virgulas (",")`} />
        </label>
        {!response.loading && <button className="btn" >Cadastrar</button>}
        {response.loading && <button className="btn" disabled >Aguarde!...</button>}
            
        {response.error && <p className="error">{response.error}</p>}    
        {formError && <p className="error">{formError}</p>}   
      </form>
    </div>
  )
}

export default CreatePost