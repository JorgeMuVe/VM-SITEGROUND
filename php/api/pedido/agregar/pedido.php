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

  // Instantiate Producto
  $pedido = new Pedido($db);

  // Get raw data
  $data = json_decode(file_get_contents("php://input"));

  $pedido->tipoUsuario = $data->tipoUsuario;
  $pedido->codigoUsuario = $data->codigoUsuario;
  $pedido->idDireccion = $data->idDireccion;
  $pedido->telefonoReferencia = $data->telefonoReferencia;
  $pedido->correoReferencia = $data->correoReferencia;
  $pedido->totalProductos = $data->totalProductos;
  $pedido->totalPagar = $data->totalPagar;
  $pedido->fechaRegistro = $data->fechaRegistro;
  $pedido->estadoPedido = $data->estadoPedido;

  // Buscar Usuario
  $result = $pedido->agregarPedido();

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
