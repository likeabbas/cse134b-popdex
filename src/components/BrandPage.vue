<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div id='preContent'>  
          <h3 class=mainButton>Guide Main Page</h3>
          <form action="#">
            <input id="itemFilterSearch" type=text name=filterSearch placeholder="Filter Search" v-on:keyup="filterItems()">
          </form>
        </div>
      </div>
      <!-- <br><br><br><br><br><br>  -->
      <div class=guideContent> 
       <!-- <router-link v-for="(item, key) of items" 
                    :brand="brand" 
                    :attributes="key"
                    :to="{name: 'item', --> 

        <CirclePop  v-for="(item, key) of curItems"
                   v-bind:brand="brand" 
                   v-bind:item="item"
                   v-bind:uid="key"
                   :key="key">
                   </CirclePop>
                   <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
  import CirclePop from '@/components/CirclePop'
  import store from '../services/storage'
  import filterService from '../services/filterService'
  import FBService from '../services/fbservice'

  export default {
    components: { CirclePop },
    name: 'BrandPage',
    data () {
      return {
        sharedState: store,
        brand: this.$route.params.id,
        items: {},
        itemNames: [],
        curItems: {}
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      filterItems: function () {
        this.curItems = Object.assign({}, filterService.filterItems(this.itemNames, this.items, document.getElementById('itemFilterSearch').value))
      },
      fetchData: function () {
        var vm = this
        if (vm.sharedState.state.brands[this.brand] === undefined) {
          FBService.fetchByBrand(vm.sharedState.firebase, vm.brand)
            .then(function (data) {
              vm.items = data.val()
              vm.curItems = Object.assign({}, vm.items)
            })
        } else {
          vm.items = Object.assign({}, vm.sharedState.state.brands[vm.brand])
          vm.curItems = Object.assign({}, vm.items)
          vm.itemNames = vm.sharedState.state.brandToListOfItemNames[vm.brand]
        }
      }
    }
}
</script>
