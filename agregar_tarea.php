<?php

    include('database.php');

    if(isset($_POST['nombre'])){
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $sql = "INSERT INTO tareas(nombre,descripcion) VALUES ('$nombre','$descripcion')";
        $result = mysqli_query($connection, $sql);
        if(!$result){
            die("No pibe, mandaste cualquiera en la consulta ".mysqli_error($connection));
        }
        echo "Tarea agregada";
    }

?>