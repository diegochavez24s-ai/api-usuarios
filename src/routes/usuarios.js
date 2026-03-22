const express = require('express');
const router = express.Router();
const { obtenerUsuarios, obtenerUsuarioPorId, insertarUsuario, actualizarUsuario, actualizarParcialUsuario, eliminarUsuario } = require('../controller/usuariosController');

router.get('/obtener', obtenerUsuarios);
router.get('/obtenerid/:id', obtenerUsuarioPorId);
router.post('/insertar', insertarUsuario);
router.put('/actualizar/:id', actualizarUsuario);
router.patch('/actparcial/:id', actualizarParcialUsuario);
router.delete('/eliminar/:id', eliminarUsuario);

module.exports = router;