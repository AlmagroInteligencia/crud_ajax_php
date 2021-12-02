<?php

    include('database.php');

    $id = $_POST['id'];
    $sql = "SELECT * FROM tareas WHERE id = $id";
    $result = mysqli_query($connection, $sql);
    if(!$result){
        die("No pibe, mandaste cualquiera en la consulta ".mysqli_error($connection));
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion']
        );
    }
    $jsonArmado = json_encode($json[0]);
    echo $jsonArmado;

    
?>