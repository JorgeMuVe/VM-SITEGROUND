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

  $direccion->codigoUsuario = $data->codigoUsuario;

  // Buscar Usuario
  $result = $direccion->listarDirecciones();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    $direcciones_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
      extract($row);
      array_push($direcciones_arr,$row);
    }
    echo json_encode($direcciones_arr);
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
