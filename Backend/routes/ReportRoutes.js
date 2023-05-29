const express = require('express');
const routes = express.Router();
const controller = require('../controller/ReportController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log('log file in file filter : ', file);
  const directoryUrl = path.join(__dirname, '../files/' + file.originalname);
  console.log('local path : ', directoryUrl);
  console.log('files exists = ', fs.existsSync(directoryUrl));
  fs.existsSync(directoryUrl) ? cb(null, false) : cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
// const upload = multer({ storage: fileStorage });

routes.get('/loadReport', controller.loadReport);
routes.get('/createPdf', controller.createPdf);
routes.get('/downloadPdf', controller.downloadPdf);
routes.post('/uploadFile', upload.single('file'), controller.uploadFile);

routes.get('/test', (req, res) => {
  res.send({ message: 'test from report routes' });
});

module.exports = routes;
