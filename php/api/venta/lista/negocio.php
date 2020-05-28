<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    
    include_once '../../config/Database.php';
    include_once '../../models/Venta.php';

    // Instantiante DB y Connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate Venta
    $venta = new Venta($db);

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));
    
    $venta->codigoUsuario = $data->codigoUsuario;
    $venta->inicio = $data->inicio;
    $venta->cantidad = $data->cantidad;


    // Blog Usuario Query
    $result = $venta->listaNegocio();

    // Get row count
    $num = $result->rowCount();
    if($num > 0){
        $ventas_arr = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($ventas_arr,$row);
        }
        echo json_encode($ventas_arr);
    } else { echo json_encode(array('error'=>'Sin registro de Usuarios!.')); }
?>