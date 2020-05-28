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

  $producto->tipo = $data->tipo;
  $producto->texto = $data->texto;
  $producto->inicio = $data->inicio;
  $producto->cantidad = $data->cantidad;

  // Buscar Usuario
  $result = $producto->buscarProducto();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    $productos_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($productos_arr,$row);
    }
    echo json_encode($productos_arr);
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
