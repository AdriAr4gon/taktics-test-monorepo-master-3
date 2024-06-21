## Instalación

1. Entra en: https://www.docker.com/ e instala en tu ordenador la aplicación de Docker.

2. Clona este repositorio en tu máquina local.

Puedes entrar en GitLab y descargar el repositorio en formato zip para posteriormente descomprimirlo.

## Navega hasta el directorio del proyecto

Abre el repositorio del proyecto desde tu Visual Studio Code.

## Ejecución de la aplicación

Para arrancar la aplicación, necesitas construir y ejecutar los contenedores de Docker. Debes abrir desde la raíz del proyecto una terminal en tu visual studio code y ejecutar el siguiente comando:

docker-compose up --build

Este comando construirá las imágenes de Docker para el frontend y el backend (según lo definido en docker-compose.yml y los archivos Dockerfile en los directorios admin/ y api/), y luego ejecutará los contenedores.

El frontend estará disponible en http://localhost:9000 y el backend en http://localhost:3000

## Uso de la aplicación

Para loguearte, puedes usar las siguientes credenciales:

Correo electrónico: jplaza@taktics.net
Contraseña: 1212

## Detener la aplicación

Para detener la aplicación, puedes usar el siguiente comando:

docker-compose down

Esto detendrá y eliminará los contenedores, las redes y, opcionalmente, las imágenes y los volúmenes creados al ejecutar docker-compose up.
