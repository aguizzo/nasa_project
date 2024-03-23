const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

const DATA_PATH = path.join(__dirname, '..', '..', 'data','kepler_data.csv')

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] <1.11 &&
        planet['koi_prad'] < 1.6;
}

/**
 * const promise = new Promise((resolve, reject) => {
 *  resolve(42);
 * });
 * 
 * promise.then(result => {
 * 
 * });
 * 
 * const result = await promise; we wait for resolve of the promise
 */

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(DATA_PATH) // This a data stream
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async data => {
                if (isHabitablePlanet(data)){
                    savePlanet(data);
                }
            })
            .on('error', err => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
}

async function savePlanet(planet) {
    // insert + update = upsert
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true
        });
    }
    catch(err) {
        console.error(`Could not save planet ${err}`);
    }
}

async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0
        ,'__v': 0
    });
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};
