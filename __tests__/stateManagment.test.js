const request = require('supertest');
const stateManagement = require('../stateManagment'); // update with your actual path
const Firestore = require('@google-cloud/firestore');

jest.mock('@google-cloud/firestore');

describe('GET /online-users', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    Firestore.mocks.get.mockReset();
  });

  it('responds with json and status 200 on fetching online users', async () => {
    // Mock Firestore get method to return two online users
    Firestore.mocks.where.mockReturnValueOnce(Promise.resolve({
        docs: [
          {
            data: jest.fn(() => ({ email: 'user1@example.com', status: 'online' })),
          },
          {
            data: jest.fn(() => ({ email: 'user2@example.com', status: 'online' })),
          },
        ],
      }));

    const response = await request(stateManagement).get('/online-users').set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(expect.arrayContaining([
      { email: 'user1@example.com' },
      { email: 'user2@example.com' }
    ]));
  });
});

describe('POST /logout', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    Firestore.mocks.get.mockReset();
    Firestore.mocks.set.mockReset();
  });

  it('responds with json and status 200 on successful logout', async () => {
    // Mock Firestore get method to return a user currently online
    Firestore.mocks.get.mockResolvedValue({
      data: () => ({ status: 'online' }),
    });

    const response = await request(stateManagement)
      .post('/logout')
      .send({ email: 'test@example.com' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Logged Out successfully');
  });

  it('responds with json and status 200 when user already logged out', async () => {
    // Mock Firestore get method to return a user currently offline
    Firestore.mocks.get.mockResolvedValue({
      data: () => ({ status: 'offline' }),
    });

    const response = await request(stateManagement)
      .post('/logout')
      .send({ email: 'test@example.com' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('User already logged out');
  });
});
