const express = require('express'), aplicacion = express(); // INICIAR SERVIDOR EXPRESS
const cors = require('cors');
const PUERTO = process.env.PORT || 5000;

/* CORS para establecer la SEGURIDAD en la conexión y envio de los datos */
aplicacion.use(cors());
aplicacion.use(function(solicitud,respuesta,siguiente) {
    respuesta.header('Access-Control-Allow-Origin', '*');
    respuesta.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    respuesta.header('Access-Control-Allow-Headers', 'Content-Type');
    siguiente();
});

/* Estable que la comunicación de datos se generaliza al formato JSON */
aplicacion.use(express.urlencoded({ extended : false, limit : '10mb' }));
aplicacion.use(express.json({ limit : '10mb' }));

/* Sección de las rutas para publicar las API(s) */
aplicacion.use('/api/direccion', require('./api/direccion.js'));
aplicacion.use('/api/producto', require('./api/producto.js'));
aplicacion.use('/api/archivo', require('./api/archivo.js'));
aplicacion.use('/api/usuario', require('./api/usuario.js'));
aplicacion.use('/api/pedido', require('./api/pedido.js'));
aplicacion.use('/api/venta', require('./api/venta.js'));


// Encender el servidor Express/NODEJS - en el PUERTO previamente definido (5000)
aplicacion.listen(PUERTO, () => { console.log('Servidor escuchando en el Puerto : ' + PUERTO); });
