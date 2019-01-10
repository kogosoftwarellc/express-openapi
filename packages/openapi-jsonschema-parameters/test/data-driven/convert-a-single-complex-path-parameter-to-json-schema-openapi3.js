module.exports = {
    parameters: [
        {
            in: 'path',
            name: 'foo',
            required: true,
            // jsonschema properties
            schema: {
                default: 5,
                description: 'asdfasdf',
                format: 'asdf',
                type: 'string',
                title: 'fffasdf',
                maximum: 0,
                additionalItems: true,
                items: [],
                exclusiveMaximum: true,
                minimum: 5,
                exclusiveMinimum: false,
                maxLength: 5,
                minLength: 6,
                pattern: '^asdf$',
                maxItems: 5,
                minItems: 7,
                uniqueItems: false,
                enum: ['1', '3'],
                multipleOf: 57
            }
        }
    ],

    outputSchema: {
        path: {
            properties: {
                foo: {
                    additionalItems: true,
                    default: 5,
                    description: 'asdfasdf',
                    type: 'string',
                    maximum: 0,
                    exclusiveMaximum: true,
                    minimum: 5,
                    exclusiveMinimum: false,
                    format: 'asdf',
                    items: [],
                    maxLength: 5,
                    minLength: 6,
                    pattern: '^asdf$',
                    title: 'fffasdf',
                    maxItems: 5,
                    minItems: 7,
                    uniqueItems: false,
                    enum: ['1', '3'],
                    multipleOf: 57
                }
            },
            required: ['foo']
        }
    }
};
