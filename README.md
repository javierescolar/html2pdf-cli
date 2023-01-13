# html2pdf-cli

## Descripción

html2pdf-cli es un pequeño proyecto de consola, creado con [commander](https://github.com/tj/commander.js#readme) para generar pdf a partir de plantillas html, basado en [html-pdf-node](https://github.com/mrafiqk/html-pdf-node#readme). Las cuales permites la sustitución de variables mediante [handlebars](https://handlebarsjs.com/).

### Instalación

```
pnpm install
```

### Comandos

-   Ejecuta `pnpm build` para transpilar el proyecto a JavaScript
-   Ejecuta `pnpm start --help` para correr el programa y su funcionamiento.
-   Ejecuta `pnpm start <template>` para correr el programa y crear un pdf a partir la ruta del template. Por defecto las variables localizadas en el template serán remplazadas por el archivo json ubicado en **import/data.json**. Sustituida la información se generará un pdf dentro del directorio **export** con el nombre de fichero file\_ seguido de un getTime del objeto [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) con extensión pdf. Ejemplo: file_1673543818754.pdf. Este comportamiento puede modificarse con los siguietne argumentos opcionales:
    -   `-l, --landscape`: la orientación del archivo creado pasa a ser horizontal en vez de vertical.
    -   `-d, --data <pathJsonFile>`: En vez de remplzar las variables con el contenido en import/data.json puedes pasar una ruta de un archivo con extensión json para que utilizce esa información.
    -   `-o, --output <pathOutput`: Cambia la ruta de destino para la generación del pdf.
    -   `-f,--file <namePdfFile>`: Cambi el nombre del pdf generado por el que se indique.

### Licencia

MIT
