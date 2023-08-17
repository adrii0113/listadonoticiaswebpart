export enum Vista {
  list,
  card
}
export interface IListanoticiasProps {
 
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    listGuid: string;
    tipoVista: Vista
  
}
