import * as React from "react"
import { IListaNoticias } from "./IListaNoticas";
import {
    DetailsList
  } from "@fluentui/react"

  import { useEffect } from 'react'
export default function Lista(arr: IListaNoticias[]){

    // const items: IListaNoticias[] = props;
    let lista : IListaNoticias[] = Object.values(arr)

    useEffect(() =>{

        lista =[]
        lista = Object.values(arr)

    },[lista])
    
    console.log(lista)
    return(

        
            <DetailsList items={lista}></DetailsList>
        

    )







}