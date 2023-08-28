import {db} from "../Firebase/Config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut

} from 'firebase/auth';
import { useState,useEffect } from 'react';

// Criando funçao de Autenticação -> ela vai repassar algumas funçoes:
    //FUNÇÕES=> +auth, +createUser, +error, +loading, +logout,+login
export const useAuthentication = () => {
  const [error,setError]=useState(null)
  const [loading,setLoading]=useState(null)


    // Cleanup 
    // deal with memory leak
    const [cancelled,setCancelled]=useState(false)



    //Gerando a autenticação 
    const auth = getAuth();

//Fazendo checagem de cancelamento
 function checkIfIsCancelled(){
    if (cancelled){
        return;
    }
 }
//Registro
//Fazendo criação do usuario e jogando no banco de dados
 const createUser = async (data)=>{
    console.log(data)

    //Verificando se ta cancelado
    checkIfIsCancelled()

    //Setando o loading como carregando 
    setLoading(true)

    //Limpando o erro 
    setError(null)

    //Usando o try-catch para validação de erros 
    try {


        //Pegamos o usuario que chega pelo -data- da função e o criamos
        const {user}= await createUserWithEmailAndPassword(

            //Passamos a autenticação 
            auth,
            data.email,
            data.password
        )

        //Agora fazemos um Update nesse usuario (FIREBASE PEDE PRA SER ASSIM) 
        await updateProfile(user,{displayName:data.displayName})
           
        //Setando loading como falso (FAZENDO COM QUE APAREÇA COMO CARREGADO)
        setLoading(false);

        //Agora retornamos o usuario
        return user   

    } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);

        // tratando alguns possiveis erros 
        let systemErrorMessage

        if (error.message.includes("Password")){
            systemErrorMessage="A senha precisa conter pelo menos 6 caracteres.";
        }else if(error.message.includes("email-already")){
            systemErrorMessage ="Email já cadastrado";
        }else {
            systemErrorMessage= "Ocorreu um erro não esperado, por favor tente mais tarde!";
        }

        //Setando loading como falso (FAZENDO COM QUE APAREÇA COMO CARREGADO)
        setLoading(false);
        
        setError(systemErrorMessage)
    }
    //Setando loading como falso (FAZENDO COM QUE APAREÇA COMO CARREGADO)
    setLoading(false);
 };

 //Logout - Sign Out=> 
const logout = ()=>{
    checkIfIsCancelled();
    signOut(auth)
}

//- Login - Sign In
async function login(data){
    //fazemos a limpeza de memoria 
    checkIfIsCancelled();
    //Setamos como verdadeiro pra que o loading seja identificado como carregando 
    setLoading(true)

    //Setamos o erro como false 
    setError(false)

    //Usamos try catch para tratamentos de erros
    try {
        //Fazemos o uso de uma funcao da qual o Firebase ja tem:
        // nela usamos o +auth tambem presente no FIREBASE
        // USAMOS O OBJ que recebemos e dele retiramos o email e a senha 
        //=> APÓS ISSO USAMOS A FUNCAO DO FIREBASE  
        await signInWithEmailAndPassword(auth,data.email,data.password)
    } catch (error) {
        //Aqui estamos listando possiveis erros 
        let systemErrorMessage;
        if (error.message.includes("user-not-found")){
            systemErrorMessage="O usuario não foi encontrado.";
        }else if(error.message.includes("wrong-password")){
            systemErrorMessage ="Senha incorreta!";
        }else {
            systemErrorMessage= "Ocorreu um erro não esperado, por favor tente mais tarde!";
        }
        //Setando loading como falso (FAZENDO COM QUE APAREÇA COMO CARREGADO)
        setLoading(false);
        //Setando o erro pra aparecer
        setError(systemErrorMessage)
    }

}


//Fazemos isso para nao ter vazamento de memoria 
 useEffect(()=>{
    return()=>setCancelled(true)
 },[]);

 //Retornando para que seja puxado em outro local 
 return{
    auth,
    createUser,
    error,
    loading,
    logout,
    login
 }
};

