import { useState, useEffect} from "react";
import { db } from "../Firebase/Config";

import { collection, query, orderBy,onSnapshot, where,getDocs,QuerySnapshot } from "firebase/firestore";

export const useFetchDocuments=(docCollection,search=null, uid=null)=>{

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
    //deal with memory leak
    const [cancelled,setCancelled]=useState(false)

    useEffect(()=>{

        async function loadData(){
            //Usamos isso para caso os dados sejam cancelados ele nao continuar a operação
            if (cancelled) return;
            //Carregando os dados
            setLoading(true);
            //Trazer a referencia da coleção--> passando o BANCO DE DADOS E A COLEÇÂO QUE VEM POLO ARGUMENTO
            const collectionRef= await collection (db,docCollection)
            try {
                
                let q;
                
                //Crair a busca 
                if (search){
                    //Estamos jogando para o q uma coleçao com a função query do FIREBASE,
                    //Usamos tambem o where com algumas funcoes(o que queremos , e a funcao de busca de arrays) 
                    //Jogamos na variavel search , e depois dizemos como é a ordem que ela vai ser apresentada
                    q = await query(collectionRef,where("tagsArrays","array-contains",search),orderBy("createdAt","desc"))

                }else if(uid){
                    //Usando a mesma logica de cima so que aqui estamos buscando alguem com uma parecida
                    //o UID estar procurando dentro dos posts um igual ao uid da varivael passada pelo deashboard
                    q = await query(collectionRef,where("uid", "==", uid),orderBy("createdAt","desc"))
                }else{
                    //Aqui estamos fazendo ele receber uma coleção da qual sera ordenada por criação
                    q = await query(collectionRef, orderBy("createdAt","desc"))
                }

                //Criar a DashBoard


                
                //Fazendo a mapeação dos nossos dados alterados--> Verificar se houve alteraçoes e trouxe atualizados
                await onSnapshot(q,(querySnapshot)=>{
                    //Criando um array 
                    setDocuments(   

                        //Aqui estamos buscando cada dado individualmente apos receber todos eles , isso usando o .map
                        querySnapshot.docs.map((doc)=>({
                            //Estamos Criando um novo objeto -> É feito assim por conta do FIREBASE
                            id:doc.id,
                            //Estamos pegando os dados anti
                            ...doc.data(),

                        }))
                        
                    )
                
                })
                setLoading(false)
            } catch (error) {
                //Aqui estamos setando caso acontece um erro pra conseguir fazer a leitura deles 
                setError(error.message)

                setLoading(false)
            }
        }
        loadData();

    },[docCollection,search,uid,cancelled])
    useEffect(()=>{
        return ()=>setCancelled(true)
    },[])
    return {documents,loading,error}
}