<?php

    include('database.php');

    $search = $_POST['search'];

    if(!empty($search)) {
        $sql = "SELECT * FROM tareas WHERE nombre LIKE '%$search%'";
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
        $jsonArmado = json_encode($json);
        echo $jsonArmado;
    }

    

?>