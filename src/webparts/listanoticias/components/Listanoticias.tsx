import * as React from 'react';
import {useState, useEffect } from 'react'


import { getSP } from "./../../../pnpjsConfig"
import { IListaNoticias } from "./IListaNoticas"
import { IListanoticiasProps } from './IListanoticiasProps';
// import Lista from './Lista'

import {
  DetailsList,
  SearchBox,
  Dropdown,
  IDropdownOption,
  Stack,
  // IColumn
} from "@fluentui/react"

import  TarjetNoticias  from "./TarjetaNoticias"

// import { NewsDisplayType } from './IListanoticiasProps';

require ('./Listanoticias.module.scss')
import './Listanoticias.scss'

const categories :IDropdownOption[] = [

  {key: "Empleo", text: "Empleo"},
  {key: "Tecnologia", text: "Tecnologia"},
  {key: "Salud", text: "Salud"},
  {key:"All", text:"Todos"}


]

const responables: IDropdownOption[] = [

  { key: "Adele Vance", text: "Adele Vance" },
  { key: "Adrian Calleja", text: "Adrian Calleja" },
  { key: "All", text: "todos"}
]



const viewOptions: IDropdownOption[] = [

  {key: "card", text: "Card"},
  {key: "list", text: "List"}
]




// const detaiListColumns: IColumn[] = [

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
  
 



// ]

const getNews = async (listGuid: string): Promise<IListaNoticias[]> =>{


    const allItems: IListaNoticias[] = await getSP().web.lists.getById(listGuid).items.select("Title","descripcion","categoria","fechapublicacion","imagen","responsable/Title").expand("responsable")()
    // const allItems: IListaNoticias[] = await getSP().web.lists.getById(listGuid).items.select("titulo,odata.etag")()
    // console.log(allItems)
  //  console.log(allItems)
    return allItems.map((noticia) => ({
      Title: noticia.Title,
      categoria: noticia.categoria,
      descripcion: noticia.descripcion,
      fechapublicacion: noticia.fechapublicacion,
      responsable:(noticia.responsable as any).Title,
      imagen: (noticia.imagen as any).Url,
      // titulo: noticia.titulo,
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

      
      getNews(listGuid).then((news) =>{console.log(news)}).catch((error) =>console.log(error))
      getNews(listGuid)
        .then(
          (news)=>{
            setNews(news)
            setFilteredNews(news)
          }
        ).catch((error) => console.log(error))
    }


    getnewsdata().catch((error)=>console.log(error))

    return () => {
      console.log('ComponenteHijo se va a desmontar.');
    };

  },[listGuid])



  // test function
  // useEffect(() => {
    
  // },[displayType])

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
    // console.log(display)
    // setDisplayType(viewOption)d
    switch (viewOption.key) {
      case 'list': 
          setFilteredNews(news)
          setDisplay('list')
        break;
      case 'card':
          setDisplay('card')
        break;
      default:
        setDisplay('list')
        break;
    }
  }

 
  useEffect(() => {
    let filtered = news
    
    // en funcion del valor que el usuario escriba en la busqueda, busca una coincidencia comparando con la descripcion y el titulos de todos los objetos
    if (userSearch) {
      
      
      filtered = filtered.filter(({ descripcion, Title})=>

        [descripcion,Title].some((value:string) => (value.toLowerCase().includes(userSearch.toLowerCase())))

      )
      
    } else {console.log("user searhc empty")}



    // filtra los datos en funcion del valor del seleccionable siempre y cuando no sea la opcion de mostrar todos
    if (newsCategory?.key && newsCategory?.key !== 'All') {

      
      filtered = filtered.filter((news) => news.categoria === newsCategory.key)
    }

    
    // filtra los datos en funcion del valor del seleccionable siempre y cuando no sea la opcion de mostrar todos
    if (newsCreator?.key && newsCreator?.key !== 'All') {
      filtered = filtered.filter((news) => news.responsable === newsCreator.key)
    }


    
    setFilteredNews(filtered)

   

    //si cambia el valor del estado tanto de la busqueda por texto como del filtro de las categorias se vuleve a ejecutar la funcion
  },[userSearch, newsCategory?.key, newsCreator?.key])
  
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


      <div className="content-container">

      
      {/* <DetailsList items={filteredNews} ></DetailsList> */}

      {

        // displayType.key === 'lista' ? <DetailsList items={filteredNews} ></DetailsList> : <TarjetNoticias/>

         ( ()=>{

            switch (display) {

              case 'card':
                return filteredNews.map((news)=>(
                  <TarjetNoticias key={news.Title} {...news}/>
                ))
                break;
              case undefined:
                return <Stack tokens={{ childrenGap: 16 }}><DetailsList items={filteredNews} ></DetailsList></Stack>
                break;
              case 'list':
                console.log(filteredNews)
                
                return <DetailsList setKey='set' items={filteredNews}></DetailsList>
                break;
              
              default:<DetailsList setKey='set' items={filteredNews} ></DetailsList>
                break;
            }

            // let newsReinitialized: IListaNoticias[] = filteredNews;

            // switch (displayType) {
            //   case NewsDisplayType.list:
            //       console.log(filteredNews)
            //       return <DetailsList items={newsReinitialized} children={filteredNews} />
            //       break
                  
                
                
            //   case NewsDisplayType.card:
            //     return <Stack tokens={{ childrenGap: 16 }}>
            //     {filteredNews.map((newss) => (
            //       <TarjetNoticias key={newss.Title} {...newss} />
            //     ))}
            //   </Stack>
            //   default:
            //     return
            // }

          }
          )()
      }

      
    {/* <TarjetNoticias/> */}
    </div>
    </div>
  )
}
