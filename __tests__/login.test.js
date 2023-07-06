const request = require('supertest');
const login = require('../login');
const Firestore = require('@google-cloud/firestore');

describe('POST /login', () => {
  beforeEach(() => {
    
    Firestore.mocks.get.mockReset();
    Firestore.mocks.set.mockReset();
    Firestore.FieldValue.serverTimestamp.mockReset();
  });

  it('responds with json and status 201 on successful login', async () => {
    
    Firestore.mocks.get.mockResolvedValue({
      exists: true,
      data: () => ({
        password: 'password123',
      }),
    });

    const response = await request(login)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.text).response).toBe('Success Login');
  });

  it('responds with json and status 400 on failed login', async () => {
    
    Firestore.mocks.get.mockResolvedValue({
      exists: true,
      data: () => ({
        password: 'differentPassword',
      }),
    });

    const response = await request(login)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword',
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).response).toBe('Invalid Credentials');
  });
});
