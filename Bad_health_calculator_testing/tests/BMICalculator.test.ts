import BMICalculator from "../src/Classes/BMICalculator";

const cases = [[80, 175, 26.1], [50, 130, 29.6], [20, 360, 1.5]]
describe('Testing BMI Calculator Operation, if all inputs valid', () => {
  test.each(cases)("Testing %p and %p cm height, should return %p",
    (firstArgument, secondArgument, expectedValue) => {
      const getCalculator = new BMICalculator(firstArgument, secondArgument)

      const result = getCalculator.calculateOperation()
      expect(result).toBe(expectedValue.toString())
    })
})
