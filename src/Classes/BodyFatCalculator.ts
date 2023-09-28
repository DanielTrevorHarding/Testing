import Calculator from "../Interfaces/Calculator";

export default class BodyFatCalculator implements Calculator {
  type: string = "Body Fat"
  units="%"
  gender?: string
  waist: number | undefined
  neck: number | undefined
  hip: number | undefined
  height: number

  constructor(gender: string | undefined, waist: number | undefined, neck: number | undefined, hip: number | undefined, height: number) {
    this.height = height
    this.hip = hip
    this.neck = neck
    this.waist = waist
    this.gender = gender
  }

  calculateOperation(): string {

    if(!this.waist || !this.hip || !this.neck || !this.height || !this.gender){
      throw new Error("Invalid argument to BodyFat calculator")
    } else {
      if (this.gender === 'male') {

        return ((495 / (1.0324 - 0.19077 * Math.log10(this.waist - this.neck) + 0.15456 * Math.log10(this.height))) - 450).toFixed(1)
      } else {

        return ((495 / (1.29579 - 0.35004 * Math.log10(this.waist + this.hip - this.neck) + 0.22100 * Math.log10(this.height))) - 450).toFixed(1)
      }
    }
  }
}
