// System modules
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// System module configurations
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use('/', require(path.join(__dirname, './routes/index')));

app.listen(port, () => console.log(`Server (app) listening on port ${port}!`))