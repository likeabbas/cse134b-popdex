export default class filterService {
  static filter (oldListOfBrands, oldbrands, thisString) {
    var listOfBrands = oldListOfBrands.slice()
    var brandsObject = Object.assign({}, oldbrands)

    var listOfKeys = listOfBrands.filter(function (thisElement) {
      return (thisElement.toLowerCase().indexOf(thisString.toLowerCase()) === -1)
    })
    var brandsObjectKeys = Object.keys(brandsObject)
    for (var i = 0; i < listOfKeys.length; i++) {
      var brandName = listOfKeys[i]

      for (var j = 0; j < brandsObjectKeys.length; j++) {
        var uid = brandsObjectKeys[j]
        console.log(uid)
        var brandObject = brandsObject[uid]
        if (brandName === brandObject.brand) {
          delete brandsObject[uid]
          brandsObjectKeys.splice(j, 1)
          break
        }
      }
    }
    return brandsObject
  }
}
