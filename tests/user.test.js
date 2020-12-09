const request = require('supertest')
const { response } = require('../src/app')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: "Mike",
    email: "monster@inc.com",
    password: "whatever123"
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should register user', async () => {
    await request(app).post('/users').send({
        name:'Jinx',
        email:'x@y.com',
        password:'whatever123'
    }).expect(201)
})

test('Should log in existing users', async () => {
    await request(app).post('/users/login').send({
        name: "Mike",
        email: "monster@inc.com",
        password: "whatever123"
    }).expect(200)
})

test('Should not log in non-existing user', async () => {
    await request(app).post('/users/login').send({
        name: "Mike",
        email: "monster@inc.com",
        password: "whatever"
    }).expect(400)
})