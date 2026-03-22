const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const usuariosRoutes = require('./src/routes/usuarios');
const empleadosRoutes = require('./src/routes/empleados');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/empleados', empleadosRoutes);

app.listen(3000, () => {
    console.log("Escuchando en puerto 3000");
});