export const regExValidators = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  charactersOnly: /^[a-zA-Z]+$/g,
  charactersAndNumbersOnly: /^[a-zA-Z0-9]{5,}$/g,
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