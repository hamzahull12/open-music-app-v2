const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  token: Joi.string().required(),
});

const PutAuthenticationPayloadSchema = Joi.object({
  token: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  token: Joi.string().required(),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
