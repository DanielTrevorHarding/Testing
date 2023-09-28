const request = require('supertest');
const authUtils = require('../routes/Utility/authUtils');
authUtils.isLoggedIn = jest.fn((_, __, next) => next());
const app = require('../index');
const dbUtils = require('../routes/Utility/dbUtils');

dbUtils.executeQuery = jest.fn();

describe('getNewEvent', () => {
  it('should return 200', async () => {
    const mockActiveEventData = { id: 1, word: 'mockedWord', active: 1 };
    dbUtils.executeQuery.mockResolvedValue([mockActiveEventData]);

    const response = await request(app).get('/Game/GetChallenge').set('content-type', 'application/json').send();

    expect(response.status).toBe(200);
    expect(await response.body).toStrictEqual({'word' : 'mockedWord'});
    expect(dbUtils.executeQuery).toHaveBeenCalledTimes(1);
    expect(authUtils.isLoggedIn).toHaveBeenCalledTimes(1);

  });
});