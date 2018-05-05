var app;
var expect = require('chai').expect;
var expectedApiDoc = require('../../fixtures/with-external-schema-references-api-doc-after-initialization.json');
var request = require('supertest');

before(function() {
  app = require('./app.js');
});

it('should expose <apiDoc>.basePath/api-docs', function(done) {
  request(app)
    .get('/v3/api-docs')
    .set("Host", "test-host")
    .expect(200, expectedApiDoc, done);
});

it('should use direct references in parameter', function(done) {
  request(app)
    .post('/v3/users')
    .send({})
    .expect(400, {
      status: 400,
      errors:[
        {
          path: 'name',
          errorCode: 'required.openapi.validation',
          message: 'instance requires property \"name\"',
          location:'body'
        }
      ]
    }, done);
});

it('should use external references through local schema definition', function(done) {
  request(app)
    .delete('/v3/users/foo')
    .send({})
    .expect(400, {
      status: 400,
      errors:[
        {
          path: 'name',
          errorCode: 'required.openapi.validation',
          message: 'instance requires property \"name\"',
          location:'body'
        }
      ]
    }, done);
});

it('should use external references through local parameters definition', function(done) {
  request(app)
    .put('/v3/users/foo')
    .send({})
    .expect(400, {
      status: 400,
      errors:[
        {
          path: 'name',
          errorCode: 'required.openapi.validation',
          message: 'instance requires property \"name\"',
          location:'body'
        }
      ]
    }, done);
});

it('should use schema references through local schema definition reference in child schema of response', function(done) {
  request(app)
    .get('/v3/users?status=success')
    .expect(500, {
      errors: [
        {
          errorCode: "required.openapi.responseValidation",
          message: "response[0] requires property \"name\"",
          path: "response[0]"
        }
      ],
      message: 'The response was not valid.',
      status: 500
    }, done);
});

it('should use schema references through local schema definition reference in response', function(done) {
  request(app)
    .get('/v3/users?status=method-not-allowed')
    .expect(500, {
      errors: [
        {
          errorCode: "type.openapi.responseValidation",
          message: "response is not of a type(s) string"
        },
        {
          errorCode: 'enum.openapi.responseValidation',
          message: 'response is not one of enum values: error'
        }
      ],
      message: 'The response was not valid.',
      status: 500
    }, done);
});

it('should use schema references through local response definition reference', function(done) {
  request(app)
    .get('/v3/users?status=forbidden')
    .expect(500, {
      errors: [
        {
          errorCode: "type.openapi.responseValidation",
          message: "response is not of a type(s) string"
        },
        {
          errorCode: 'enum.openapi.responseValidation',
          message: 'response is not one of enum values: error'
        }
      ],
      message: 'The response was not valid.',
      status: 500
    }, done);
});

it('should use schema references in child schema of response', function(done) {
  request(app)
    .get('/v3/users?status=tea-pod')
    .expect(500, {
      errors: [
        {
          errorCode: "allOf.openapi.responseValidation",
          message: "response does not match allOf schema <http://example.com/tea-pod> with 1 error[s]:"
        },
        {
          errorCode: "required.openapi.responseValidation",
          message: "response requires property \"content\""
        }
      ],
      message: 'The response was not valid.',
      status: 500
    }, done);
});

it('should use schema references in response', function(done) {
  request(app)
    .get('/v3/users?status=error')
    .expect(500, {
      errors: [
        {
          errorCode: "type.openapi.responseValidation",
          message: "response is not of a type(s) string"
        },
        {
          errorCode: 'enum.openapi.responseValidation',
          message: 'response is not one of enum values: error'
        }
      ],
      message: 'The response was not valid.',
      status: 500
    }, done);
});
