<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Venta.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Venta
  $venta = new Venta($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));
  
  $venta->idNegocio = $data->idNegocio;
  $venta->idPedido = $data->idPedido;

  // Agregar Usuario
  $result = $venta->agregarVenta();

  // Get row count
  $num = $result->rowCount();

  // Verificar Respuesta
  if($num > 0){
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
      extract($row);
      echo json_encode($row);
    }
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }