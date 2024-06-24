This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/LuisCepeda/reto2

# Entra en el directorio del proyecto
cd reto2

# Instala las dependencias
npm install
# o
yarn install
```

## Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
```DATABASE_URL="file:./dev.db```

## Crea un archivo .env.local en la raíz del proyecto y añade las siguientes variables:
```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_URL
NEXTAUTH_SECRET
BASE_URL
```
## Resetea la base de datos SQLite
```
npx prisma migrate reset
```
## Ejecución

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


Enunciado
Reto sistema de gestión para proyectos ambientales

Imagina que estás trabajando en el desarrollo de un sistema de gestión para proyectos ambientales. Este sistema permitirá a los equipos de proyectos planificar, ejecutar y monitorear diversas iniciativas destinadas a la conservación del medio ambiente. La aplicación debe brindar herramientas para la gestión de tareas, asignación de recursos y seguimiento del progreso.

Requisitos:

    Modelo:
        Diseña un modelo que represente los proyectos ambientales, las tareas asociadas, los recursos asignados y el progreso de cada tarea.
        Incluye detalles relevantes, como el nombre del proyecto, la descripción, las fechas de inicio y finalización, etc.
    Vistas:
        Crea vistas que permitan a los equipos de proyectos visualizar la lista de proyectos, las tareas pendientes y asignar recursos.
        Diseña una interfaz para que los líderes de proyecto puedan monitorear el progreso global y obtener informes detallados.
    Controladores:
        Implementa controladores que permitan a los usuarios crear nuevos proyectos, asignar tareas, y actualizar el estado y progreso de las tareas.
        Desarrolla controladores para manejar las asignaciones de recursos y la planificación de proyectos.
    Interacciones:
        Garantiza que los equipos de proyectos puedan colaborar de manera efectiva, asignar tareas entre los miembros y comunicarse a través de la aplicación.
        Asegúrate de que los líderes de proyecto puedan realizar un seguimiento eficiente del progreso y realizar ajustes según sea necesario.
    Seguridad:
        Implementa un sistema de autenticación y autorización para garantizar que solo los miembros autorizados tengan acceso a la información del proyecto.
        Protege la información sensible relacionada con proyectos en curso.
    Notificaciones:
        Diseña un sistema de notificaciones para informar a los miembros del equipo sobre nuevas tareas, cambios en el proyecto y recordatorios de fechas importantes.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
