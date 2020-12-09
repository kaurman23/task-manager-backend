const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const { response } = require('../src/app')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: "Mike",
    email: "monster@inc.com",
    password: "whatever123",
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
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

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should get user profile without authentication', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(400)
})

test('Should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should delete user profile without authentication', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(400)
})