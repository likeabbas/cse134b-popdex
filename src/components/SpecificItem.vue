<template>
  <div class="content container">
    <p>fuck me</p>
    <div class="row">
    
      <ItemView  
        v-bind:itemBrand="item.itemBrand" 
        v-bind:itemName="item.itemName" 
        v-bind:itemPictureSource="item.itemPictureSource">
      </ItemView>

      <div class="col s6">
        <br><br><br><br>
        <table class="striped">
          <tr>
            <td>Market Price</td>
            <td>{{item.itemPrice}}</td>
          </tr>
          <tr>
            <td>Edition Size</td>
            <td>{{item.itemQuantity}}</td>
          </tr>
        </table>
      </div>

      <div class="col s12">
        <h4>Related item</h4>
        <img src="http://placehold.it/900x200" class="responsive-img">
      </div> 

    </div>

  </div>
</template>

<script>
  import ItemView from './SpecificItemComponents/ItemView'

  export default {
    name: 'SpecificItem',
    components: {
      ItemView
    },
    data () {
      return {
        item: {
          itemBrand: 'Abbas',
          itemName: 'No',
          itemPictureSource: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD',
          itemPrice: '$400',
          itemQuantity: '9000'
        }
      }
    }
  }
</script>
