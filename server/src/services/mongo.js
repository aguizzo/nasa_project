const mongoose = require('mongoose');

const USER = process.env.NASA_API_USERNAME;
const PASSWORD = process.env.NASA_API_PASSWORD;
const MONGO_URL = `mongodb+srv://${USER}:${PASSWORD}@mongocluster.xcxkkse.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa`;


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', err => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}