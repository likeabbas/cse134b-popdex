export default class UserService {
  writeNewUserAccount (user, firebase) {
    var ref = firebase.database().ref('users/' + user.uid)
    ref.set({
      provider: user.providerData[0].providerId,
      username: user.displayName,
      email: user.email
    })
  }

  getPops (firebase, brand) {
    var user = firebase.auth().currentUser
    return firebase.database().ref('/users/' + user.uid + '/pops/' + brand)
      .once('value')
  }

  fillData (firebase) {
    var user = firebase.auth().currentUser
    var popRef = firebase.database().ref('/pops/Adventure_Time/')
    var ref = firebase.database().ref('/users/' + user.uid + '/pops/Adventure Time')
    popRef.once('value').then(function (snapshot) {
      console.log('got test data')
      ref.set(snapshot.val())
    })

    var popRef2 = firebase.database().ref('/pops/Teenage_Mutant Ninja Turtles')
    var ref2 = firebase.database().ref('/users/' + user.uid + '/pops/TMNT')
    popRef2.once('value').then(function (snapshot) {
      console.log('got test data')
      ref2.set(snapshot.val())
    })
  }

  deleteItemDB (firebase, uid) {
    var user = firebase.auth().currentUser
    firebase.database().ref('/users/' + user.uid + '/pops/' + uid).set(null)
  }
}
