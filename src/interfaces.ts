export interface INewslist {

    titulo: string;
    descripcion: string;
    categoria: string;
    fechaPublicacion: Date;
    responsable: string;
    imagen: URL;
}



// test list interfaces
export interface ISPLists {
    value: ISPList[];
  }
  
  export interface ISPList {
    Title: string;
    Id: string;
  }