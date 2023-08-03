import * as React from 'react';
import {useState, useEffect } from 'react'


import { getSP } from "./../../../pnpjsConfig"
import { IListaNoticias } from "./IListaNoticas"
import { IListanoticiasProps } from './IListanoticiasProps';

import {
  DetailsList,
  SearchBox,
  Dropdown,
  IDropdownOption,
  Stack,
} from "@fluentui/react"

import  TarjetNoticias  from "./TarjetaNoticias"

// import { NewsDisplayType } from './IListanoticiasProps';

require ('./Listanoticias.module.scss')
import './Listanoticias.scss'

const categories :IDropdownOption[] = [

  {key: "Empleo", text: "Empleo"},
  {key: "Tecnologia", text: "Tecnologia"},
  {key: "Salud", text: "Salud"},


]

const responables: IDropdownOption[] = [

  { key: "Adele Vance", text: "Adele Vance" },
  { key: "Adrian Calleja", text: "Adrian Calleja" }
]



const viewOptions: IDropdownOption[] = [

  {key: "card", text: "Card"},
  {key: "list", text: "List"}
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


    const allItems: IListaNoticias[] = await getSP().web.lists.getById(listGuid).items.select("Title","ID","titulo","descripcion","categoria","fechapublicacion","imagen","responsable/Title").expand("responsable")()
    // const allItems: IListaNoticias[] = await getSP().web.lists.getById(listGuid).items.select("titulo,odata.etag")()
    console.log(allItems)
  //  console.log(allItems)
    return allItems.map((noticia) => ({
      Title: noticia.Title,
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
  // const [displayType, setDisplayType] = useState <IDropdownOption>()
  const [display, setDisplay] = useState <string>("")
  
  useEffect(() => {
    setDisplay('list')
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

  const handleView = (_: unknown,viewOption:IDropdownOption):void => {

    console.log(viewOption)
    // setDisplayType(viewOption)
    switch (viewOption.key) {
      case 'list':
          setDisplay('list')
        break;
      case 'card':
          setDisplay('card')
        break;
      default:
        break;
    }
  }

 
  useEffect(() => {
    let filtered = news
    
    // //if user type any ...
    if (userSearch) {
      
      
      filtered = filtered.filter(({titulo, descripcion, Title})=>

        [titulo, descripcion,Title].some((value:string) => (value.toLowerCase().includes(userSearch.toLowerCase())))

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
      <Dropdown
        placeholder="Selecciona un tipo de vista"
        label='vista'
        options={viewOptions}
        onChange={handleView}
        defaultSelectedKey="list"
      />


      
      {/* <DetailsList items={filteredNews} ></DetailsList> */}

      {

        // displayType.key === 'lista' ? <DetailsList items={filteredNews} ></DetailsList> : <TarjetNoticias/>

         ( ()=>{

            switch (display) {
              case undefined:
                return <Stack tokens={{ childrenGap: 16 }}><DetailsList items={filteredNews} ></DetailsList></Stack>
                break;
              case 'list':
                return <Stack tokens={{ childrenGap: 16 }}><DetailsList items={filteredNews} ></DetailsList></Stack>
                break;
              case 'card':
                return filteredNews.map((news)=>(
                  <TarjetNoticias key={news.titulo} {...news}/>
                ))
                break;
              default:<DetailsList items={filteredNews} ></DetailsList>
                break;
            }

          }
          )()
      }

      
    {/* <TarjetNoticias/> */}
    </div>
  )
}
