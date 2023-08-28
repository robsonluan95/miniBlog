import { useLocation } from "react-router-dom";

//ELE PODE FAZER DUAS COISA
    //1 - Performace,aonde queremos que o valor dele fique salvo, e não precisaremos fazer a re-execursao da func
    //2 - Conseguimos fazer referencia a um obj como se ele tivesse um id(chave unica pra saber se temos outro valor)
import { useMemo } from "react";

export function useQuery(){
    const {search}=useLocation()

    //ELE È BEM PARECIDO COM O useEffec()
    //estamos fazendo o uso de URLSearchParams() +FUNÇÃO do proprio REACT e nele colocando uma variável que queremos buscar
    return useMemo(()=> new URLSearchParams(search),[search])
}