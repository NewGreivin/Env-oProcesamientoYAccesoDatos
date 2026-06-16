import "dotenv/config"; //Si la ruta del .env en otro .env, "dotenv/config(.env.development)" 
import express from "express";

const { NAME, VERSION, DESCRIPTION, AUTHOR } = process.env;

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
 res.json({
    name: NAME,
    version: VERSION,
    description: DESCRIPTION,
    author: AUTHOR,
 })
});

app.listen(PORT, () => {
  console.log(`${process.env.NAME} ejecutándose en http://localhost:${PORT}`
  );
});