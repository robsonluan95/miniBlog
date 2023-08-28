//Import Css

import { useState,useEffect } from "react"
import styles from "./Login.module.css"
import { useAuthentication } from "../../hooks/useAuthentication"




const Login = () => {
    //Aqui estamos usando o useState para gerar alteraçoes de variaveis 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")

  //Estamos usando um custom Hooks para buscar informaçoes que serao nescessarias
  const{login,error:authError,loading}=useAuthentication(); 

  const handleSubmit=async (e)=>{
    //Função do JavaScripit que nao permite com que a tela seja atualizado que seria contra intuitivo para o react
      e.preventDefault()
    
      //estamos zerando os erros para que sejam atualizados caso nescessarios
      setError("")
    //Estamos pegando as infomaçoes que foram geradas no formulario e com elas criando um Objeto que sera enviado para o nosso hook
      const user={

          email,
          password,
      } 
      //Apos a criaçao do objeto enviamos para o nosso hook que contem a funçao de login do firebase
      const res = await login(user)
      //Imprimindo o user junto a informações que queremos
      console.log(res)
  }

  //Fazemos uso do useEffect que é uma funçao do react que atualiza semore que ouver mudança na dependencia de arrays
  useEffect(()=>{{
      if (authError){
          setError(authError)
      }
  }},[authError])

  //Login- Aqui criamos formularios para que eles sejam acessados pelos usuarios 
  return (
    <div className={styles.login}>
       <h1>Entrar!</h1>
        <p>Faça o login</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input 
                type="email" 
                name="email" 
                required 
                placeholder="E-mail do usúario"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                type="password" 
                name="password" 
                required 
                placeholder="Insira senha do usúario"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </label>
          
            {/*Aqui estamos usando logica para habilitar e desabilitar botoes caso nescessarios  */}
            {!loading && <button className="btn" >Entrar</button>}
            {loading && <button className="btn" disabled >Aguarde!...</button>}
            
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login