
document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formContacto");

    if (!formulario) {
        return;
    }

    const nombre = document.getElementById("nombre");
    const mensaje = document.getElementById("mensaje");
    const archivo = document.getElementById("archivo");
    const archivoError = document.getElementById("archivoError");
    const mensajeEstado = document.getElementById("mensajeEstado");

    function validarTexto(campo) {

        if (campo.value.trim() === "") {
            campo.setCustomValidity("Este campo es obligatorio.");
        } else {
            campo.setCustomValidity("");
        }

    }

    function validarArchivo() {

        const archivoSeleccionado = archivo.files[0];

        archivo.setCustomValidity("");

        if (!archivoSeleccionado) {
            return;
        }

        const nombreArchivo = archivoSeleccionado.name.toLowerCase();

        const extensiones = [".pdf", ".jpg", ".jpeg", ".png"];

        const extensionValida = extensiones.some(function (extension) {
            return nombreArchivo.endsWith(extension);
        });

        const tamañoMaximo = 2 * 1024 * 1024;

        if (!extensionValida) {

            archivo.setCustomValidity("Formato no permitido.");

            archivoError.textContent =
                "Solo se permiten archivos PDF, JPG o PNG.";

        } else if (archivoSeleccionado.size > tamañoMaximo) {

            archivo.setCustomValidity("Archivo demasiado grande.");

            archivoError.textContent =
                "El archivo no debe superar los 2 MB.";

        } else {

            archivoError.textContent =
                "Revisa el archivo seleccionado.";

        }

    }

    nombre.addEventListener("input", function () {
        nombre.setCustomValidity("");
    });

    mensaje.addEventListener("input", function () {
        mensaje.setCustomValidity("");
    });

    archivo.addEventListener("change", validarArchivo);

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        validarTexto(nombre);
        validarTexto(mensaje);

        validarArchivo();

        formulario.classList.add("was-validated");

        if (!formulario.checkValidity()) {

            mensajeEstado.className = "alert alert-danger mt-4";

            mensajeEstado.textContent =
                "Revisa los campos marcados antes de continuar.";

            return;
        }

        mensajeEstado.className = "alert alert-success mt-4";

        mensajeEstado.textContent =
            "Datos enviados correctamente. "

        formulario.reset();

        nombre.setCustomValidity("");
        mensaje.setCustomValidity("");
        archivo.setCustomValidity("");

        formulario.classList.remove("was-validated");

    });

});
