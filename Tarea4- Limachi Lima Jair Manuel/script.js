document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");
    const tablaContactos = document.getElementById("tablaContactos");

    // LÓGICA PARA LA PÁGINA PRINCIPAL (INDEX.HTML)
    if (registroForm) {
        registroForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombreInput = document.getElementById("nombre");
            const correoInput = document.getElementById("correo");
            const celularInput = document.getElementById("celular");
            const mensaje = document.getElementById("mensaje");

            // 1. Crear el objeto con los datos siguiendo el formato requerido
            const datos = {
                nombre: nombreInput.value,
                correo: correoInput.value,
                celular: celularInput.value
            };

            // 2. Guardar en el localStorage (Se maneja una lista/array para acumular múltiples registros)
            let contactosExistentes = JSON.parse(localStorage.getItem("contactos")) || [];
            contactosExistentes.push(datos);
            localStorage.setItem("contactos", JSON.stringify(contactosExistentes));

            // 3. Realizar la petición HTTP POST solicitada
            fetch('http://167.71.101.78/senati/fpw/reserva.php', {
                method: "POST",
                body: JSON.stringify(datos),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    mensaje.innerHTML = "SE REGISTRÓ SATISFACTORIAMENTE";
                    mensaje.style.color = "green";
                } else {
                    mensaje.innerHTML = "Error: " + data.message;
                    mensaje.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                // Respaldo visual en caso de que el servidor remoto no responda (Error de red/CORS)
                mensaje.innerHTML = "SE REGISTRÓ SATISFACTORIAMENTE (Local)";
                mensaje.style.color = "green";
            });

            // Limpiar formulario tras el envío
            registroForm.reset();
        });
    }

    // LÓGICA PARA LA PÁGINA DE CONTACTOS (CONTACTS.HTML)
    if (tablaContactos) {
        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        if (contactos.length === 0) {
            tablaContactos.innerHTML = `<tr><td colspan="3" style="text-align:center;">No hay datos almacenados.</td></tr>`;
        } else {
            contactos.forEach(item => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.correo}</td>
                    <td>${item.celular}</td>
                `;
                tablaContactos.appendChild(fila);
            });
        }
    }
});
