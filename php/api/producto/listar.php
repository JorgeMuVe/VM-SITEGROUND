<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Producto.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Producto
  $producto = new Producto($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));

  $producto->tipoProducto = $data->tipoProducto;

  // Buscar Usuario
  $result = $producto->listarProductoPorTipo();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    $usuarios_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($usuarios_arr,$row);
    }
    echo json_encode($usuarios_arr);
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
