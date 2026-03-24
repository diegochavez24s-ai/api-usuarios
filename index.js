const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const usuariosRoutes = require('./src/routes/usuarios');
const empleadosRoutes = require('./src/routes/empleados');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/empleados', empleadosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});