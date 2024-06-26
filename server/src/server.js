const http = require('http');
const { mongoConnect } = require('./services/mongo');

require('dotenv').config();

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000;
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

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(
        PORT, 
        () => console.log(`Listening on port: ${PORT}`)
    );
}


startServer();