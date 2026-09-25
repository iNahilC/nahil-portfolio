# Portafolio de Nahil Rojas

Código del portafolio personal de [Nahil Enmanuel Rojas Morel](https://nahilrojas.sparked.network/), desarrollador de software en Santo Domingo, República Dominicana.

El sitio presenta mi trabajo en **CBRM** y **Ferrefacturas**. Incluye un [caso de estudio de CBRM](https://nahilrojas.sparked.network/proyectos/cbrm/) que explica mi responsabilidad técnica. Los repositorios de esos productos son privados y no forman parte de este proyecto.

## Tecnologías

- Astro, HTML y CSS
- Node.js para servir la versión estática en Apollo

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Generar el sitio

```bash
npm run build
```

Astro genera `dist/`. El código de las páginas está en `src/pages/`; los estilos, en `src/styles/global.css`. `public/` contiene los recursos públicos que necesita el sitio, incluida la versión descargable de mi CV.

## Publicación

`deploy/apollo-server.mjs` sirve los archivos generados por Astro en el puerto configurado mediante `PORTFOLIO_PORT`. Los datos de acceso y la configuración privada del servidor no están incluidos.
