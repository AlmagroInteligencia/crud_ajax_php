<?php

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];

        $sql = "DELETE FROM tareas WHERE id=$id";
        $result = mysqli_query($connection, $sql);
        if(!$result){
            die("No pibe, mandaste cualquiera en la consulta ".mysqli_error($connection));
        }

        echo "Tarea eliminada";
    }
    
    
    
   




?>