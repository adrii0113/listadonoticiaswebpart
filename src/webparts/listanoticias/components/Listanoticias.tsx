import * as React from 'react';
import {useState, useEffect } from 'react'


import { getSP } from "./../../../pnpjsConfig"
import { IListaNoticias } from "./IListaNoticas"
import { IListanoticiasProps } from './IListanoticiasProps';
// import { DetailsList } from '@fluentui/react/lib/DetailsList'; 
import {
  DetailsList,
  SearchBox,
  Dropdown,
  IDropdownOption,
} from "@fluentui/react"



const categories :IDropdownOption[] = [

  {key: "Empleo", text: "Empleo"},
  {key: "Tecnologia", text: "Tecnologia"},
  {key: "Salud", text: "Salud"},


]

const responables: IDropdownOption[] = [

  { key: "Adele Vance", text: "Adele Vance" },
  { key: "Adrian Calleja", text: "Adrian Calleja" }
]




// const detaiListColumns = [

//   {
//     key:"titulo",
//     name:"Titulo",
//     fieldName:"titulo",
//     minWidth: 50,
//   },

//   {
//     key:"categoria",
//     name:"Categoría",
//     fieldName:"categoria",
//     minWidth: 50,
//   },
//   {
//     key:"descripcion",
//     name:"Descripción",
//     fieldName:"descripcion",
//     minWidth: 50,
//   },
//   {
//     key:"fechapublicacion",
//     name:"fechapublicacion",
//     fieldName:"fechapublicacion",
//     minWidth: 50,
//   },
//   {
//     key:"responsable",
//     name:"responsable",
//     fieldName:"responsable",
//     minWidth: 50,
//   },
//   {
//     key:"imagen",
//     name:"imagen",
//     fieldName:"imagen",
//     minWidth: 50,
//   },
//   {
//     key:"odata.id",
//     name:"odata.id",
//     fieldName:"odata.id",
//     minWidth: 50,
//   },
 



// ]

const getNews = async (listGuid: string): Promise<IListaNoticias[]> =>{


    const allItems: IListaNoticias[] = await getSP().web.lists.getById(listGuid).items.select("titulo","descripcion","categoria","fechapublicacion","imagen","responsable/Title").expand("responsable")()

  //  console.log(allItems)
    return allItems.map((noticia) => ({
      "odata.id": noticia['odata.id'],
      titulo: noticia.titulo,
      categoria: noticia.categoria,
      descripcion: noticia.descripcion,
      fechapublicacion: noticia.fechapublicacion,
      responsable: noticia.responsable,
      imagen: noticia.imagen,
    }))

    return allItems
    
    
    
}



export default function Listanoticias (props: IListanoticiasProps): React.ReactElement {
  const { listGuid } = props
  const [news, setNews] = useState <IListaNoticias[]>([])

  const [userSearch, setUserSearch] = useState <string>("")
  const [filteredNews, setFilteredNews] = useState <IListaNoticias[]>([])
  const [newsCategory, setNewsCategory] = useState <IDropdownOption>()
  const [newsCreator, setNewsCreator] = useState <IDropdownOption>()

  useEffect(() => {

    const getnewsdata = async () => {

      
      getNews(listGuid).then((news) =>{console.log(news)})
      getNews(listGuid)
        .then(
          (news)=>{
            setNews(news)
            setFilteredNews(news)
          }
        )
    }
    getnewsdata()
    
    
  },[listGuid])





  // handlers

  const handleCategory = (_: unknown,value:IDropdownOption) => {

    setNewsCategory(value)
  }


  const handleCreator = (_: unknown,value:IDropdownOption):void => {

    setNewsCreator(value)

  }

  
  const storeUserSearches = (search: string):void => {

    setUserSearch(search)
    
  }

 
  useEffect(() => {
    let filtered = news
    // //if user type any ...
    if (userSearch) {
      
      
      filtered = filtered.filter(({titulo, descripcion})=>

        [titulo, descripcion].some((value:string) => (value.toLowerCase().includes(userSearch.toLowerCase())))

      )
      
    } else {console.log("user searhc empty")}

    if (newsCategory?.key) {
      filtered = filtered.filter((news) => news.categoria === newsCategory.key)
    }

    if (newsCreator?.key) {
      filtered = filtered.filter((news) => news.responsable === newsCreator.key)
    }

    setFilteredNews(filtered)


    //si cambia el valor del estado tanto de la busqueda por texto como del filtro de las categorias se vuleve a ejecutar la funcion
  },[userSearch, newsCategory?.key])
  
  return(
    <div className='listaNoticiasContainer'>
      <SearchBox value={userSearch} onChange={(value) => storeUserSearches(value.target.value)} />
      <Dropdown
        placeholder="Seleccione una categoría"
        label="Categoría"
        options={categories}
        onChange={handleCategory}
        // selectedKey={category?.key}
        defaultSelectedKey="Empleo"
      />
      <Dropdown
        placeholder="Seleccione un autor"
        label="Autor"
        options={responables}
        onChange={handleCreator}
        defaultSelectedKey="Adele Vance"
        // selectedKey={author?.key}
      />  


      
      <DetailsList items={filteredNews} ></DetailsList>
      

    </div>
  )
}
