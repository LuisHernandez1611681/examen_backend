'use strinct';

const Log = require('../models/log');
const Joi = require('joi');

class LogsController {

  async all (req, res, next) {
    let message = {};
    try {
      let arrayLogsDB = await Log.find();
      message = {
        "status": 200,
        "data": arrayLogsDB
      }
    } catch(error) {
      console.log(error);
      message = {"status": error.response.status, "data": error};
    }

    res.status(message['status']).json(message);

	}

	create(req, res, next) {
    let body = req.body;
    let message = {};
    try {
      let err = Log.joiValidateLog(body);
      if (err.hasOwnProperty('error')) {
        message = { "status": 400, "msg": err['error']['details'][0]['message'] };
      } else {
        let logDB = new Log(body);
        logDB.save()
        message = { "status": 200, "msg": 'Log creado correctamente.' };
      }
    } catch(error) {
      console.log(error);
      message = {"status": error.response.status, "msg": error};
    }
    res.status(message['status']).json(message);
	}

	async info(req, res, next) {
    let id = req.params.id;
    let message = {};

    try {
      let err = Joi.string().min(24).max(24).required();
      await err.validateAsync(id);

      let logDB = await Log.findOne({_id: id});
      message = { "data": logDB };
    } catch(error) {
      console.log(error);
      message = {"data": error['details'][0]['message']};
    }
    res.json(message).end();
	}

	async update(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    let message = {};

    try {
      let err_id = Joi.string().min(24).max(24).required();
      await err_id.validateAsync(id);


      let err = Log.joiValidateLog(body);

      if (err.hasOwnProperty('error')) {
        message = {
          "msg": err['error']['details'][0]['message']
        };
      } else {
        let logDB = await Log.findOneAndUpdate({_id: id}, body);
        if(logDB){
          message = {
            "msg": "Se actualizo exitosamente"
          }
        } else {
          message = {
            "msg": "No se actualizo"
          }
        }
      }

    } catch(error) {
      console.log(error);
      message = {"msg": error['details'][0]['message']};
    }

    res.json(message);
	}

	async delete(req, res, next) {
    let id = req.params.id;
    let message = {};
    try {

      let err_id = Joi.string().min(24).max(24).required();
      await err_id.validateAsync(id);

      let logDB = await Log.findOneAndDelete({_id: id});
      
      if(logDB){
        message = { "msg": 'Eliminado' }
      } else {
        message = { "msg": 'Fallo eliminar' }
      }
    } catch(error) {
      console.log(error);
      message = {"msg": error['details'][0]['message']};
    }
    res.json(message);
	}
}

module.exports = new LogsController();