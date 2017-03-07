
export default class LoginService {
  validatePassword (pass, confirmed) {
    if (pass.length > 0 && pass === confirmed) {
      return true
    }
    return false
  }
  validateEmail (email) {
    if (email.length > 0) {
      return true
    }
    return false
  }

  passwordSecurity (password) {
    if (password.length > 0) {
      return true
    }
    return false
  }
}
