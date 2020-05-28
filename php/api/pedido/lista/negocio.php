<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Pedido.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate Pedido
  $pedido= new Pedido($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));

  $pedido->codigoUsuario = $data->codigoUsuario;
  $pedido->inicio = $data->inicio;
  $pedido->cantidad = $data->cantidad;

  // Buscar Usuario
  $result = $pedido->listarPedidosNegocio();

  // Get row count
  $num = $result->rowCount();
  if($num > 0){
    $pedidos_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($pedidos_arr,$row);
    }
    echo json_encode($pedidos_arr);
  }
  else { echo json_encode(array('error'=>'Sin respuesta')); }
?>
