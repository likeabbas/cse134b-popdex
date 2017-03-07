<template>
<div class="content container">

    <div class="row">
      
      <div class=preContent id="userStuff">
      
        <div class="col s4">
          <div class=userCollectionWishlistBox>
            <h5>{{username}}'s Stuff</h5>
            <a class="waves-effect waves-light btn">Button 1</a>            
            <a class="waves-effect waves-light btn">Button 2</a>
          </div>
        </div>

        <div class="col s8">
          <form>
            <p>
              <input type="checkbox" id="check1" />
              <label for="test5">You</label>
            </p>
              <p>
              <input type="checkbox" id="check2" />
              <label for="test5">There</label>
            </p>
              <p>
              <input type="checkbox" id="check3" />
              <label for="test5">Hey</label>
            </p>
          </form></div>
          <div class="col s12">
            <form>   
              <div class="input-field col s4">
                <input type=text name=filterSearch placeholder="Filter Search">
              </div>
              <div id="brand-selector" class="input-field col s4">
                <select v-model="selectedBrand" v-on:change="brandChange" class="browser-default">
                  <option v-for="option in brandOptions" v-bind:value="option">
                    {{option}}
                  </option>
                </select>
                <span>Selected: {{selectedBrand}}</span>
              </div>
              <div id="sort-selector" class="input-field col s4">
                <select class="browser-default">
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            
            </form>

          </div>      
    </div>
      
    <div class="userMainContent row">
      <CirclePop v-for="item in items" v-bind:item="item" :key="item.name">
      </CirclePop>
    </div>

    </div>

  </div>
</template>

<script>
  import CirclePop from '@/components/CirclePop'
  export default {
    components: {
      CirclePop
    },
    name: 'ProfilePage',
    data: function () {
      return {
        username: this.$route.params.id,
        selectedBrand: 'All Brands'
      }
    },
    computed: {
      items: function () {
        console.log('selectedBrand = ' + this.selectedBrand)
        var imgSrc = ''
        if (this.selectedBrand === 'TMNT') {
          imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg/220px-Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg'
        } else {
          imgSrc = 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD'
        }
        return [
          {
            name: 'Harry Potter',
            price: '$12',
            brand: 'Wizarding World',
            img: imgSrc
          },
          {
            name: 'Voldemort',
            price: '$15',
            brand: 'Wizarding World',
            img: imgSrc
          },
          {
            name: 'Severus Snape',
            price: '$9',
            brand: 'Wizarding World',
            img: 'http://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD'
          }
        ]
      },
      brandOptions: function () {
        return ['All Brands', 'Adventure Time', 'TMNT']
      },
      brandChange: function () {
        console.log('brand changed to ' + this.selectedBrand)
        if (this.selectedBrand === 'TMNT') {
          this.items.push({
            name: 'John Doe',
            price: '$15',
            brand: 'Hell',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg/220px-Penguins_walking_-Moltke_Harbour,_South_Georgia,_British_overseas_territory,_UK-8.jpg'
          })
        }
      }
    }
}
</script>
