module.exports = {
  parameters: [
    {
      $ref: 'http://example.com/foo#/parameters/Boo'
    }
  ],
  get: function(req, res, next) {
    var statusCode = req.query.foo === 'success' ?
      200 :
      500;
    var errors = res.validateResponse(statusCode, req.query.boo);
    res.status(statusCode).json(errors);
  },
  // handling no method doc
  post: function() {}
};

module.exports.get.apiDoc = {
  description: 'Get foo.',
  operationId: 'getFoo',
  tags: ['foo'],
  parameters: [
    {
      $ref: 'http://example.com/foo#/parameters/Foo'
    }
  ],
  responses: {
    200: {
      $ref: 'http://example.com/foo#/responses/SuccessResponse'
    },
    default: {
      $ref: 'http://example.com/error'
    }
  }
};
