const validator = require('validator')

const isEmpty = require('../utils/isEmpty')

const register = data => {
  let errors = [], isValid

  const { name, username, password, password2 } = data
  
  if(!name) {
    errors.push({field: "name", message: 'name field is required'})
  } else if(!username) {
    errors.push({field: "username", message: 'username field is required'})
  } else if(!password) {
    errors.push({field: "password", message: 'password field is required'})
  } else {
    if (!validator.isLength(name, { min: 3, max: 255 }))
      errors.push({
        field: "name",
        message: 'name must be between 3 and 255 characters'
      })

    if (!validator.isLength(name, { min: 3, max: 255 }))
      errors.push({
        field: "username",
        message: 'username is not valid'
      })

    if (!validator.matches(password, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/i))
      errors.push({
        field: "password",
        message: "password must be minimum six characters, at least one letter, one number and one special character"
      })
    else {
      if (password !== password2) {
        errors.push({
          field: "password2",
          message: "password confirm does not match"
        })
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const login = data => {
  let errors = [], isValid

  const { username, password } = data
  if (!username || !password)
    errors.push(
      {
        field: "username",
        message: "username field is required"
      }, 
      {
        field: "password",
        message: "password field is required"
      }
    )

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = {
  register,
  login
}