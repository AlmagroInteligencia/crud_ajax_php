<?php

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $sql = "UPDATE tareas SET nombre='$nombre', descripcion='$descripcion' WHERE id=$id";
        $result = mysqli_query($connection, $sql);
        if(!$result){
            die("No pibe, mandaste cualquiera en la consulta ".mysqli_error($connection));
        }

        echo "Tarea modificada";
    }



?>