export const regExValidators = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  charactersOnly: /^[a-zA-Z]+$/g,
  charactersAndNumbersOnly: /^[a-zA-Z0-9]{5,}$/g,
  charactersNumbersSpaces: /^[a-zA-Z0-9\s]*$/g,
  numbersOnly: /^\d+$/,
  parametersStructure: /^([a-zA-Z]\w*|\d+)(,\s*([a-zA-Z]\w*|\d+))*$/,
  snakeCase: /^[a-z]+(?:_[a-z]+)*$/,
  /* 
    Password must contains:
    - at least 8 characters
    - 1 number
    - 1 special character
    - 1 capital letter
    - 1 lowercase letter
  */
  securePassword: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/g
}