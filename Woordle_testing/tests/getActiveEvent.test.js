const wordUtil = require('../routes/Utility/wordUtils'); // Import your function here
const dbUtils = require('../routes/Utility/dbUtils');

// Mock the executeQuery function from dbUtils
dbUtils.executeQuery = jest.fn();

describe('getActiveEvent', () => {
  it('should retrieve active events', async () => {
    // Mock the executeQuery function to return some data
    const mockEventData = [{ id: 1, word: 'event1', active: 1 }, { id: 2, word: 'event2', active: 1 }];
    dbUtils.executeQuery.mockResolvedValue(mockEventData);

    const result = await wordUtil.getActiveEvent();

    // Assertions
    expect(dbUtils.executeQuery).toHaveBeenCalledWith('SELECT * FROM EVENTS WHERE active = 1');
    expect(result).toEqual(mockEventData);
  });

  it('should handle errors', async () => {
    // Mock the executeQuery function to throw an error
    const mockError = new Error('Database error');
    dbUtils.executeQuery.mockRejectedValue(mockError);
  
    // Use try...catch to capture the error
    try {
      await wordUtil.getActiveEvent();
    } catch (error) {
      // Assertions
      expect(error.message).toBe('Database error');
    }
  
    // Ensure that an error was thrown
    expect.assertions(1);
  
    // Verify that the executeQuery function was called
    expect(dbUtils.executeQuery).toHaveBeenCalledWith('SELECT * FROM EVENTS WHERE active = 1');
  });
  
});
