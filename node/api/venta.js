'use strict';
const gestorPedido = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P E D I  D O  *******************/
gestorPedido.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { idNegocio,idPedido } = solicitud.body;

        await proveedorDeDatos.query(`INSERT INTO venta(idNegocio,idPedido) VALUES (?,?);`,

        [ idNegocio,idPedido ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/**********  L I S T A R   P E D I D O   N E G O C I O  *********/
gestorPedido.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario, inicio, cantidad } = solicitud.body;
        await proveedorDeDatos.query(`SELECT COUNT(*) AS cantidadVentas FROM venta WHERE idNegocio = ?; `,[ codigoUsuario ],
        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad) respuesta.json({ error : (errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else {
                proveedorDeDatos.query(`CALL listarPedidoNegocio(?,?,?)`,[ codigoUsuario, inicio, cantidad ],
                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda) respuesta.json({ error : (errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else{
                        var resultado = {
                            cantidadVentas:resultadoCantidad[0].cantidadVentas,
                            listaVentas:resultadoBusqueda[0]
                        }
                        respuesta.send(resultado); // Enviar resultado de consulta en JSON
                    }
                })
            }
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorPedido;

