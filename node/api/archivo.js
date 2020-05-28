'use strict';
const gestorArchivo = require('express').Router();
const multer = require('multer');
var fs = require('fs');

const guardarImagenProducto = multer.diskStorage({
    destination : function(req,file,cb){
        //cb(null,'E:\\PROYECTOS\\VM\\VM-DESARROLLO\\aplicacion\\public\\img\\productos\\');

        cb(null,'/home/software/Documentos/Proyectos/VM/VM-DESARROLLO/aplicacion/public/img/productos');        
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){cb(null,true) }
    else{ cb(null,false) }
};

const upload = multer({storage:guardarImagenProducto})//},limits:{ fileSize: 1024 * 1024 * 5 }, fileFilter:fileFilter});

gestorArchivo.delete('/eliminar', async (req,res) => {
    const { url } = req.body;
    try{
        const urlBusqueda = "D:\\PROYECTOS\\VM\\VM-DESAROLLO\\aplicacion\\public\\img\\" + url;
        fs.unlinkSync(urlBusqueda);
    } catch (e) {
        console.error(e.code);
    }
});

gestorArchivo.post('/guardar',upload.single('fileMedia'),async(req,res,next) =>{
    res.json(req.file);
});

module.exports = gestorArchivo;

