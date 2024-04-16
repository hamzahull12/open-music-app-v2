const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserpayload(request.payload);
    const userId = await this._service.addUser(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    }).code(201);
    return response;
  }
}

module.exports = UsersHandler;
