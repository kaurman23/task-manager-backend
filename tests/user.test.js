const request = require('supertest')
const app = require('../src/app')

test('Should register user', async () => {
    await request(app).post('/users').send({
        name:'Jinx',
        email:'x@y.com',
        password:'whatever123'
    }).expect(201)
})