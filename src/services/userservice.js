export default class UserService {
  static writeNewUserAccount (user, firebase) {
    var ref = firebase.database().ref('users/' + user.uid)
    ref.set({
      provider: user.providerData[0].providerId,
      username: user.displayName,
      email: user.email
    })
  }

  static getPops (firebase, brand) {
    var user = firebase.auth().currentUser
    return firebase.database().ref('/users/' + user.uid + '/pops/' + brand)
      .once('value')
  }

  static fillData (firebase) {
    var user = firebase.auth().currentUser
    var popRef = firebase.database().ref('/pops/Adventure Time/')
    var ref = firebase.database().ref('/users/' + user.uid + '/pops/Adventure Time')
    popRef.once('value').then(function (snapshot) {
      console.log('got test data')
      ref.set(snapshot.val())
    })

    var popRef2 = firebase.database().ref('/pops/Teenage Mutant Ninja Turtles')
    var ref2 = firebase.database().ref('/users/' + user.uid + '/pops/TMNT')
    popRef2.once('value').then(function (snapshot) {
      console.log('got test data')
      ref2.set(snapshot.val())
    })
  }

  static deleteItemDB (firebase, brand, gallery, uid) {
    var user = firebase.auth().currentUser
    console.log('/users/' + user.uid + '/' + gallery + '/pops/' + brand + '/' + uid)
    firebase.database()
      .ref('/users/' + user.uid + '/' + gallery + '/pops/' + brand + '/' + uid)
      .set(null)
  }

  static modifyCollection (firebase, user, brand, uid, item, action) {
    if (action === 'remove') {
      item = null
    }
    firebase.database()
    .ref('/users/' + user.uid + '/collection/pops/' + brand + '/' + uid)
    .set(item)
  }

  static updateQuantity (firebase, user, brand, uid, item, newQuantity) {
    item.quantity = newQuantity
    firebase.database()
    .ref('/users/' + user.uid + '/collection/pops/' + brand + '/' + uid)
    .set(item)
  }

  static modifyWishlist (firebase, user, brand, uid, item, action) {
    if (action === 'remove') {
      item = null
    }
    firebase.database()
    .ref('/users/' + user.uid + '/wishlist/pops/' + brand + '/' + uid)
    .set(item)
  }

  static getItems (firebase, type, gallery) {
    var user = firebase.auth().currentUser
    if (user === null || user === undefined) {
      return null
    }
    return firebase.database()
    .ref('/users/' + user.uid + '/' + gallery + '/' + type)
    .orderByKey()
  }

  static checkForItem (firebase, user, brand, uid) {
    var itemRef = firebase.database()
    .ref('/users/' + user.uid + '/collection/pops/' + brand + '/' + uid)
    return itemRef.once('value')
  }
}
