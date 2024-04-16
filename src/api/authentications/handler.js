const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  //= ============login users with auth==================//

  async PostLoginUserHandler(request, h) {
    this._validator.PostValidateAuthentication(request.payload);

    const id = await this._usersService.verifyUserCredential(request.payload);
    const accessToken = this._tokenManager.generateAccessToken(id);
    const refreshToken = this._tokenManager.generateAccessToken(id);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    }).code(201);
    return response;
  }
}

module.exports = AuthenticationsHandler;
