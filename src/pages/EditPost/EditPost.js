import styles from "./EditPost.module.css"

import { useState ,useEffect} from "react";
import { useNavigate ,useParams} from "react-router-dom";//Usando para renderizar depois de selecionado
import { useAuthValue } from "../../context/AuthContext";// Pegar os calores de usuarios

import React from 'react'
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const {id}=useParams()
  //Buscando o documento do post pelo id
  const {document:post}=useFetchDocument("posts",id)

  //Aqui estamos usando useState para gerar os posts
  const [title,setTitle]= useState('');
  const [image,setImage]= useState('');
  const [body,setBody]=useState('');
  const [tags,setTags]=useState([]);
  const [formError,setFormError]=useState(null);

  //Usando o useEffect para preencher os dados
  useEffect(() => {
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)
      const textTags=post.tagsArrays.join(", ")
      setTags(textTags)
    }
    
  }, [post])
  

  //usando o hooks do useNavigate e desconstruindo(ele é que faz o redirecionamento)
  const navigate = useNavigate()

  //Buscando o valor do usuario com context
  const {user}=useAuthValue()

  const {updateDocument ,response}=useUpdateDocument("posts")

  

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
    const data={
      title,image,body,tagsArrays,uid:user.uid,createBy:user.displayName
    }
    updateDocument(id,data)

    //Redirect home page
    navigate("/Dashboard")

  }

  return (
    <div className={styles.edit_post}>
      {post &&(
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados como desejar!</p>
          
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
            <p className={styles.preview_title}>Preview da Imagem</p>
            <img className={styles.preview_img} src={post.image} alt={post.title}/>
            <label>
              <span>Conteúdo:</span>
              <textarea
              value={body} name="body" onChange={(e)=>setBody(e.target.value)} required placeholder="Escreva sua mensagem aqui"/>
            </label>

            <label>
              <span>Tag's:</span>
              <input type="text" onChange={(e)=>setTags(e.target.value)} value={tags} required placeholder={`insira as tag's do post separadas por virgulas (",")`} />
            </label>
            {!response.loading && <button className="btn" >Editar</button>}
            {response.loading && <button className="btn" disabled >Aguarde!...</button>}
                
            {response.error && <p className="error">{response.error}</p>}    
            {formError && <p className="error">{formError}</p>}   
          </form>
        </>

      )}
      
    </div>
  )
}

export default EditPost