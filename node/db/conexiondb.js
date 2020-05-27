const mysql = require('mysql'); /* Librería de Conexión entre NODEJS y MariaDB/MySQL */
const promesas = require('util'); /* Librería para la gestión de PROMESAS(PROMISE) */
const { baseDeDatos } = require('./datosdb.js'); /* Datos de Conexión con el gestor de Base de Datos MariaDB/MySQL */
const db = mysql.createPool( baseDeDatos ); /* Crea un POOL de Conexiones al gestor de Base de Datos MariaDB/MySQL */

db.getConnection( (errorConexion, conexion) => { /* Crea el POOL de CONEXIONES y verifica posibles ERRORES */
    if (errorConexion){
        console.error('Error al Conectar con la Base de Datos...');
        /* Posibles ERRORES al momento de establecer CONEXIÓN con la Base de Datos MariaDB/MySQL */
        if (errorConexion.code === 'PROTOCOL_CONNECTION_LOST') { console.error('Conexión con Base de Datos Terminada.'); }
        if (errorConexion.code === 'ER_CON_COUNT_ERROR'){ console.error('Base de Datos tiene una o mas Conexiones.'); }
        if (errorConexion.code === 'ECONNREFUSED'){ console.error('Solicitud de Conexión Rechazada.'); }
        if (errorConexion.code === 'ER_BAD_DB_ERROR'){ console.error('No existe Base de Datos.'); }
    }

    if (conexion) {
        conexion.release(); /* CONEXIÓN ESTABLECIDA */
        console.log('Base de Datos Conectada!!!...');
    }
    return;
});
/* Agente de CONSULTAS(Queries) a la Base de Datos mediante PROMESAS */
db.query = promesas.promisify(db.query); 
/* Exportar el POOL de Conexiones al ENTORNO GLOBAL */
module.exports = db; 