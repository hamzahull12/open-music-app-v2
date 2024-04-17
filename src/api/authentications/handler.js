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

  async postLoginUserHandler(request, h) {
    this._validator.PostValidateAuthentication(request.payload);

    const id = await this._usersService.verifyUserCredential(request.payload);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });
    await this._authenticationsService.addRefreshToken(refreshToken);
    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    }).code(201);
    return response;
  }

  async putRefreshTokenHandler(request) {
    this._validator.PutValidateAuthentication(request.payload);

    const { refreshToken } = request.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const id = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }
}

module.exports = AuthenticationsHandler;
