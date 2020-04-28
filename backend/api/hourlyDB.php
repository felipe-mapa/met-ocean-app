<?php
// headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = mysqli_query($con, "SELECT * FROM `hourly_data`");

if(mysqli_num_rows($data) > 0){
    $data = mysqli_fetch_all($data,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"data"=>$data]);
}
else{
    echo json_encode(["success"=>0]);
}
?>