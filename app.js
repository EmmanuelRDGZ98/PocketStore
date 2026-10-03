const contenedorProductos = document.getElementById("productos");

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await respuesta.json();

        contenedorProductos.innerHTML = "";

        usuarios.forEach(usuario => {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("producto");

            tarjeta.innerHTML = `
                <h3>${usuario.name}</h3>

                <p><strong>Usuario:</strong> ${usuario.username}</p>

                <p><strong>Email:</strong> ${usuario.email}</p>

                <p><strong>Teléfono:</strong> ${usuario.phone}</p>

                <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
            `;

            contenedorProductos.appendChild(tarjeta);
        });

    } catch (error) {

        console.error("Error al obtener usuarios:", error);

        contenedorProductos.innerHTML = `
            <p>No fue posible cargar la información.</p>
        `;
    }
}

obtenerUsuarios();


if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")
            .then(() => {
                console.log("Service Worker registrado correctamente");
            })
            .catch(error => {
                console.log("Error al registrar Service Worker:", error);
            });

    });

}