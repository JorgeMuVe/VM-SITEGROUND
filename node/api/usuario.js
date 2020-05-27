'use strict';
const gestorUsuario = require('express').Router();
const proveedorDeDatos = require('../db/conexiondb');

/***************  I N G R E S A R   S I  S T E M A   *******************/
gestorUsuario.post('/ingresar', async (solicitud, respuesta) => {
    try {

        const { nombreUsuario,contrasena,tipoUsuario } = solicitud.body;

        await proveedorDeDatos.query(`CALL ingresarSistema(?,?,?);`,

        [ nombreUsuario,contrasena,tipoUsuario ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado[0]); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  R  E  G  I  S  T  R  A  R    U  S  U  A  R  I  O  *******************/
gestorUsuario.post('/agregar', async (solicitud, respuesta) => {
    try {

        const { registroNacional,nombreCompleto,apellidoPaterno,apellidoMaterno,nombreUsuario,contrasena,tipoUsuario } = solicitud.body;

        await proveedorDeDatos.query(`CALL agregarUsuario(?,?,?,?,?,?,?);`,

        [ registroNacional,nombreCompleto,apellidoPaterno,apellidoMaterno,nombreUsuario,contrasena,tipoUsuario ] ,

        (error, resultado) => {
            if (error)
            respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else
            respuesta.send(resultado[0]); // Enviar resultado de consulta en JSON
        })

        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

/***************  B U S C A R    U S U A R I O   C L I E N T E   *******************/
gestorUsuario.get('/buscar/cliente/:codigoUsuario', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`CALL buscarUsuarioCliente(?)`,[ solicitud.params.codigoUsuario] ,
        (error, resultado) => {
            if (error) respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else respuesta.send(resultado[0]); // Enviar resultado de consulta en JSON
        })
        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});


/***************  B U S C A R    U S U A R I O   N E G O C I O   *******************/
gestorUsuario.get('/buscar/negocio/:codigoUsuario', async (solicitud, respuesta) => {
    try {
        await proveedorDeDatos.query(`CALL buscarUsuarioNegocio(?)`,[ solicitud.params.codigoUsuario] ,
        (error, resultado) => {
            if (error) respuesta.json({ error : (error.sqlMessage + " - " + error.sql) }); // Enviar error en JSON
            else respuesta.send(resultado[0]); // Enviar resultado de consulta en JSON
        })
        proveedorDeDatos.release();
    }catch(error){ respuesta.json({ error : error.code }) }  // Enviar error en JSON
});

module.exports = gestorUsuario;

