'use strict';
const gestorDireccion = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/**********  L I S T A R   D I R E C C I O N   C L I E N T E   *********/
gestorDireccion.post('/lista', async (solicitud, respuesta) => {
    try {

        const { codigoUsuario,inicio,cantidad } = solicitud.body;
        await proveedorDeDatos.query(`SELECT COUNT(*) AS cantidadDirecciones FROM direccion d WHERE d.idCliente = ?`,
        [ codigoUsuario ],

        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad) respuesta.json({ error : (errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else {
                proveedorDeDatos.query(`SELECT d.* FROM direccion d WHERE d.idCliente = ? LIMIT ?,?;`,
                [ codigoUsuario,inicio,cantidad ] ,
                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda) respuesta.json({ error : (errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else {
                        var resultado = {
                            cantidadDirecciones:resultadoCantidad[0].cantidadDirecciones,
                            listaDirecciones:resultadoBusqueda
                        }
                        respuesta.send(resultado); // Enviar resultado de consulta en JSON
                    }
                })
            }
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});


/***************  A G R E G A R   D I R E C C I O N  *******************/
gestorDireccion.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { idCliente,denominacionDireccion,referenciaDireccion,lat,lng } = solicitud.body;

        await proveedorDeDatos.query(`CALL agregarDireccion(?,?,?,?,?)`,

        [ idCliente,denominacionDireccion,referenciaDireccion,lat,lng ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  E D I T A R   D I R E C C I O N  *******************/
gestorDireccion.post('/editar', async (solicitud, respuesta) => {
    try {

        const { idCliente,denominacionDireccion,referenciaDireccion,lat,lng,idDireccion } = solicitud.body;

        await proveedorDeDatos.query(`
        UPDATE direccion SET idCliente = ?, denominacionDireccion = ?, referenciaDireccion = ?,
        lat = ?, lng = ? WHERE idDireccion = ?
        `, [ idCliente,denominacionDireccion,referenciaDireccion,lat,lng,idDireccion ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorDireccion;

