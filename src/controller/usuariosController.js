const db = require('../models/connection');

const obtenerUsuarios = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al consultar usuarios");
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM usuarios WHERE id_usuarios = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al buscar usuario");
    }
};

const insertarUsuario = async (req, res) => {
    try {
        const { id_usuarios, nombre, contra } = req.body;
        await db.query("INSERT INTO usuarios (id_usuarios, nombre, contra) VALUES ($1, $2, $3)", [id_usuarios, nombre, contra]);
        res.send("Usuario registrado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear usuario");
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, contra } = req.body;
        await db.query("UPDATE usuarios SET nombre = $1, contra = $2 WHERE id_usuarios = $3", [nombre, contra, req.params.id]);
        res.send("Usuario actualizado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al modificar usuario");
    }
};

const actualizarParcialUsuario = async (req, res) => {
    try {
        if (req.body.nombre) {
            await db.query("UPDATE usuarios SET nombre = $1 WHERE id_usuarios = $2", [req.body.nombre, req.params.id]);
        }
        if (req.body.contra) {
            await db.query("UPDATE usuarios SET contra = $1 WHERE id_usuarios = $2", [req.body.contra, req.params.id]);
        }
        res.send("Usuario actualizado parcialmente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en actualización parcial");
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        await db.query("DELETE FROM usuarios WHERE id_usuarios = $1", [req.params.id]);
        res.send("Usuario eliminado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar usuario");
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { nombre, contra } = req.body;
        const result = await db.query(
            "SELECT * FROM usuarios WHERE nombre = $1 AND contra = $2",
            [nombre, contra]
        );
        if (result.rows.length > 0) {
            res.json({ success: true, usuario: result.rows[0] });
        } else {
            res.status(401).json({ success: false, mensaje: "Credenciales incorrectas" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al iniciar sesión");
    }
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, insertarUsuario, actualizarUsuario, actualizarParcialUsuario, eliminarUsuario, loginUsuario };