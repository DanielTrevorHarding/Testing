import BodyFatCalculator from "../src/Classes/BodyFatCalculator";

const casesMale = [[40, 178, 50, 90, 62, 10.6], [40, 100, 50, 90, 62, 27.8]]
const caseFemale = [[40, 178, 50, 90, 62, 4.1], [40, 100, 50, 90, 62, 28.4]]
describe("Testing body fat calculator", () => {
  test.each(casesMale)("Testing when age is 25 and gender is male, weight: %p kg, height: %p cm, neck: %p cm, waist %p cm, hip %p cm",
    (first, second, third, fourth, fifth, expectedValue) => {
      const bodyFatCalc = new BodyFatCalculator("male", fourth, third, 20, second)
      const result = bodyFatCalc.calculateOperation()

      expect(result).toBe(expectedValue.toString())
    })

  test.each(caseFemale)("Testing when age is 25 and gender is female, weight: %p kg, height: %p cm, neck: %p cm, waist %p cm, hip %p cm, should equal %p",
    (first, second, third, fourth, fifth, expectedValue) => {
      const bodyFatCalc = new BodyFatCalculator("female", fourth, third, fifth, second)
      const result = bodyFatCalc.calculateOperation()

      expect(result).toBe(expectedValue.toString())
    })

  test("input invalid arguments", () => {
    const bodyFatCalc = new BodyFatCalculator("female", undefined, undefined, undefined, 170)

    function testCalculateOperation() {
      const result = bodyFatCalc.calculateOperation()
    }

    expect(testCalculateOperation).toThrow(new Error("Invalid argument to BodyFat calculator"))
  })
})
