const request = require('supertest');

const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const app = require('../../app');
const API_VERSION = '/v1'

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    /**
     * Here we are connecting to our production Database.
     * For the test we should use a specifici database for tests.
     */
    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /laucnches', () => {
        test('It should respond with 200 sucess', async () => {
            const response = await request(app)
                .get(`${API_VERSION}/launches`)
                .expect('Content-Type', /json/)
                .expect(200);
            // expect(response.statusCode).toBe(200); jest aproach
    
        });
    });
    
    describe('Test POST /launch', ()=> {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028'
        };
    
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
        };
    
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: "date"
        };
    
    
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post(`${API_VERSION}/launches`)
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post(`${API_VERSION}/launches`)
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                 error: 'Missing required lauch property'
            });
        });
    
        test('It should catch invalid dates,', async () => {
            const response = await request(app)
                .post(`${API_VERSION}/launches`)
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                 error: 'Invalid launch date'
            });
        });
    });
});
