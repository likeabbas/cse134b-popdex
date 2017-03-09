export default class FBService {
  static fetchTrending (firebase) {
    var popRef = firebase.database().ref('/pops/Stranger Things/')
    return popRef.once('value')
  }

  static fetchBrands (firebase) {
    return firebase.database().ref('/pops/brands').once('value')
  }

  static fetchByBrand (firebase, brand) {
    return firebase.database().ref('/pops/' + brand).once('value')
  }
}
