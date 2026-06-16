import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send(`<p>Versión: Funcionando</p>`);
});

app.listen(PORT, () => {
  console.log(`${process.env.NAME} ejecutándose en http://localhost:${PORT}`
  );
});