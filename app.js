document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputTelefono = document.querySelector('#telefono');
    const inputCorreo = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Asignar eventos
    inputNombre.addEventListener('blur', validar);
    inputTelefono.addEventListener('blur', validar);
    inputCorreo.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta();
        } else {
            console.log('si hay algo...')
        }
    }

    function mostrarAlerta() {
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = 'Hubo un error...';
        error.classList('was-validated');
        
       // inyectar el error al formulario
       formulario.appendChild(error);
    }
});