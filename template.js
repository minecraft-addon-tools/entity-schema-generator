const fs = require("fs");

module.exports = async (sourceFile, values, resultFile) => {
    const source = await fs.promises.readFile(sourceFile, "utf8");
    const obj = JSON.parse(source, (key, value) => {
        if (typeof value === "string") {
            const match = /^\$\$(.*)\$\$$/.exec(value);
            if (match) return values[match[1]]; // this can replace string with object or array
            return value.replace(/\$\$(.*)\$\$/g, (x, name) => values[name]);
        }
        return value;
    });
    const output = JSON.stringify(obj, undefined, 2);
    await fs.promises.writeFile(resultFile, output, "utf8");
};
