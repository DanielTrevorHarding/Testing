const axios = require('axios');
const wordUtil = require('../routes/Utility/wordUtils');
const dbUtils = require('../routes/Utility/dbUtils');

// Mock the axios module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'mockedWord' })),
}));

// Mock the executeQuery function from dbUtils
dbUtils.executeQuery = jest.fn();

describe('createNewEvent', () => {
  it('should create a new event', async () => {
    // Mock the getActiveEvent function to return a resolved Promise with some data
    const mockActiveEventData = { id: 1, word: 'mockedWord', active: 1 };
    dbUtils.executeQuery.mockResolvedValue(mockActiveEventData);

    await wordUtil.createNewEvent();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(
      'https://random-word-api.vercel.app/api?words=1&length=5'
    );
    expect(dbUtils.executeQuery).toHaveBeenCalledWith('UPDATE EVENTS SET active = 0;');
    expect(dbUtils.executeQuery).toHaveBeenCalledWith(
      "INSERT INTO EVENTS (word, active) VALUES ('mockedWord', 1)"
    );
    expect(dbUtils.executeQuery).toHaveBeenCalledWith('SELECT * FROM EVENTS WHERE active = 1');
  });
});
