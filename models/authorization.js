const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorizationSchema = new Schema({
  token: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

authorizationSchema.static.joiValidateAuthorization = function(obj) {
  let Joi = require('joi');
  let schema = Joi.object({
    token: Joi.string().token()
  });
  return schema.validate(obj);
};

// Modelo
const Authorization = mongoose.model('Authorization', authorizationSchema);

module.exports = Authorization;