const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

const app = express();

app.use(cors({
    origin:'http://localhost:3000'
    // CORS is used when we a running the client and the
    // server on different ports
}));
app.use(morgan('combined'));

app.use(express.json()); // parses any JSON data that we receive
app.use(express.static(PUBLIC_PATH));

app.use('/v1', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});



module.exports = app;