<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
  
    include_once '../../../config/Database.php';
    include_once '../../../models/Venta.php';


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
    $respuesta = array();
    
    //Get row count
    $numCantidad = $result[0]->rowCount();
    if($numCantidad > 0){
        $cantidadVentas = $result[0]->fetch(PDO::FETCH_ASSOC);
        $numBusqueda = $result[1]->rowCount();
        if($numBusqueda > 0){
            $listaVentas = array();
            while($row = $result[1]->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                array_push($listaVentas,$row);
            }
            echo json_encode( array(
                'cantidadVentas'=>$cantidadVentas["cantidadVentas"],
                'listaVentas'=>$listaVentas
            ));
        } else { echo json_encode(array('error'=>'Sin registro de Ventas!.')); }
    } else { echo json_encode(array('error'=>'Sin registro de ventas!.')); }
?>