export const add = (a, b) => {
    return a + b;
  };
  
  export const subtract = (a, b) => {
    return a - b;
  };
  
  export const multiply = (a, b) => {
    return a * b;
  };
  
  export const divide = (a, b) => {
    if (b === 0) {
        return 0;
    }

    return a / b;
  };
  
  export const squareRoot = (num) => {
    return Math.sqrt(num);
  };
  
  export const power = (base, exponent) => {
    return Math.pow(base, exponent);
  };
  
  export const absolute = (num) => {
    return Math.abs(num);
  };
  
  export const round = (num, decimalPlaces) => {
    if (decimalPlaces === undefined) {
      return Math.round(num);
    } else {
      const multiplier = power(10, decimalPlaces);
      return divide(Math.round(num * multiplier), multiplier);
    }
  };

  export const roundPercentage = (numerator, denominator) => {
    return round(multiply(divide(numerator, denominator), 100), 2);
  };
