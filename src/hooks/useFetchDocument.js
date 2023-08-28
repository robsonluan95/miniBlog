import { useState, useEffect} from "react";
import { db } from "../Firebase/Config";

import { doc,getDoc} from "firebase/firestore";

export const useFetchDocument=(docCollection,id)=>{

    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
    //deal with memory leak
    const [cancelled,setCancelled]=useState(false)

    useEffect(()=>{

        async function loadDocument(){
            //Usamos isso para caso os dados sejam cancelados ele nao continuar a operação
            if (cancelled) return;
            //Carregando os dados
            setLoading(true);
            

            //
            try {
                //Regatando a referencia do Documento
                const docRef = await doc(db,docCollection,id)
                //É o snap do documento com a referencia dele usando o getDoc("REFERENCIA")
                const docSnap = await getDoc(docRef)
                //Obetendo os dados que vinheram depois de get Referenciado
                setDocument(docSnap.data())

                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setError(true)
            }
        }
        loadDocument();
        

    },[docCollection,id])
    useEffect(()=>{
        return ()=>setCancelled(true)
    },[])
    return {document,loading,error,cancelled}
}