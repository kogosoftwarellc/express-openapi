/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import OpenapiFramework from '../../../';
const path = require('path');

describe(path.basename(__dirname), () => {
  let framework: OpenapiFramework;

  beforeEach(() => {
    framework = new OpenapiFramework({
      apiDoc: path.resolve(__dirname, 'apiDoc.yml'),
      featureType: 'middleware',
      name: 'some-framework',
      paths: path.resolve(__dirname, 'paths'),
    });
  });

  it('should work', () => {
    framework.initialize({
      visitOperation(ctx) {
        expect(ctx.features.responseValidator).to.not.be.undefined;
        expect(ctx.features.requestValidator).to.be.undefined;
        expect(ctx.features.coercer).to.be.undefined;
        expect(ctx.features.defaultSetter).to.be.undefined;
        expect(ctx.features.securityHandler).to.be.undefined;
      },
      visitApi(ctx) {
        const apiDoc = ctx.getApiDoc();
        expect(apiDoc.paths['/{id}']).to.eql({
          parameters: [],
          get: {
            responses: {
              default: {
                description: 'return something',
                schema: {},
              },
            },
          },
        });

        expect(apiDoc.paths['/foo']).to.eql({
          parameters: [],
          get: {
            responses: {
              default: {
                description: 'return all foo',
                schema: {},
              },
            },
          },
        });

        expect(apiDoc.paths['/foo/{id}']).to.eql({
          parameters: [],
          get: {
            responses: {
              default: {
                description: 'return foo',
                schema: {},
              },
            },
          },
        });
      },
    });
  });
});
