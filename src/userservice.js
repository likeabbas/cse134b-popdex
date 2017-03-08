export default class UserService {
  writeNewUserAccount (user, firebase) {
    var ref = firebase.database().ref('users/' + user.uid)
    ref.set({
      provider: user.providerData[0].providerId,
      username: user.displayName,
      email: user.email
    })
  }

  getPops (firebase) {
    var user = firebase.auth().currentUser
    return firebase.database().ref('/users/' + user.uid + '/pops')
      .once('value')
  }

  fillData (firebase) {
    var user = firebase.auth().currentUser
    var popRef = firebase.database().ref('/pops/Adventure_Time/')
    var ref = firebase.database().ref('/users/' + user.uid + '/pops')
    popRef.once('value').then(function (snapshot) {
      console.log('got test data')
      ref.set(snapshot.val())
    })
  }
}
