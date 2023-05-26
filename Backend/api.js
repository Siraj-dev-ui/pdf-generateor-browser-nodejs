const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(cors());

app.use('/report', reportRoutes);
const port = 5000;
app.listen(port);
