<?php
  $response = array();
  if(file_exists('C:\\xampp\htdocs\\data\\imagenes\\'.$_POST["nombreImagen"])) { 
    unlink('C:\\xampp\htdocs\\data\\imagenes\\'.$_POST["nombreImagen"]);
    $response["MESSAGE"] = "FILE DELETED";
    $response["STATUS"] = "200";
  }else {
    $response["MESSAGE"] = "ERROR DELETING";
    $response["STATUS"] = "404";
  }
  echo json_encode($response);
?>
