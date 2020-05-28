<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Direccion.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Producto
  $direccion = new Direccion($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));

  $direccion->idCliente = $data->idCliente;
  $direccion->denominacionDireccion = $data->denominacionDireccion;
  $direccion->referenciaDireccion = $data->referenciaDireccion;
  $direccion->lat = $data->lat;
  $direccion->lng = $data->lng;
  $direccion->idDireccion = $data->idDireccion;

  // Buscar Usuario
  $result = $direccion->editarDireccion();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        echo json_encode($row);
    }
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
