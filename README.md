# API-DESEMPENO-04

## Descripción

Pequeña API de ejemplo creada con Express. Incluye un endpoint simple `/ping` que devuelve un objeto JSON para comprobar que la API está funcionando.

## Requisitos

- Node.js 16+ (recomendado 18+)
- npm

## Instalación

1. Instala las dependencias:

```powershell
npm install
```

## Ejecución

Ejecuta la aplicación con Node:

```powershell
node app.js
```

Si al ejecutar `node app.js` obtienes errores relacionados con la sintaxis `import`, añade "type": "module" en el archivo `package.json` o renombra `app.js` a `app.mjs`.

## Uso y endpoints

- GET /ping
  - Respuesta: JSON con la forma { "message": "API funcionando correctamente" }
  - Puerto por defecto: 3000 (usa la variable de entorno PORT para cambiarlo)

## Probar la API (ejemplo en PowerShell)

Inicia la API y, desde otra terminal, ejecuta:

```powershell
Invoke-RestMethod -Method GET -Uri http://localhost:3000/ping
```

También puedes usar curl:

```powershell
curl http://localhost:3000/ping
```

## Contribuciones

Si quieres mejorar el proyecto, abre un issue o envía un pull request con tus cambios.

## Licencia

Sin licencia especificada. Añade un archivo LICENSE si quieres indicar una licencia concreta.

# API-DESEMPENO-04
