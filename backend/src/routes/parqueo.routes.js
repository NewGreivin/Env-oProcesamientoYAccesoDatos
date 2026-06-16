import { Router } from "express"; //Importacion de la librería express para crear rutas en el servidor
import { calcularCobro } from "../controllers/parqueo.controller.js";

const router = Router();

router.post("/calcular", calcularCobro); //Se crea la ruta POST para calcular el cobro del parqueo, se llama a la función calcularCobro del controlador parqueo.controller.js

export default router;