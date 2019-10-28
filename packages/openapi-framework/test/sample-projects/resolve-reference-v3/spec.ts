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
      paths: path.resolve(__dirname, 'paths')
    });
  });

  it('should resolve reference for requestBody', () => {
    framework.initialize({
      visitOperation(ctx) {
        expect(ctx.features.requestValidator).to.not.be.undefined;
        const err = ctx.features.requestValidator.validateRequest({
          body: { title: 'test' },
          headers: { 'content-type': 'application/json' }
        });
        expect(err).to.be.undefined;
      }
    });
  });
});
