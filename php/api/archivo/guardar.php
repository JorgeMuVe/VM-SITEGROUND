<?php
  $response = array();
  if(is_uploaded_file($_FILES["user_image"]){ 
    $tmp_file = $_FILES["user_image"]["tmp_name"];
    $img_name = $_FILES["user_image"]["name"];
    $upload_dir = "./images/".$img_name;
    if(move_uploaded_file($tmp_file,$upload_dir)){
      $response["MESSAGE"] = "UPLOAD SUCCED";
      $response["STATUS"] = "200";
    } else { 
      $response["MESSAGE"] = "UPLOAD FAILED";
      $response["STATUS"] = "404"; 
    }
  }else {
    $response["MESSAGE"] = "INVALID REQUEST";$response["STATUS"] = "404";
  }
  echo json_encode($response);
?>
