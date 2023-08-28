import { useState,useEffect,useReducer } from "react";
//bucando o banco de dados
import {db} from "../Firebase/Config"

//Importando Funções do FireBase
//----> doc (no FireBase não são os Documenos) 

import { doc,deleteDoc, } from "firebase/firestore";


//Criação do dado Inicial do Reducer  ↓
const initialState={
    loading:null,
    error:null
}

//Criação do Reducer ↓ ele aceita o estado e a ação que queremos execultar
const deleteReducer = (state,action)=>{
    switch (action.type) {
        case "LOADING":
            return{loading:true,error:null}
        case "DELETED_DOC":
            return {loading:false,error:null}
        case "ERROR":
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

//Aqui iremos fazer um hooks que aceita o que sera criado em formato de coleção
export const useDeleteDocument=(docCollection)=>{

    //Aqui iremos criar um estado para armazenar o dado que vem do Reducer
    const [response,dispatch]=useReducer(deleteReducer,initialState)

    //deal with memory leak
    const [cancelled,setCancelled]=useState(false)

    //Aqui iremos fazer uma verificação de cancelamento
    const checkCancelBeforeDispatch=(action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }
    //Fazendo a checagem apos o disparo do click
    const deleteDocument=async(id)=>{
        checkCancelBeforeDispatch({
            type:"LOADING"
            }
        );
        try{

            //Aqui iremos delete um objeto que vai ser removido no Banco
            const deletedDocument = await deleteDoc(doc(db,docCollection,id))
            checkCancelBeforeDispatch({
                type:"DELETED_DOC",payload:deleteDocument
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
    return {deleteDocument ,response};
};