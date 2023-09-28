const wordUtil = require('../routes/Utility/wordUtils');
const axios = require('axios');

// Mock the axios module
jest.mock('axios');

describe('getWord', () => {
  it('should retrieve a random word', async () => {
    // Define the mock response data
    const mockResponse = {
      data: 'mockedWord',
    };

    // Mock the Axios.get function to return the mock response
    axios.get.mockResolvedValue(mockResponse);

    // Call the getWord function
    const word = await wordUtil.getWord();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(
      'https://random-word-api.vercel.app/api?words=1&length=5'
    );
    expect(word).toBe('mockedWord');
  });
});
