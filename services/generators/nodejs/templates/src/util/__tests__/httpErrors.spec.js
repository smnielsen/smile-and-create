const { expect } = require('chai');
const { createError } = require('../httpErrors');

describe('[httpErrors] Error Handling', () => {
  it('should set status to 500 (Internal Error) as default', () => {
    const error = createError('error-message');
    expect(error.message).to.equal('error-message');
    expect(error.status).to.equal(500);
  });

  it('should set status if statusCode provided', () => {
    const error = createError('error-message', {
      statusCode: 400,
    });
    expect(error.status).to.equal(400);
  });
});
