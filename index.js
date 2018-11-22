const { MinecraftAddonDocumentation } = require("minecraft-documentation-extractor");
const template = require("./template");
const { extractFilters } = require("./filters");
const { extractComponents } = require("./components");

const { sourceFile, templateFile, outputFile } = require("./config");

(async () => {

    const documentation = await MinecraftAddonDocumentation.fromFile(sourceFile);

    const values = {};
    extractFilters(documentation, values);
    extractComponents(documentation, values);
    await template(templateFile, values, outputFile);

})();