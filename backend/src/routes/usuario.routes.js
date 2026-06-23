import { Router } from "express"; //Importacion de la librería express para crear rutas en el servidor
import { agregarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/agregar", agregarUsuario); //Se crea la ruta POST para agregar usuarios, se llama a la función agregarUsuario del controlador usuario.controller.js

export default router;