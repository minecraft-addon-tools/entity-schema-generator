exports.extractFilters = (documentation, values) => {
    values.filters = [];
    values.filterTestEnum = [];
    values.filterTestEnumDescriptions = [];

    for (const filter of documentation.filters) {
        const valueType = filter.type.toLowerCase();

        const valueTypeMap = {
            "string": "string",
            "integer": ["integer", "string"],
            "decimal": ["number", "string"],
            "boolean": ["boolean", "string"]
        }

        const obj = {
            properties: {
                test: {
                    const: filter.name
                },
                value: {
                    type: valueTypeMap[valueType]
                }
            }
        }

        if (filter.options) {
            obj.properties.value.enum = filter.options;
        }
        if (valueType !== "boolean") {
            obj.required = ["value"];
        }

        values.filters.push(obj);
        values.filterTestEnum.push(filter.name);
        values.filterTestEnumDescriptions.push(filter.description);
    }
};
