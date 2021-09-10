const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let logSchema = new Schema({
  type: { 
    type: String, 
    enum: {
      values: ['error', 'info', 'warning'],
      message: '{VALUE} is not supported'
    }
  },
  priority: { 
    type: String, 
    enum: { 
      values: ['lowest', 'low', 'medium', 'high', 'highest'],
      message: '{VALUE} is not supported'
    }
  },
  path: String,
  message: String,
  request:  Schema.Types.Mixed,
  response:  Schema.Types.Mixed
},  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

logSchema.statics.joiValidateLog = function(obj) {
  let Joi = require('joi');

  let schema = Joi.object({
    type: Joi.string().valid('error', 'info', 'warning').required(),
    priority:  Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
    path: Joi.string().required(),
    message: Joi.string().required(),
    request: Joi.any().required(),
    response:  Joi.any().required()
  });

  return schema.validate(obj)
}

// Modelo
const Log = mongoose.model('Log', logSchema);

module.exports = Log;