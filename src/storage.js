// Initialize Firebase
var fb = require('firebase')
var config = {
  apiKey: 'AIzaSyB5wB7nH0xRovf3iZ2QnCcF_LAD3mGBE6s',
  authDomain: 'popsdex-475f1.firebaseapp.com',
  databaseURL: 'https://popsdex-475f1.firebaseio.com',
  storageBucket: 'popsdex-475f1.appspot.com',
  messagingSenderId: '388031530033'
}
fb.initializeApp(config)

module.exports = {
  debug: true,
  firebase: fb,
  state: {
    message: 'Hello!',
    auth: {
      user: null,
      credential: null,
      email: '',
      password: '',
      message: '',
      userName: '',
      hasErrors: false
    }
  },
  userlink: null,
  setMessageAction (newValue) {
    this.debug && console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    this.debug && console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
