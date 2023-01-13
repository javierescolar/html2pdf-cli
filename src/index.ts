import { program } from 'commander';
import handlebars from 'handlebars';
import { generatePdf } from 'html-pdf-node';
import fs from 'node:fs';
import path from 'node:path';

import error from './error';
import { OptionsArguments } from './optionsArguments';

program
    .version("1.0.0")
    .description("A commnad line tool for convert html template to pdf file")
    .argument("<template>", "HTML template for generating the pdf file")
    .option(
        "-d, --data <data>",
        "file with json extension used to replace the variables contained within the template. By default import/data.json is used"
    )
    .option(
        "-o, --output <output>",
        "path where to create the pdf file. By default the export folder will be used"
    )
    .option(
        "-f, --file <file>",
        "Name of the file to generate. By default it will be a timestamp preceded by file_"
    )
    .option(
        "-l, --landscape",
        "changes the orientation of the document from portrait to landscape.",
        false
    )
    .action((template: string) => {
        let { landscape, output, file, data }: OptionsArguments =
            program.opts();
        //Valores por defecto
        data = data ?? path.join(__dirname, "..", "import", "data.json");
        output = output ?? path.join(__dirname, "..", "export");
        file = file
            ? `${file.replace(".pdf", "")}.pdf`
            : `file_${new Date().getTime()}.pdf`;
        //validaciones
        (!fs.existsSync(output) || !fs.lstatSync(output).isDirectory()) &&
            error("output option is not a valid path");
        (!fs.existsSync(template) ||
            !fs.lstatSync(template).isFile() ||
            !template.endsWith(".html")) &&
            error("template is not a valid path or file");
        (fs.existsSync(file) ||
            file.split("\\").length > 1 ||
            file.split("/").length > 1) &&
            error("file must not be a path");
        (!fs.existsSync(data) ||
            !fs.lstatSync(data).isFile() ||
            !data.endsWith(".json")) &&
            error("data is not a valid path file");

        //programa
        try {
            JSON.parse(fs.readFileSync(data, "utf-8"));
        } catch (e) {
            error("data is not json valid");
        }
        const jsonData = JSON.parse(fs.readFileSync(data, "utf-8"));
        const templetaHtml = fs.readFileSync(template, "utf-8");

        generatePdf(
            {
                content: handlebars.compile(templetaHtml)(jsonData),
            },
            {
                format: "A4",
                landscape,
                path: path.join(output, file),
            },
            (err: Error, buffer: Buffer) => {
                err && error(err.message);
            }
        );
    });

program.parse(process.argv);
