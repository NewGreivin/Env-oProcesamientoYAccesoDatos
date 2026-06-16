import "dotenv/config"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)" 
import express from "express";
import cors from "cors"; //Instalacion de cors para que front-end pueda acceder a la API

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

app.post("/api/parqueo/calcular", (req, res) => {
 const { placa, tipo, horas, minutos } = req.body; //Se desfragmenta el objeto JSON que se recibe del front-end, para obtener los valores de PLACA, TIPO, HORA y MINUTO

//Validaciones para verificar que los valores esten llenos
 if (!placa || placa.trim() === "") { //Si la placa no se encuentra, se devuelve un error 400
    return res.status(400).json({ //Si alguno de los valores no se encuentra, se devuelve un error 400
        error: "Falta la placa",
    });
 }

 if (!tipo || (tipo !== "carro" && tipo !== "moto")) { //Si el tipo no se encuentra, se devuelve un error 400
    return res.status(400).json({ //Si alguno de los valores no se encuentra, se devuelve un error 400
        error: "Falta el dato del tipo o el tipo no es valido debe de ser (carro o moto)",
    });
 }

 if (Number.isNaN(horas) || horas < 0 || horas > 24) { //Si las horas no se encuentran, se devuelve un error 400
    return res.status(400).json({ //Si alguno de los valores no se encuentra, se devuelve un error 400
        error: "Falta la hora o la cantidad de horas no es valida rango entre (0 y 24)",
    });
 }

 if (Number.isNaN(minutos) || minutos < 0 || minutos > 59) { //Si los minutos no se encuentran, se devuelve un error 400
    return res.status(400).json({ //Si alguno de los valores no se encuentra, se devuelve un error 400
        error: "Falta los minutos o los minutos no son validos rango entre (0 y 59)",
    });
 }

const tarifa = tipo === "carro" ? 1200 : 500; //Se calcula la tarifa del carro o del moto, dependiendo del tipo, si es moto se devuelve 500

 let h=Number(horas);
 let m=Number(minutos);

 if(m>5) h++;

 const total= h*tarifa;

 res.json({
    placa: placa,
    tipo: tipo,
    tarifa: tarifa,
    tiempoUso: `${horas}:${minutos}`,
    horasCobradas: h,
    total: total
 })
});


app.listen(PORT, () => {
  console.log(`${NAME} ejecutándose en http://localhost:${PORT}`
  );
});