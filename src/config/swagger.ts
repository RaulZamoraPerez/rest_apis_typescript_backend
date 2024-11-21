import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
      openapi: "3.0.2", 
      tags: [
        {
            name: 'Products',
            description: 'API operations related to products'
        } 
      ],
      info:{
          title: 'REST API Node.js / Express / Typescript ',
          version: '1.0.0',
          description: "API Docs for Products"
      }

    },
    apis :['./src/router.ts']// es donde va a encontrar los endpoints que vas a documentar
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
  customCss :  `
    .topbar-wrapper .link {
        content: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxmzLgFAdpqMcl8H1nnd64oM_uOBj1_tDMg&s');
        height: 80px;
        width: auto;

    }
    .swagger-ui .topbar {
        background-color: #2d3b45;
      }
  `,
  customSiteTitle: 'Documentacion REST API Express / Typescript'
}

export default swaggerSpec;

export{
  swaggerUiOptions
}