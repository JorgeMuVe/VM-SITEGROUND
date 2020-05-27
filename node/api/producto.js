'use strict';
const gestorProducto = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  A G R E G A R   P R O D U C T O  *******************/
gestorProducto.post('/agregar', async (solicitud, respuesta) => {
    try {

        const {idNegocio,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto} = solicitud.body;

        await proveedorDeDatos.query(`
        INSERT INTO producto (idNegocio, idTipoProducto, tipoUnidad, nombreProducto, 
        detalleProducto, precioPorUnidad, unidadCantidad, descuentoUnidad, imagenProducto)
        VALUES(?,?,?,?,?,?,?,?,?);`, // Consulta a procedimiento almacenado

        [ idNegocio,idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  E D I T A R   P R O D U C T O  *******************/
gestorProducto.post('/editar', async (solicitud, respuesta) => {
    try {

        const {idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto,idProducto} = solicitud.body;

        await proveedorDeDatos.query(`
        UPDATE producto SET idTipoProducto = ?,tipoUnidad = ?,nombreProducto = ?,detalleProducto = ?,
        precioPorUnidad = ?,unidadCantidad = ?,descuentoUnidad = ?,imagenProducto = ? WHERE idProducto = ?`, // Consulta a procedimiento almacenado

        [ idTipoProducto,tipoUnidad,nombreProducto,detalleProducto,
            precioPorUnidad,unidadCantidad,descuentoUnidad,imagenProducto,idProducto ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  B U S C A R   P R O D U C T O  *******************/
gestorProducto.post('/buscar', async (solicitud, respuesta) => {
    try {

        const {tipo,texto,inicio,cantidad} = solicitud.body;

        await proveedorDeDatos.query(`
        SELECT COUNT(*) as cantidadProductos
        FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto AND tp.nombreTipoProducto LIKE ?
        INNER JOIN negocio n ON p.idNegocio = n.idNegocio 
        WHERE p.nombreProducto LIKE ? OR tp.nombreTipoProducto LIKE ?;`, // Consulta a procedimiento almacenado
        
        [ "%"+(tipo==="TODO"?"%":tipo)+"%",  "%"+(texto||"%")+"%"  , "%"+(texto||"%")+"%" ] ,

        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad) respuesta.json({ error : ("Cantidad >> "+errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else{
                proveedorDeDatos.query(`
                SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.imagenProducto,tp.imagenTipoProducto,
                p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,n.nombreNegocio,p.idProducto,n.idNegocio
                FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto AND tp.nombreTipoProducto LIKE ?
                INNER JOIN negocio n ON p.idNegocio = n.idNegocio 
                WHERE p.nombreProducto LIKE ? OR tp.nombreTipoProducto LIKE ? LIMIT ?,?;`, // Consulta a procedimiento almacenado
                
                [ "%"+(tipo==="TODO"?"%":tipo)+"%",  "%"+(texto||"%")+"%"  , "%"+(texto||"%")+"%", inicio, cantidad ] ,

                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda) respuesta.json({ error : ("Busqueda >> "+errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else {
                        var resultado = {
                            cantidadProductos:resultadoCantidad[0].cantidadProductos,
                            listaProductos:resultadoBusqueda
                        }
                        respuesta.send(resultado); // Enviar resultado de consulta en JSON
                    }
                });
            }
        });

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/************  L I S T A R  P R O D U C T O  N E G O C I O  ***************/
gestorProducto.post('/lista/negocio', async (solicitud, respuesta) => {
    try {
        const {codigoUsuario, inicio, cantidad} = solicitud.body;

        await proveedorDeDatos.query(`
        SELECT COUNT(*) AS cantidadProductos FROM producto WHERE idNegocio = ?;`, // Consulta a procedimiento almacenado
        [ codigoUsuario ] ,
        (errorCantidad, resultadoCantidad) => {
            if (errorCantidad)respuesta.json({ error : (errorCantidad.sqlMessage + " - " + errorCantidad.sql) }); // Enviar error en JSON
            else {
                proveedorDeDatos.query(`
                SELECT tp.nombreTipoProducto,p.nombreProducto,p.detalleProducto,p.imagenProducto,tp.imagenTipoProducto,
                p.precioPorUnidad,p.unidadCantidad,p.tipoUnidad,p.descuentoUnidad,p.idProducto,tp.idTipoProducto 
                FROM producto p INNER JOIN tipoProducto tp ON p.idTipoProducto = tp.idTipoProducto
                WHERE p.idNegocio = ? LIMIT ?,?;`, // Consulta a procedimiento almacenado
                [ codigoUsuario, inicio, cantidad ] ,
                (errorBusqueda, resultadoBusqueda) => {
                    if (errorBusqueda)respuesta.json({ error : (errorBusqueda.sqlMessage + " - " + errorBusqueda.sql) }); // Enviar error en JSON
                    else{
                        var resultado = {
                            cantidadProductos:resultadoCantidad[0].cantidadProductos,
                            listaProductos:resultadoBusqueda
                        }
                        respuesta.send(resultado); // Enviar resultado de consulta en JSON
                    }
                })
            }
        })
        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/************  T I P O   P R O D U C T O  ***************/
gestorProducto.get('/lista/tipo', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`SELECT * FROM tipoProducto;`, // Consulta a procedimiento almacenado
        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/************  U N I D A D   P R O D U C T O  ***************/
gestorProducto.get('/lista/unidad', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`SELECT * FROM tipoUnidad;`, // Consulta a procedimiento almacenado
        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorProducto;


