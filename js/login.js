document.addEventListener("DOMContentLoaded", function() {
    // Este evento se dispara cuando el DOM (Document Object Model) de la página ha sido completamente cargado.

    document.getElementById("login").addEventListener("click", () => {
        // Aquí se agrega un "escuchador" de eventos al botón con el ID "login". Cuando se hace clic en este botón, se ejecutará la función proporcionada.

        const mail = document.getElementById("mail").value;
        const pass = document.getElementById("pass").value;
        // Aquí se obtienen los valores de los campos de entrada de correo electrónico y contraseña. "floatingInput" y "floatingPassword" son los IDs de los elementos de entrada en el HTML.

        if (mail.length >= 10 && pass.length >= 6) {
            // Se verifica si tanto el correo electrónico como la contraseña tienen al menos 6 caracteres de longitud.

            try {
                localStorage.setItem("user", JSON.stringify({ 'mail':mail, 'pass': pass }));
                // Aquí se intenta almacenar la información de usuario (correo y contraseña) en el almacenamiento local del navegador. La información se guarda como una cadena JSON.

            } catch (e) {
                // En caso de que ocurra un error al intentar almacenar en el almacenamiento local, se captura y no se hace nada específico.
            }
            
            this.location.href = "./index.html";
            // Si el almacenamiento en el navegador se realizó con éxito, se redirige al usuario a la página "index.html".
        } else {
            alert("Mail o contraseña incorrecta")
            // En el caso que no se cumpla el if aparece una alerta que indica que alguno de los campos no tiene la informacion adecuada para que el usuario intente de nuevo.
        }
    });
});