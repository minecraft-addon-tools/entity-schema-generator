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
            for (const parameter of component.parameters) {
                obj.properties[parameter.name] = { description: parameter.description };
            }
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
            for (const parameter of component.parameters) {
                obj.properties[parameter.name] = { description: parameter.description };
            }
        }
    }

};
