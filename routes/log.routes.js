'use strict';

const router = require('express').Router();
const prefix = '';

const controller_log = require('../controllers/logs.controller');

router.get(`${prefix}/`, controller_log.all);
router.post(`${prefix}/`, controller_log.create);
router.get(`${prefix}/:id`, controller_log.info);
router.put(`${prefix}/:id`, controller_log.update);
router.delete(`${prefix}/:id`, controller_log.delete);

module.exports = router;