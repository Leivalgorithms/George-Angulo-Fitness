import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Obtener todas las sucursales con sus horarios y tarifas
app.get('/sucursales', async (req, res) => {
    try {
        // Obtener todas las sucursales
        const sucursalesResult = await pool.query('SELECT * FROM sucursales');

        // Para cada sucursal, traer horarios y tarifas
        const sedes = await Promise.all(
            sucursalesResult.rows.map(async (sucursal) => {
                // Obtener horarios
                const horariosResult = await pool.query(
                    'SELECT dia, hora FROM horarios WHERE sucursal_id = $1',
                    [sucursal.id]
                );

                // Obtener tarifas
                const tarifasResult = await pool.query(
                    'SELECT tipo, descripcion, monto, moneda FROM tarifas WHERE sucursal_id = $1',
                    [sucursal.id]
                );

                return {
                    ...sucursal,
                    horarios: horariosResult.rows,
                    tarifas: tarifasResult.rows,
                };
            })
        );

        res.json(sedes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la base de datos');
    }
});

// Obtener una sucursal por nombre con horarios y tarifas
app.get('/sucursales/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        // Traer sucursal
        const sucursalResult = await pool.query(
            'SELECT * FROM sucursales WHERE nombre = $1',
            [decodeURIComponent(nombre)]
        );

        if (sucursalResult.rows.length === 0) {
            return res.status(404).json(null);
        }

        const sucursal = sucursalResult.rows[0];

        // Traer horarios
        const horariosResult = await pool.query(
            'SELECT dia, hora FROM horarios WHERE sucursal_id = $1',
            [sucursal.id]
        );

        // Traer tarifas
        const tarifasResult = await pool.query(
            'SELECT tipo, descripcion, monto, moneda FROM tarifas WHERE sucursal_id = $1',
            [sucursal.id]
        );

        // Armar objeto
        const respuesta = {
            ...sucursal,
            horarios: horariosResult.rows,
            tarifas: tarifasResult.rows,
        };

        res.json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la base de datos');
    }
});

// Obtener ubicaciones para el mapa (tabla mapa sin cambios)
app.get('/mapa', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mapa');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la base de datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});