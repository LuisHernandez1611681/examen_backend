
const Authorization = require('../models/authorization');

exports.ensureAuthenticated =  async function (req, res, next) {
  // Verificamos que nos este mandando el encabezado de authorization
  if(!req.headers.authorization){
    return res.status(401).send({message: 'Tu peticion no tiene cabecera de autorización'});
  }

  let token = req.headers.authorization.split(" ")[1];

  // Validamos que el token cuente con Bearer al prinicipio
  if(req.headers.authorization.split(" ")[0] != 'Bearer'){
    return res.status(403).send({message: 'El token debe comenzar con Bearer'});
  }

  // Buscamos en la db si coincide el token
  let authorizationDB = await Authorization.findOne({ token: token});

  // Si encuentra el resultado continua y si no manda un error
  if(authorizationDB){
    next();
  } else {
    return res.status(403).send({message: 'Token invalido'});
  }
};