export default class LoginService {
  static validatePassword (pass, confirmed) {
    if (pass.length > 0 && pass === confirmed) {
      return true
    }
    return false
  }
  static validateEmail (email) {
    console.log('validating email ' + email)
    if (email.length > 0) {
      return true
    }
    return false
  }
  static passwordSecurity (password) {
    if (password.length > 0) {
      return true
    }
    return false
  }
  static validateUsername (uname) {
    if (uname.length > 0) {
      return true
    }
    return false
  }
}
