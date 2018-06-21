module.exports = {
  constructorArgs: {
    responses: {
      200: {
        schema: {
          type: 'object',
          properties: {
            foo: {
              type: 'string'
            }
          }
        }
      }
    },

    definitions: null,

    errorTransformer: function(error) {
      return 'asdf';
    }
  },

  inputStatusCode: 400,
  inputResponseBody: {foo: 'asdf'},

  expectedValidationError: {
    status: 500,
    message: 'An unknown status code was used and no default was provided.'
  }
};
