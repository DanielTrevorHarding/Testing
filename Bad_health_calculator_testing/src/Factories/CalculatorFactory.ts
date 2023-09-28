import Calculator from "../Interfaces/Calculator";
import BMRCalculator from "../Classes/BMRCalculator";
import BMICalculator from "../Classes/BMICalculator";
import BodyFatCalculator from "../Classes/BodyFatCalculator";

export interface CalculatorParams {
  weight: number,
  height: number,
  age?: number,
  gender?: string,
  hip?: number
  waist?: number
  neck?: number
}

export class CalculatorFactory {
  createCalculator(type: string, calculatorParams: CalculatorParams): Calculator {
    if(type === "BMI"){
      return new BMICalculator(calculatorParams.weight, calculatorParams.height)
    }else if(type === 'BMR'){
      return new BMRCalculator(calculatorParams.weight,calculatorParams.height, calculatorParams.age,
        calculatorParams.gender)
    }else if(type === "BF"){
      return new BodyFatCalculator(calculatorParams.gender, calculatorParams.waist, calculatorParams.neck,
        calculatorParams.hip, calculatorParams.height)
    }
    else {
      throw new Error("No calculator available for that request")
    }
  }
}
