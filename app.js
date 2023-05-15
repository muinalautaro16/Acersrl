document.addEventListener('DOMContentLoaded', function () {

    const email = {
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputTelefono = document.querySelector('#telefono');
    const inputCorreo = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputNombre.addEventListener('input', validar);
    inputTelefono.addEventListener('input', validar);
    inputCorreo.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(` El campo ${e.target.id} es obligatorio `, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }


        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.id] = e.target.value.trim().toLowerCase();



        // Comprobar el objeto mail
        comprobarEmail();

    }

    function enviarEmail(e) {
        e.preventDefault();
    
        spinner.classList.remove('visually-hidden');
    
        // Configurar el servicio de emailJS
        emailjs.init('1EeFhdK8G0_kowR5s');
    
        // Enviar el email utilizando emailJS
        emailjs.send('default_service', 'template_6n20b8m', {
          from_name: email.nombre,
          phone_number: email.telefono,
          from_email: email.email,
          message: email.mensaje
        })
          .then(function(response) {
            spinner.classList.add('visually-hidden');
    
            // Reiniciar el objeto email
            email.nombre = '';
            email.telefono = '';
            email.email = '';
            email.mensaje = '';
    
            formulario.reset();
            comprobarEmail();
    
            // Crear una alerta de éxito
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-success', 'p-3', 'mb-2', 'text-white', 'text-center');
            alertaExito.textContent = 'Mensaje enviado correctamente';
    
            formulario.appendChild(alertaExito);
    
            setTimeout(() => {
              alertaExito.remove();
            }, 3000);
          }, function(error) {
            console.error('Error al enviar el email:', error);
            spinner.classList.add('visually-hidden');
          });
      }
    

    function mostrarAlerta(mensaje, referencia) {
                    limpiarAlerta(referencia);


                    // Generar alerta en HTML
                    const error = document.createElement('P');
                    error.textContent = mensaje;
                    error.classList.add('p-3', 'mb-2', 'bg-danger', 'text-white', 'text-center');

                    // inyectar el error al formulario
                    referencia.appendChild(error);
                }

    function limpiarAlerta(referencia) {
                    // Comprueba si ya existe una alerta
                    const alerta = referencia.querySelector('.bg-danger');
                    if (alerta) {
                        alerta.remove();
                    }
                }

    function validarEmail(email) {
                    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
                    const resultado = regex.test(email);
                    return resultado;
                }

    function comprobarEmail() {
                    if (Object.values(email).includes('')) {
                        btnSubmit.classList.add('opacity-50');
                        btnSubmit.disabled = true;
                        return;
                    }
                    btnSubmit.classList.remove('opacity-50');
                    btnSubmit.disabled = false;
                }
});