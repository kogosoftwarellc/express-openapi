module.exports = {
  GET
};

function GET() {
  return;
}
GET.apiDoc = {
  responses: {
    default: {
      $ref: '#/responses/FooResponse'
    }
  }
};
