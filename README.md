# Travel App

Es una aplicación web adaptable a dispositivos móviles la cual permite consultar una ciudad y elegir un presupuesto y saber el clima, moneda de la ciudad selecciona.

## Características

- Consultas HTTP
- Aplicación web SPA

## Tecnologías Utilizadas
- Laravel
- Angular

## Instalación

### Requisitos:
Node 20.
PHP 7.x
composer 2.7.8

### Pasos de instalación
1. Clona el repositorio: `https://github.com/Dragnell27/PruebaSoporteLVL2.git`
3. importamos la base de datos que esta en la ruta
3. Navega a la carpeta donde se encuentra alojado el backend: `cd backend/`
4. Instalamos las dependencies de laravel: `composer install`
5. Creamos el archivo .env clonando el .env.example: `cp .env.example .env`
6. Abrimos el archivo .env que se encuentra en la ruta `./backend/.env` y configuramos las variables de entorno de conexión a la base de datos(BD) que están a partir de la variable DB_CONNECTION (configura según tus necesidades).
7. importamos la BD que se encuentra en la ruta `PruebaSoporteLVL2/backend/database/travelapp.sql`
8. Volvemos a nuestra carpeta principal del proyecto `cd ../` y ejecutamos el comando `npm install && npm run install:frontend` para instalar las dependencias del proyecto principal y las dependencias del frontend.
9. En la carpeta principal del proyecto ejecutamos el comando `npm start` para iniciar el backend y frontend el proyecto.
10. Una vez la consola muestre que la aplicación levanto correctamente, en nuestro navegador ingresamos al link: `http://localhost:4200/` para usar la aplicación web.




