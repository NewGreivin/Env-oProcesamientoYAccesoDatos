import pool from "../config/db.js"; // Importación correcta del pool desde config

// 1. Agregar usuario (Modificado para ejecutar sentencias SQL)
export async function agregarUsuario(req, res) {
  const { nombre, correo, contrasena, confirmacion } = req.body;

  // --- Validaciones de negocio ---
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
  if (!correo || !emailRegex.test(correo)) {
    return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Expresión regular para validar la contraseña
  if (!contrasena || !passwordRegex.test(contrasena)) {
    return res.status(400).json({
      error: "La contraseña debe tener 8 caracteres, e incluir mayúsculas, minúsculas y números.",
    });
  }

  if (contrasena !== confirmacion) {
    return res.status(400).json({ error: "La contraseña y la confirmación no coinciden." });
  }

  // Inserción en la base de datos
  try {
    const [result] = await pool.execute(
      `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`,
      [nombre, correo, contrasena]
    );

    // Retornar los datos insertados (utilizando result.insertId) y el mensaje de éxito
    return res.status(201).json({
      id: result.insertId,
      nombre,
      correo,
      mensaje: "Usuario registrado correctamente"
    });
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor al registrar el usuario: " + error.message });
  }
}

// 2. Obtener todos los usuarios
export async function obtenerUsuarios(req, res) {
  try {
    const [rows] = await pool.execute("SELECT id, nombre, correo FROM usuarios");
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los usuarios: " + error.message });
  }
}

// 3. Obtener un usuario por ID
export async function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT id, nombre, correo FROM usuarios WHERE id = ?", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el usuario: " + error.message });
  }
}

// 4. Modificar un usuario
export async function modificarUsuario(req, res) {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: "Todos los campos (nombre, correo, contrasena) son requeridos para actualizar." });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?",
      [nombre, correo, contrasena, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado para actualizar" });
    }

    return res.status(200).json({
      id,
      nombre,
      correo,
      mensaje: "Usuario modificado correctamente"
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al modificar el usuario: " + error.message });
  }
}

// 5. Eliminar un usuario
export async function eliminarUsuario(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM usuarios WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
    }

    return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el usuario: " + error.message });
  }
}