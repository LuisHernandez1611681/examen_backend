const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let aplicationSchema = new Schema({
  name: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

aplicationSchema.static.joiValidateAplication = function(obj) {
  let Joi = require('joi');
  let schema = Joi.object({
    name: Joi.string().required()
  });
  return schema.validate(obj);
}

// Modelo
const Aplication = mongoose.model('Aplication', aplicationSchema);

module.exports = Aplication;