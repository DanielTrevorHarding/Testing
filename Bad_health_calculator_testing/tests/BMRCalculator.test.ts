import {CalculatorParams} from "../src/Factories/CalculatorFactory";
import BMRCalculator from "../src/Classes/BMRCalculator";

const casesMale = [[80, 175, 1799], [50, 130, 1218], [20, 360, 2355]]
const casesFemale = [[80, 175, 1633], [50, 130, 1052], [20, 360, 2189]]

describe('Testing BMR Calculator Operation, if all inputs valid', () => {
  test.each(casesMale)("Testing %pkg and %p cm heightm where gender is male and age is 20, should return %p",
    (firstArgument, secondArgument, expectedValue) => {
      const calculatorParam: CalculatorParams = {
        gender: 'male',
        age: 20,
        height: secondArgument,
        weight: firstArgument
      }
      const getCalculator = new BMRCalculator(firstArgument, secondArgument, calculatorParam.age, calculatorParam.gender)

      const result = getCalculator.calculateOperation()
      expect(result).toBe(expectedValue.toString())
    })

  test.each(casesFemale)("Testing %pkg and %p cm heightm where gender is female and age is 20, should return %p",
    (firstArgument, secondArgument, expectedValue) => {
      const calculatorParam: CalculatorParams = {
        gender: 'female',
        age: 20,
        height: secondArgument,
        weight: firstArgument
      }
      const getCalculator = new BMRCalculator(firstArgument, secondArgument, calculatorParam.age, calculatorParam.gender)

      const result = getCalculator.calculateOperation()
      expect(result).toBe(expectedValue.toString())
    })

  test("Testing with invalid parameters", () => {
    function createNewCalc() {
      const calculator = new BMRCalculator(50, 150, undefined, "male")
      const result = calculator.calculateOperation()
    }

    expect(createNewCalc).toThrow(new Error("Invalid parameters for BMR calculator"))
  })
})
