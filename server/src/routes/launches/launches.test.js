const request = require('supertest');

const app = require('../../app');

describe('Test GET /laucnches', () => {
    test('It should respond with 200 sucess', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(response.statusCode).toBe(200); jest aproach

    });
});

describe('Test POST /launch', ()=> {
    test('It should respond with 201 success', () => {

    });

    test('It should catch missing required properties', () => {

    });

    test('It should catch invalid dates,', () => {

    });
});