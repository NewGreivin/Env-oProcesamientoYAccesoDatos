//SERVER_NAME="Servidor de envio y procesamiento de datos"
//SERVER_VERSION="1.0.0"
//SERVER_DESCRIPTION="Servidor para recibir y enviar datos"
//SERVER_PORT=4000

//Este es el .env que se encuetra dentro de backend. 

//Comandos usados para crear: 
    //npm install express
    //npm install dotenv
    //npm install cors
    //npm install -D nodemon

    //npm install morgan

        //Correr: 
            //npm start


    //.gitignore
        //node_modules/
        //.env


import "dotenv/config"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)" 
import express from "express";
import cors from "cors"; //Instalacion de cors para que front-end pueda acceder a la API

import parqueoRoutes from "./routes/parqueo.routes.js"; //Importacion de las rutas de la API

const { NAME, VERSION, DESCRIPTION, AUTHOR } = process.env;

const app = express();
app.use(cors()); //Permite que otros origenes puedan acceder a la API (Integracion de cors necesaria)
app.use(express.json()); //Permite que el front-end pueda enviar datos en formato JSON (Integracion de cors necesaria)

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
 res.json({ //Devuelve un objeto JSON, para que el front-end pueda leer la respuesta y mostrarla
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    author: AUTHOR,
 })
});

app.use("/api/parqueo", parqueoRoutes); //Se utiliza la ruta de la API para acceder a las rutas de la API, se llama a la función parqueoRoutes que se encuentra en el archivo parqueo.routes.js, para que el front-end pueda acceder a las rutas de la API

//PARA POSTMAN {"placa": "123","tipo": "carro", "horas":3, "minutos":6}

app.listen(PORT, () => {
  console.log(`${NAME} ejecutándose en http://localhost:${PORT}`
  );
});