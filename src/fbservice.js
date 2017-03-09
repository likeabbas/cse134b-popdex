export default class FBService {
  static fetchTrending (firebase) {
    var popRef = firebase.database().ref('/pops/Stranger Things/')
    return popRef.once('value')
  }
}
