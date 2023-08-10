
import * as React from "react"


import { IListaNoticias } from "./IListaNoticas";
// import { Link } from 'react-router-dom';
require ('./TarjetaNoticias.module.scss')
// import './TarjetaNoticias.scss'

  import {
    makeStyles,
    shorthands,
    Button,
    Caption1,
    Body1,
    // Subtitle1,
  } from "@fluentui/react-components";

  import {
    MoreHorizontal20Filled,
    Open16Regular,
    Share16Regular,
  } from "@fluentui/react-icons";
  import {
    Card,
    CardHeader,
    CardFooter,
    CardPreview,
    // CardProps,
  } from "@fluentui/react-components";

  // import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";

  const useStyles = makeStyles({
    // main: {
    //   display: "flex",
    //   flexWrap: "wrap",
    //   // flexDirection: "column",
    //   columnGap: "16px",
    //   rowGap: "36px",
    //   backgroundColor: "rgba(255, 255, 255, 0)"
    // },
  
    title: {
      ...shorthands.margin(0, 0, "12px"),
    },
  
    description: {
      ...shorthands.margin(0, 0, "12px"),
    },
  
    card: {
      width: "300px",
      maxWidth: "100%",
      // height: "fit-content",
      marginTop:"2px"
      
    },
  
    text: {
      ...shorthands.margin(0),
    },
    img:{



    }
  });

  
  // const resolveAsset = (asset: string) => {
  //   const ASSET_URL =
  //     "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/";
  
  //   return `${ASSET_URL}${asset}`;
  // };
  
  
export default function TarjetaNoticias(props: IListaNoticias){

  // const styles = useStyles();

    const {Title, descripcion, imagen} = props;
    // const newImageObj: any = imagen;

    
      const styles = useStyles();
    
      return (
        <main className="main-container">
        <Card className={styles.card}>
          <CardPreview>
            <img
              src={imagen.toString()}
              alt="Sales Presentation Preview"
            />
          </CardPreview>
    
          <CardHeader
            
            header={
              <Body1>
                <b>{Title}</b>
              </Body1>
            }
            description={<Caption1></Caption1>}
            action={
              <Button
                appearance="transparent"
                icon={<MoreHorizontal20Filled />}
                aria-label="More options"
              />
            }
          />
    
          <p className={styles.text}>
            {descripcion}
          </p>
    
          <CardFooter>
            <a href={(imagen as any).Url}>
              <Button appearance="primary" icon={<Open16Regular />}>
                Open
              </Button>
            </a>
            <Button icon={<Share16Regular />}>Share</Button>
          </CardFooter>
        </Card>
        </main>
    
      )

    




}