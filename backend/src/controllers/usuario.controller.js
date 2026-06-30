




import pool from "../config/db.js";
import bcrypt from "bcrypt";

// 1. Agregar usuario
export async function agregarUsuario(req, res) {
  const { nombre, correo, contrasena, confirmacion } = req.body;
  if (!nombre || nombre.trim() === "") return res.status(400).json({ error: "El nombre es obligatorio." });
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || !emailRegex.test(correo)) return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!contrasena || !passwordRegex.test(contrasena)) {
    return res.status(400).json({ error: "La contraseña debe tener 8 caracteres, incluir mayúsculas, minúsculas y números." });
  }
  if (contrasena !== confirmacion) return res.status(400).json({ error: "La contraseña y la confirmación no coinciden." });

  try {
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.execute(
      `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`,
      [nombre, correo, contrasenaEncriptada]
    );
    return res.status(201).json({ id: result.insertId, nombre, correo, mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 2. Obtener todos los usuarios
export async function obtenerUsuarios(req, res) {
  try {
    const [rows] = await pool.execute("SELECT id, nombre, correo FROM usuarios");
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 3. Obtener un usuario por ID
export async function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT id, nombre, correo FROM usuarios WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 4. Modificar un usuario
export async function modificarUsuario(req, res) {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;
  if (!nombre || !correo || !contrasena) return res.status(400).json({ error: "Todos los campos son requeridos." });

  try {
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.execute(
      "UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?",
      [nombre, correo, contrasenaEncriptada, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.status(200).json({ id, nombre, correo, mensaje: "Usuario modificado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 5. Eliminar un usuario
export async function eliminarUsuario(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 6. Iniciar sesión / Login (Separado correctamente en líneas independientes)
export async function loginUsuario(req, res) {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "El correo y la contraseña son obligatorios." });
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas (correo o contraseña inválidos)." });
    }

    const usuario = rows[0];
    const coinciden = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!coinciden) {
      return res.status(401).json({ error: "Credenciales incorrectas (correo o contraseña inválidos)." });
    }

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });

  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor: " + error.message });
  }
}