# PocketStore

Proyecto PWA desarrollado con HTML, CSS y JavaScript Vanilla.

## Descripción

PocketStore es una aplicación web progresiva que consume información de usuarios desde la API pública JSONPlaceholder.

La aplicación muestra un directorio de usuarios con datos como nombre, usuario, correo electrónico, teléfono y ciudad.

Además, utiliza un Service Worker y la Cache API para permitir que la aplicación continúe funcionando incluso cuando no existe conexión a internet.

---

---

## Estructura del proyecto

```text
pocket-store/
│
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
│
├── img/
│   ├── 01-estructura.png
│   ├── 02-manifest.png
│   ├── 03-fetch-api.png
│   ├── 04-service-worker.png
│   ├── 05-aplicacion-online.png
│   └── 06-aplicacion-offline.png
│
├── index.html
├── styles.css
├── app.js
├── sw.js
├── manifest.json
└── README.md

Descripción de los archivos del proyecto
index.html
El archivo index.html contiene la estructura principal de PocketStore.
Dentro de este archivo se encuentran el encabezado de la aplicación, el título del directorio de usuarios, el contenedor principal donde se muestran los datos obtenidos desde la API y el pie de página.
También contiene las referencias a los archivos styles.css, manifest.json y app.js.
El contenedor con el identificador productos inicia mostrando el mensaje Cargando usuarios.... Posteriormente, JavaScript reemplaza ese contenido por las tarjetas de usuarios obtenidas desde JSONPlaceholder.
Este archivo representa el App Shell de la aplicación, ya que contiene la estructura visual básica que se carga al iniciar PocketStore.
styles.css
El archivo styles.css contiene todos los estilos visuales de la aplicación.
Se utiliza para definir los colores, tamaños, márgenes, tipografía y distribución de los elementos.
También se utiliza CSS Grid para acomodar las tarjetas de los usuarios en varias columnas dependiendo del espacio disponible.
Las tarjetas utilizan la clase .producto, la cual define el fondo blanco, los bordes redondeados, el espacio interno y la sombra.
El archivo también contiene los estilos del encabezado y del pie de página para mantener una apariencia uniforme en toda la aplicación.
app.js
El archivo app.js contiene la lógica principal de PocketStore.
Primero obtiene el contenedor HTML donde se mostrarán los usuarios.
Después se ejecuta la función obtenerUsuarios(), la cual utiliza fetch() para realizar una petición al endpoint:
https://jsonplaceholder.typicode.com/users
La respuesta recibida se convierte a formato JSON.
Posteriormente se recorre la lista de usuarios utilizando forEach().
Por cada usuario se crea dinámicamente una tarjeta HTML que muestra:
- Nombre
- Nombre de usuario
- Correo electrónico
- Teléfono
- Ciudad
Cada tarjeta creada se agrega al contenedor principal de la página.
El archivo también utiliza un bloque try/catch para detectar errores al consultar la API. Si ocurre un problema, se muestra el mensaje No fue posible cargar la información.
Finalmente, app.js también registra el archivo sw.js como Service Worker. Esto permite que el navegador utilice el sistema de caché y las funciones necesarias para el funcionamiento offline.
sw.js
El archivo sw.js contiene la configuración del Service Worker de PocketStore.
Su función principal es controlar las solicitudes realizadas por la aplicación y permitir el uso de archivos almacenados en caché.
El Service Worker utiliza tres eventos principales:
Evento install
El evento install se ejecuta cuando el Service Worker se instala por primera vez.
En este evento se crea el caché pocketstore-v2 y se almacenan los archivos principales del proyecto:
- index.html
- styles.css
- app.js
- manifest.json
- icon-192.png
- icon-512.png
Esto permite que la estructura principal de PocketStore quede disponible aunque no exista conexión a internet.
Evento activate
El evento activate se ejecuta después de la instalación del Service Worker.
En este proyecto se utiliza para revisar los cachés existentes y eliminar versiones anteriores.
Esto ayuda a evitar que el navegador utilice archivos viejos después de actualizar la aplicación.
También se utiliza self.clients.claim() para que el Service Worker pueda tomar control de la página.
Evento fetch
El evento fetch se ejecuta cada vez que la aplicación realiza una solicitud.
Primero se revisa si el recurso solicitado ya existe dentro del caché.
Si existe, se utiliza directamente la copia almacenada.
Si no existe, se realiza la petición por internet.
Cuando la respuesta llega correctamente, se crea una copia y se almacena en caché.
Gracias a este funcionamiento, también se puede guardar la respuesta de JSONPlaceholder y reutilizarla cuando la aplicación se ejecuta sin conexión.
manifest.json
El archivo manifest.json contiene la configuración de la aplicación web progresiva.
En este archivo se define:
- Nombre completo de la aplicación.
- Nombre corto.
- Página inicial.
- Modo de visualización.
- Color de fondo.
- Color principal.
- Iconos de la aplicación.
La propiedad display utiliza el valor standalone, lo que permite que PocketStore se comporte de forma similar a una aplicación instalada y no solamente como una página web tradicional.
También se configuran dos iconos:
- 192 x 192 píxeles
- 512 x 512 píxeles
Estos iconos son utilizados por el navegador al momento de instalar o mostrar la PWA.
Carpeta icons
La carpeta icons contiene los iconos utilizados por PocketStore.
Los archivos son:
icon-192.png
icon-512.png
Ambos iconos utilizan el mismo diseño de carrito de compras, pero tienen diferentes dimensiones para cumplir con la configuración del manifiesto.
Carpeta img
La carpeta img contiene las capturas utilizadas como evidencia del proceso de desarrollo.
Estas imágenes documentan las diferentes etapas del proyecto, como la estructura de archivos, la configuración del manifiesto, el consumo de la API, la implementación del Service Worker y las pruebas de funcionamiento online y offline.
README.md
El archivo README.md contiene la documentación general del proyecto.
Aquí se explica el objetivo de PocketStore, las tecnologías utilizadas, la función de cada archivo, la API utilizada, el funcionamiento del Service Worker y las pruebas realizadas.
También incluye las evidencias mediante capturas de pantalla para documentar el proceso de desarrollo.
API utilizada
PocketStore utiliza la API pública gratuita JSONPlaceholder.
Endpoint utilizado:
https://jsonplaceholder.typicode.com/users
JSONPlaceholder proporciona datos ficticios que pueden utilizarse para realizar pruebas.
En este proyecto se utilizan los siguientes datos de cada usuario:
- Nombre
- Nombre de usuario
- Correo electrónico
- Teléfono
- Ciudad
Flujo de funcionamiento
El funcionamiento general de PocketStore es el siguiente:
Usuario abre PocketStore
        ↓
Se carga index.html
        ↓
Se cargan styles.css y app.js
        ↓
app.js realiza una petición con fetch()
        ↓
JSONPlaceholder devuelve los usuarios
        ↓
JavaScript genera las tarjetas
        ↓
Los usuarios aparecen en pantalla
        ↓
El Service Worker almacena recursos en caché
        ↓
PocketStore puede utilizar los recursos sin conexión
Funcionamiento con conexión
Cuando existe conexión a internet, app.js realiza una petición a JSONPlaceholder utilizando fetch().
La API devuelve los usuarios en formato JSON y JavaScript genera una tarjeta por cada registro.
Mientras se utiliza la aplicación, el Service Worker puede almacenar los recursos y respuestas necesarias dentro del caché.
Funcionamiento sin conexión
Después de haber utilizado PocketStore al menos una vez con conexión, los principales recursos quedan almacenados en caché.
Cuando no existe conexión, el Service Worker intercepta las solicitudes y revisa si existe una copia almacenada.
Si el recurso se encuentra en caché, se devuelve esa versión.
Durante las pruebas se utilizó la herramienta Google Chrome DevTools y se configuró la red en modo Offline.
La aplicación continuó mostrando los usuarios, demostrando que el almacenamiento en caché funciona correctamente.
1. Estructura del proyecto
En esta captura se muestra la estructura general del proyecto dentro de Visual Studio Code.
 
2. Configuración del Manifest
En esta captura se muestra el archivo manifest.json con la configuración del nombre, colores, modo de visualización e iconos.
3. Consumo de la API
En esta captura se muestra la implementación de fetch() en app.js para obtener los usuarios desde JSONPlaceholder.
 
4. Implementación del Service Worker
En esta captura se muestra el archivo sw.js con los eventos install, activate y fetch.
 
5. Aplicación funcionando con internet
En esta captura se muestra PocketStore funcionando normalmente y mostrando los usuarios obtenidos desde la API.
 
6. Aplicación funcionando sin conexión
En esta captura se muestra PocketStore funcionando mientras Google Chrome DevTools se encuentra configurado en modo Offline.
Los usuarios continúan apareciendo gracias a los recursos almacenados en caché.