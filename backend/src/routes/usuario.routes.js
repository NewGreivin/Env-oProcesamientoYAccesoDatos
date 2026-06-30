import { Router } from "express"; //Importacion de la librería express para crear rutas en el servidor
import { agregarUsuario, obtenerUsuarios, obtenerUsuarioPorId, modificarUsuario, eliminarUsuario, loginUsuario } 
from "../controllers/usuario.controller.js";

const router = Router();

// Ruta para registrar un usuario
router.post("/agregar", agregarUsuario); //Se crea la ruta POST para agregar usuarios, se llama a la función agregarUsuario del controlador usuario.controller.js

// Ruta para obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Ruta para obtener un usuario específico mediante su ID
router.get("/:id", obtenerUsuarioPorId);

// Ruta para actualizar un usuario por su ID
router.put("/:id", modificarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", eliminarUsuario);

// Ruta para iniciar sesión de usuario
router.post("/login", loginUsuario);

export default router;


//Para probar las rutas de la API
//Crear usuario (POST): http://localhost:4000/api/usuarios/agregar
//Body JSON: {"nombre": "Juan", "correo": "juan@gmail.com", "contrasena": "Password123", "confirmacion": "Password123"}

//Buscar todos (GET): http://localhost:4000/api/usuarios

//Buscar por ID (GET): http://localhost:4000/api/usuarios/1

//Modificar (PUT): http://localhost:4000/api/usuarios/1
//Body JSON: {"nombre": "Juan Modificado", "correo": "juan.nuevo@gmail.com", "contrasena": "NewPass123"}

//Eliminar (DELETE): http://localhost:4000/api/usuarios/1