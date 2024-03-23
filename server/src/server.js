const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const USER = process.env.NASA_API_USERNAME;
const PASSWORD = process.env.NASA_API_PASSWORD;
const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@mongocluster.xcxkkse.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa`;

/**
 * HOW TO SET ENV VARIABLES ON WINDOWS:
 * set PORT=5000 && node...
 * HOW TO SET ENV VARIABLES ON SHELL:
 * PORT=5000 node
 */

/**
 * SETTING NPM DEFAULT SHELL TO BASH ON WINDOWS:
 * npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
 */

/**
 * REVERTING TO WINDOWS SHELL
 * npm config delete script-shell
 */

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', err => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();
    server.listen(
        PORT, 
        () => console.log(`Listening on port: ${PORT}`)
    );
}


startServer();