# Proyecto Cumpleaños

Cómo correr backend:
- Buildear y correr desde consola de comando con maven, o más fácil abrir con un IDE como IntelliJ o Eclipse y correr CumpleanosApplication

Cómo correr frontend:
- Instalar Node.js desde [https://nodejs.org/en]
- Instalar Angular CLI corriendo [npm install -g @angular/cli] desde una consola de comando
- Desde una consola de comando ir a la carpeta y correr [npm install]
- Después [ng serve] y listo.

Acceso:
Backend: [http://localhost:8080/] (recomendable usar postman para hacer requests)
Frontend: [http://localhost:4200/] (desde cualquier navegador)

Funciones:
- Drag and drop entre las listas
- Hacer click en una persona agrega los campos al menú de abajo, despues de modificarlos hacer click en guardar actualiza la persona.
- Hacer click en "nuevo" resetea los campos para insertar una persona nueva.
- Hacer click en "eliminar" luego de seleccionar una persona la elimina.
- Hacer click en "invitar confirmados" confirma a las personas en la lista de la derecha y dejan de aparecer.

Cómo funciona:
El backend usa una base de datos volátil en memoria con una sola tabla, Personas. Al insertar una persona está por defecto con el campo "confirmado" en false. Al ponerla en la lista de confirmados e invitarla, se la actualiza con el campo "confirmado" en true y se la deja de traer al cargar la lista de la izquierda.
