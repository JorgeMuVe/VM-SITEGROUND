<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET');

  include_once '../../../config/Database.php';
  include_once '../../../models/Producto.php';


  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Producto
  $producto = new Producto($db);

  // Buscar Usuario
  $result = $producto->listarTipo();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    $tipos_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($tipos_arr,$row);
    }
    echo json_encode($tipos_arr);
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
