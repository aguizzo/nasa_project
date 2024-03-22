const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = [];
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
            .on('data', data => {
                if (isHabitablePlanet(data))
                    habitablePlanets.push(data);
            })
            .on('error', err => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};
