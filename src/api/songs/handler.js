const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    }).code(201);
    return response;
  }

  async getSongsHandler() {
    const song = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs: song,
      },
    };
  }
}

module.exports = SongsHandler;
