export default class filterService {
  static filterBrands (allBrands, thisString) {
    var filtered = allBrands.filter(function (brand) {
      return (brand.brand.toLowerCase().indexOf(thisString.toLowerCase()) !== -1)
    })

    return filtered
  }

  static filterItems (originallistOfItemNames, originalItems, thisString) {
    var listOfItems = originallistOfItemNames.slice()
    var items = Object.assign({}, originalItems)

    var newItemNames = listOfItems.filter(function (thisElement) {
      return (thisElement.toLowerCase().indexOf(thisString.toLowerCase()) === -1)
    })

    var itemObjectKeys = Object.keys(items)
    for (var i = 0; i < newItemNames.length; i++) {
      var curItemName = newItemNames[i]

      for (var j = 0; j < itemObjectKeys.length; j++) {
        var uid = itemObjectKeys[j]
        var itemObject = items[uid]

        if (curItemName === itemObject.name) {
          delete items[uid]
          itemObjectKeys.splice(j, 1)
          break
        }
      }
    }
    return items
  }
}
