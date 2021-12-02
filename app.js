$(document).ready(function() {
    
    let editar = false;
    console.log("jquery esta andando");
    obtenerTareas();
    $('#mostrar-tarea').hide();

    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'buscar_tarea.php',
                type:'POST',
                data: {search:search},
                success: function(response) {
                    let tareas = JSON.parse(response);
                    template = '';
                    tareas.forEach(tarea => {
                        template += `<li>
                            ${tarea.nombre}
                        </li>`
                    });

                    $('#contenedor').html(template); 
                    $('#mostrar-tarea').show();
                }
            })
        }
        
    })

    $('#tarea-form').submit(function(e){
        e.preventDefault();
        const postData = {
            id: $('#id-de-tarea').val(),
            nombre : $('#nombre').val(),
            descripcion : $('#descripcion').val()
        };

        let url = editar === false ? 'agregar_tarea.php' : 'editar_tarea.php';

        $.post(url, postData, function (response) {
            obtenerTareas();
            $('#tarea-form').trigger('reset');
            editar = false;
        });
    });

    function obtenerTareas(){
        $.ajax({
            url: 'mostrar_tareas.php',
            type: 'GET',
            success: function(response){
                let tareas = JSON.parse(response);
                let template ='';
                tareas.forEach(tarea => {
                    template += `
                        <tr tarea-id="${tarea.id}">
                            <td>${tarea.id}</td>
                            <td>${tarea.nombre}</td>
                            <td>${tarea.descripcion}</td>
                            <td>
                                <button class="borrar-tarea btn btn-danger">Eliminar</button>
                            </td>
                            <td>
                                <button class="modificar-tarea btn btn-success">Modificar</button>
                            </td>
                        </tr>
                    `
                });
                $('#tareas').html(template);
            }
        })
    }

    $(document).on('click', '.borrar-tarea', function() {
        if(confirm('¿Estás seguro que la querés borrar? Mirá que no hay vuelta atrás...')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('tarea-id');
            $.post('eliminar_tarea.php', {id}, function(response) {
                obtenerTareas()
                console.log(response);
            })
        }
        
    })

    $(document).on('click', '.modificar-tarea', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('tarea-id');
        $.post('modificar_tarea.php', {id}, function(response) {
            const tarea = JSON.parse(response);
            $('#id-de-tarea').val(tarea.id);
            $('#nombre').val(tarea.nombre);
            $('#descripcion').val(tarea.descripcion);
            editar = true;
        })
    })

});