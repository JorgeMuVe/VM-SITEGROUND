'use strict';
const gestorPedido = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P E D I  D O  *******************/
gestorPedido.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { tipoUsuario,codigoUsuario,idDireccion,telefonoReferencia,correoReferencia,
            totalProductos,totalPagar,fechaRegistro,estadoPedido } = solicitud.body;

        await proveedorDeDatos.query(`CALL agregarPedido(?,?,?,?,?,?,?,?,?);`,

        [ tipoUsuario,codigoUsuario,idDireccion,telefonoReferencia,correoReferencia,
            totalProductos,totalPagar,fechaRegistro,estadoPedido] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/********  A G R E G A R   P E D I  D O   D E T A L L E  *************/
gestorPedido.post('/agregar/detalle', async (solicitud, respuesta) => {
    try {

        const { idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad } = solicitud.body;

        await proveedorDeDatos.query(`
            INSERT INTO pedidoDetalle(idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad)
            VALUES (? , ? , ? , ? , ?);`,

        [ idPedido,idNegocio,idProducto,cantidadProducto,precioPorUnidad ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/**********  L I S T A R   P E D I D O   C L I E N T E  *********/
gestorPedido.post('/lista/cliente', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario,inicio,cantidad } = solicitud.body;
        await proveedorDeDatos.query(`SELECT COUNT(*) AS cantidadPedidos FROM pedido WHERE tipoUsuario='cliente' AND codigoUsuario = ?`,
        [ codigoUsuario ],

        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad) respuesta.json({ error : (errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else {
                proveedorDeDatos.query(`SELECT * FROM pedido WHERE codigoUsuario = ? AND tipoUsuario='cliente' LIMIT ?,?;`,
                [ codigoUsuario,inicio,cantidad ] ,
                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda) respuesta.json({ error : (errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else {
                        var resultado = {
                            cantidadPedidos:resultadoCantidad[0].cantidadPedidos,
                            listaPedidos:resultadoBusqueda
                        }
                        respuesta.send(resultado); // Enviar resultado de consulta en JSON
                    }
                })
            }
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/**********  L I S T A R   P E D I D O   N E G O C I O  *********/
gestorPedido.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const { codigoUsuario, inicio, cantidad } = solicitud.body;
        await proveedorDeDatos.query(`SELECT COUNT(*) AS cantidadPedidos FROM venta WHERE idNegocio = ?; `,[ codigoUsuario ],
        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad) respuesta.json({ error : (errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else {
                proveedorDeDatos.query(`CALL listarPedidoNegocio(?,?,?)`,[ codigoUsuario, inicio, cantidad ],
                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda) respuesta.json({ error : (errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else{
                        var resultado = {
                            cantidadPedidos:resultadoCantidad[0].cantidadPedidos,
                            listaPedidos:resultadoBusqueda[0]
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

