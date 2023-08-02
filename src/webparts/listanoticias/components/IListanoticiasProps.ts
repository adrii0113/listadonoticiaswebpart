export enum NewsDisplayType {
  list,
  card
}
export interface IListanoticiasProps {
 
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    listGuid: string;
    displayType: NewsDisplayType
  
}
