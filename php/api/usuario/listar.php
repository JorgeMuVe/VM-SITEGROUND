<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    
    include_once '../../config/Database.php';
    include_once '../../models/Usuario.php';

    // Instantiante DB y Connect
    $database = new Database();
    $db = $database->connect();

    // Instantiante blog Usuario object
    $usuario = new Usuario($db);

    // Blog Usuario Query
    $result = $usuario->listarUsuarios();

    // Get row count
    $num = $result->rowCount();
    if($num > 0){
        $usuarios_arr = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($usuarios_arr,$row);
        }
        echo json_encode($usuarios_arr);
    } else { echo json_encode(array('error'=>'Sin registro de Usuarios!.')); }
?>