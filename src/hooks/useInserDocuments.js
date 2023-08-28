import { useState,useEffect,useReducer } from "react";
//bucando o banco de dados
import {db} from "../Firebase/Config"

//Importando Funções do FireBase
//----> collection (no FireBase não são tabelas) 
//----> addDoc (adiciona um novo dado ao Banco)
//----> Timestamp (é um evento que é disparado a hora quando houver criado um dado no Banco)
import { collection,addDoc,Timestamp } from "firebase/firestore";


//Criação do dado Inicial do Reducer  ↓
const initialState={
    loading:null,
    error:null
}

//Criação do Reducer ↓ ele aceita o estado e a ação que queremos execultar
const insertReducer = (state,action)=>{
    switch (action.type) {
        case "LOADING":
            return{loading:true,error:null}
        case "INSERTED_DOC":
            return {loading:false,error:null}
        case "ERROR":
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

//Aqui iremos fazer um hooks que aceita o que sera criado em formato de coleção
export const useInsertDocument=(docCollection)=>{

    //Aqui iremos criar um estado para armazenar o dado que vem do Reducer
    const [response,dispatch]=useReducer(insertReducer,initialState)

    //deal with memory leak
    const [cancelled,setCancelled]=useState(false)

    //Aqui iremos fazer uma verificação de cancelamento
    const checkCancelBeforeDispatch=(action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }
    const insertDocument=async(document)=>{
        checkCancelBeforeDispatch({
            type:"LOADING"
            }
        );
        try{

            //Aqui iremos criar um objeto que vai ser inserido no Banco
            const newDocument={...document,createdAt:Timestamp.now()}

            //Aqui iremos criar uma coleção que vai ser inserido o dado
            const insertedDocument =await addDoc(
                collection(db,docCollection),newDocument
            )
            checkCancelBeforeDispatch({
                type:"INSERTED_DOC",payload:insertedDocument
                }
            );

        }catch(error){
            checkCancelBeforeDispatch({
                type:"ERROR",payload:error.messagen
                }
            );
        }
    };
    useEffect(()=>{
        return ()=>setCancelled(true);
    },[])
    return {insertDocument ,response};
};