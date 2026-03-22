const db = require('../models/connection');

const obtenerEmpleados = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM empleados");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al consultar empleados");
    }
};

const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM empleados WHERE id_empleado = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al buscar empleado");
    }
};

const insertarEmpleado = async (req, res) => {
    try {
        const { id_empleado, nombre, puesto, salario } = req.body;
        await db.query("INSERT INTO empleados (id_empleado, nombre, puesto, salario) VALUES ($1, $2, $3, $4)", [id_empleado, nombre, puesto, salario]);
        res.send("Empleado registrado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear empleado");
    }
};

const actualizarEmpleado = async (req, res) => {
    try {
        const { nombre, puesto, salario } = req.body;
        await db.query("UPDATE empleados SET nombre = $1, puesto = $2, salario = $3 WHERE id_empleado = $4", [nombre, puesto, salario, req.params.id]);
        res.send("Empleado actualizado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al modificar empleado");
    }
};

const actualizarParcialEmpleado = async (req, res) => {
    try {
        if (req.body.nombre) {
            await db.query("UPDATE empleados SET nombre = $1 WHERE id_empleado = $2", [req.body.nombre, req.params.id]);
        }
        if (req.body.puesto) {
            await db.query("UPDATE empleados SET puesto = $1 WHERE id_empleado = $2", [req.body.puesto, req.params.id]);
        }
        if (req.body.salario) {
            await db.query("UPDATE empleados SET salario = $1 WHERE id_empleado = $2", [req.body.salario, req.params.id]);
        }
        res.send("Empleado actualizado parcialmente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en actualización parcial");
    }
};

const eliminarEmpleado = async (req, res) => {
    try {
        await db.query("DELETE FROM empleados WHERE id_empleado = $1", [req.params.id]);
        res.send("Empleado eliminado");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar empleado");
    }
};
module.exports = { obtenerEmpleados, obtenerEmpleadoPorId, insertarEmpleado, actualizarEmpleado, actualizarParcialEmpleado, eliminarEmpleado };