import Calculator from "../Interfaces/Calculator";

export default class BMICalculator implements Calculator {
  type = 'BMI'
  weight: number
  height: number
  units= "kg/m^2"

  constructor(weight: number, height: number) {
    if ( weight && height) {
      this.weight = weight
      this.height = height
    }else{
      throw new Error("Invalid input arguments to BMI calculator.")
    }
  }

  calculateOperation(): string {
    return (this.weight / ((this.height / 100) ** 2)).toFixed(1)
  }
}

