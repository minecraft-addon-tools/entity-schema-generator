const fs = require("fs");
const vm = require("vm");

module.exports = async (sourceFile, values, resultFile) => {
    const data = await fs.promises.readFile(sourceFile, "utf8");
    const javascript = "(" + data.replace(/"\$\$(.*)\$\$"/g, "$1") + ")";
    const obj = vm.runInNewContext(javascript, values);
    const json = JSON.stringify(obj, null, 2);
    await fs.promises.writeFile(resultFile, json, "utf8");
};