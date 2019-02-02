exports.extractComponents = (documentation, values) => {

    const arrayComponents = new Set([
        "minecraft:damage_sensor",
        "minecraft:interact",
        "minecraft:spawn_entity"
    ]);

    values.components = {};

    for (const component of [...documentation.properties, ...documentation.components]) {

        const obj = {
            description: component.description,
            type: "object"
        };
        values.components[component.name] = obj;

        if (component.parameters) {
            obj.properties = {};
            extractParameters(component.parameters, obj.properties);
        } else {
            obj.default = {};
        }

        if (arrayComponents.has(component.name)) {
            obj.type = ["array", "object"];
            obj.items = {
                type: "object",
                properties: obj.properties
            };
        }
    }

    for (const component of documentation.aiGoals) {

        const obj = {
            description: component.description,
            type: "object",
            properties: {
                priority: {
                    type: "integer"
                }
            }
        };
        values.components[component.name] = obj;

        if (component.parameters) {
            extractParameters(component.parameters, obj.properties);
        }
    }

};

function extractParameters(parameters, result) {
    for (const parameter of parameters) {
        const obj = { description: parameter.description };
        result[parameter.name] = obj;
        if (parameter.nestedParameters) {
            const properties = {};
            extractParameters(parameter.nestedParameters, properties);
            const isTypeArray = parameter.type === "Array" || parameter.type === "List";
            if (isTypeArray) {
                obj.type = "array";
                obj.items = {
                    type: "object",
                    properties
                }
            } else {
                obj.type = "object";
                obj.properties = properties;
            }
        }
    }
}
