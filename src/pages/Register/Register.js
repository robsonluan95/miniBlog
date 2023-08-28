//import CSS
import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Register.module.css"

//Imports 
import { useState,useEffect } from "react"



const Register = () => {
    //Usamos o useState para gerar as informaçoes para o db
    const [displayName,setDisplayName]= useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmePassword]=useState("")
    //Usamos a infomações para bucar o possivel erro!
    const [error,setError]=useState("")

    //Estamos usando um custonHook para buscar as funçoes que usaremos para registro
    const{createUser,error:authError,loading}=useAuthentication(); 


    //Função que é ativada quando apertamos em criar!
    const handleSubmit=async (e)=>{
        e.preventDefault()

        //Fazemos a limpeza dos erros para que Caso o Usuario tenha errado na primeira ele troque o possivel novo erro
        setError("")


        //Aqui estamos usando as informaçoes cedida por ele para que possamos criar e jogar para o hook
        const user={
            displayName,
            email,
            password,
        } 


        //Aqui geramos um possivel erro e setamos ele
        if(password!==confirmPassword){
            setError("As senhas precisam ser iguais")
            return
        }
        //Aqui estamos usando o hook para criar o usuario e definindo uma variavel para que ele seja acessado caso precise
        const res = await createUser(user)
    }
    //Usamos esse useEffect para que ele atualize o erro caso ele mude
    useEffect(()=>{{
        if (authError){
            setError(authError)
        }
    }},[authError])


  return (
    //Aqui criamos um sistema para que seja possivel a interaçao do usuario e seu registro
    <div className={styles.register} >
        <h1>Cadastre-se!</h1>
        <p>Crie seu usúario e compartilhe suas historias</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                type="text" 
                name="displayName" 
                required 
                placeholder="Nome do usúario"
                value={displayName}
                onChange={(e)=>{setDisplayName(e.target.value)}}
                />
            </label>
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
            <label>
                <span>Confirme Senha:</span>
                <input 
                type="password" 
                name="confirmPassword" 
                required 
                placeholder="Confirme sua senha usúario"
                value={confirmPassword}
                onChange={(e)=>{setConfirmePassword(e.target.value)}}
                />
            </label>
            {/** Nessa Parte fazemos botoes que sao acessiveis somente quando o sistema achar nescessario  */}
            {!loading && <button className="btn" >Cadastrar</button>}
            {loading && <button className="btn" disabled >Aguarde!...</button>}
            
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register