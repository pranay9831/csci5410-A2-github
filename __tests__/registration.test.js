const Firestore = require('@google-cloud/firestore');
const app = require('../registration');
const request = require('supertest');

describe('POST /register', () => {
  beforeEach(() => {
    
    Firestore.mocks.get.mockReset();
    Firestore.mocks.set.mockReset();
    Firestore.FieldValue.serverTimestamp.mockReset();
  });

  test('responds with json and status 201 on successful registration', async () => {
   
    Firestore.mocks.get.mockResolvedValue({
      exists: false,
    });

    const response = await request(app)
      .post('/register')
      .send({
        name: 'test user',
        password: 'password123',
        email: 'testuser@gmail.com',
        location: 'test location',
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.text).response).toBe('User Registration Successful');
  });

  test('responds with json and status 400 on registration with already existing email', async () => {
    
    Firestore.mocks.get.mockResolvedValue({
      exists: true,
    });

    const response = await request(app)
      .post('/register')
      .send({
        name: 'test user',
        password: 'password123',
        email: 'testuser@gmail.com',
        location: 'test location',
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Email already Exists');
  });
});
