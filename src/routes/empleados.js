const express = require('express');
const router = express.Router();
const { obtenerEmpleados, obtenerEmpleadoPorId, insertarEmpleado, actualizarEmpleado, actualizarParcialEmpleado, eliminarEmpleado } = require('../controller/empleado');

router.get('/obtener', obtenerEmpleados);
router.get('/obtenerid/:id', obtenerEmpleadoPorId);
router.post('/insertar', insertarEmpleado);
router.put('/actualizar/:id', actualizarEmpleado);
router.patch('/actparcial/:id', actualizarParcialEmpleado);
router.delete('/eliminar/:id', eliminarEmpleado);

module.exports = router;