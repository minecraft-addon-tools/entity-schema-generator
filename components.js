exports.extractComponents = (documentation, values) => {

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
