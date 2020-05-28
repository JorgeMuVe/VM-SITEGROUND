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

  $producto->idTipoProducto = $data->idTipoProducto;
  $producto->tipoUnidad = $data->tipoUnidad;
  $producto->nombreProducto = $data->nombreProducto;
  $producto->detalleProducto = $data->detalleProducto;
  $producto->precioPorUnidad = $data->precioPorUnidad;
  $producto->unidadCantidad = $data->unidadCantidad;
  $producto->descuentoUnidad = $data->descuentoUnidad;
  $producto->imagenProducto = $data->imagenProducto;
  $producto->idProducto = $data->idProducto;

  // Buscar Usuario
  $result = $producto->editarProducto();

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
