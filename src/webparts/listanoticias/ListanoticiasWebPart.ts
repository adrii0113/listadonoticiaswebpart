import * as React from 'react';
import * as ReactDom from 'react-dom';

import { BaseClientSideWebPart} from '@microsoft/sp-webpart-base';

// import styles from './components/Listanoticias.module.scss'

import {ISPLists} from './../../interfaces'



import "@pnp/sp/fields";
// import { ILists } from "@pnp/sp/lists";
import { getSP } from './../../pnpjsConfig';
import "@pnp/sp/items/get-all";
import { IListanoticiasProps, Vista } from './components/IListanoticiasProps';
import * as strings from "ListanoticiasWebPartStrings"
import Listanoticias from './components/Listanoticias'
import "@pnp/sp";
import "@pnp/sp/webs";



export interface IListanoticiasWebPartProps {
  description: string;
  tipoVista: Vista;
}

// pane config
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane"

export default class ListanoticiasWebPart extends BaseClientSideWebPart<IListanoticiasWebPartProps> {
  private _isDarkTheme: boolean = false
  private _environmentMessage: string = ""

  private async _getListData(): Promise<ISPLists> {
    // const _sp = getSP(this.context);
    
    // console.log(_sp.web.lists())
    // const listuri = '/sites/Hiberusintrane/Lists/Noticias';

    // const items = _sp.web.lists.getByTitle('Documents')()
    // si que me muestra los datos de la lista noticias pero es la que esta creada en el comunication site y no en hiberus intranet



    // const allItems: any[] = await _sp.web.lists.getByTitle("Noticias").items.getAll();
    // console.log(allItems);
   
   
    return
    
    
  }

  public render(): void {
    const { description, tipoVista = Vista.list } = this.properties
    // console.log(tipoVista)
    const element: React.ReactElement<IListanoticiasProps> = React.createElement(
      Listanoticias,
    

    {
      isDarkTheme: this._isDarkTheme,
      environmentMessage: this._environmentMessage,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      listGuid: "fd1def9c-5a81-460b-aae2-1cd9aa067b52",
      description,
      tipoVista,
    }
    )
    ReactDom.render(element, this.domElement) 
  }


 
  public async onInit(): Promise<void> {
    
  
    this._environmentMessage = ""
    getSP(this.context)
    await this._getListData()
    return super.onInit()
  }
 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneDropdown("tipoVista", {
                  label: "Display mode:",
                  disabled: false,
                  options: [
                    { key: Vista.list, text: "Lista" },
                    { key: Vista.card, text: "Tarjeta" },
                  ],selectedKey: Vista.list,
                }),
              ],
            },
          ],
        },
      ],
    }
  }

  
}
