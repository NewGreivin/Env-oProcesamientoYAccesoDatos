import pool from "./config/db.js";

export function agregarUsuario(req, res) {
  const { nombre, correo, contrasena, confirmacion } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      error: "El nombre es obligatorio.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
  if (!correo || !emailRegex.test(correo)) {
    return res.status(400).json({
      error: "El formato del correo electrónico no es válido.",
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Expresión regular para validar la contraseña
  if (!contrasena || !passwordRegex.test(contrasena)) {
    return res.status(400).json({
      error: "La contraseña debe tener 8 caracteres, e incluir mayúsculas, minúsculas y números.",
    });
  }

  if (contrasena !== confirmacion) {
    return res.status(400).json({
      error: "La contraseña y la confirmación no coinciden.",
    });
  }

  return res.status(200).json({
    mensaje: "Usuario agregado correctamente",
  });
}