import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export default pool; //Exportar el pool para que pueda ser utilizado en otros archivos del proyecto.