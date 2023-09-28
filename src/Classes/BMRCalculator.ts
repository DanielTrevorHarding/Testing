import Calculator from "../Interfaces/Calculator";

export default class BMRCalculator implements Calculator {
  type = 'Basal Metabolic Rate'
  weight: number
  height: number
  age?: number
  gender?: string
  units = "calories/day"
  constructor(weight: number, height: number, age: number | undefined, gender: string | undefined) {
    this.weight = weight
    this.height = height
    this.age = age
    this.gender = gender
  }

  calculateOperation(): string {
    if(!this.age || !this.gender || !this.weight || !this.height){
      throw new Error("Invalid parameters for BMR calculator")
    }
    if (this.gender === 'male') {
      return (10 * (this.weight) + 6.25 * (this.height) - 5 * (this.age) + 5).toFixed(0)
    }
    return (10 * (this.weight) + 6.25 * (this.height) - 5 * (this.age) - 161).toFixed(0)
  }
}
