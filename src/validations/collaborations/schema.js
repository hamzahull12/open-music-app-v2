const Joi = require('joi');

const CollaborationsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  songId: Joi.string().required(),
});

module.exports = { CollaborationsPayloadSchema };
