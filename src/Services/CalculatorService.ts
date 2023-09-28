import {CalculatorFactory} from "../Factories/CalculatorFactory";

export function CalculateBMI(weight: number, height: number) {
  const calculatorParams = {
    weight: weight,
    height: height
  }

  try {

    const calculator = new CalculatorFactory().createCalculator("BMI",calculatorParams);
    const calculatorResult = calculator.calculateOperation()

    return {
      "type": calculator.type,
      "input": calculatorParams,
      "result": calculatorResult,
      "units": calculator.units
    }

  }catch (error) {
    throw error
  }

}

export function CalculateBMR(weight: number, height: number, age: number, gender: string) {
  const calculatorParams = {
    weight: weight,
    height: height,
    age: age,
    gender: gender
  }

  try {

    const calculator = new CalculatorFactory().createCalculator("BMR", calculatorParams);
    const calculatorResult = calculator.calculateOperation()
    return {
      "type": calculator.type,
      "input": calculatorParams,
      "result": calculatorResult,
      "units": calculator.units
    }
  }catch (error) {
    throw error
  }
}

export function CalculateBodyFat(weight: number, height: number, age: number, gender: string, waist: number, hip: number, neck:number) {
  const calculatorParams = {
    weight: weight,
    height: height,
    age: age,
    gender: gender,
    waist: waist,
    hip: hip,
    neck: neck
  }

  try {

    const calculator = new CalculatorFactory().createCalculator("BF", calculatorParams);
    const calculatorResult = calculator.calculateOperation()
    return {
      "type": calculator.type,
      "input": calculatorParams,
      "result": calculatorResult,
      "units": calculator.units
    }
  }catch (error) {
    throw error
  }
}
