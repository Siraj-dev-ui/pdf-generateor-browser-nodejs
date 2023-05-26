const express = require('express');
const routes = express.Router();
const controller = require('../controller/ReportController');

routes.get('/loadReport', controller.loadReport);
routes.get('/createPdf', controller.createPdf);
routes.get('/downloadPdf', controller.downloadPdf);

routes.get('/test', (req, res) => {
  res.send({ message: 'test from report routes' });
});

module.exports = routes;
