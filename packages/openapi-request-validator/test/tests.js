var expect = require('chai').expect;
var Sut = require('../');

describe(require('../package.json').name, function() {
  it('should not modify the input parameters', function() {
    var initialArguments = createArguments();
    new Sut(initialArguments);
    expect(initialArguments).to.eql(createArguments());
  });

  function createArguments() {
    return {
      parameters: [
        {
          in: 'body',
          name: 'User',
          schema: {
            $ref: '#/definitions/User'
          }
        }
      ],

      schemas: {
        User: {
          properties: {
            name: {
              type: 'string'
            }
          }
        }
      }
    };
  }
});
