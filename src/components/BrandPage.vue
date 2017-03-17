<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <div id=preContent>
          <img alt="" class=franchiseImage src="../assets/img/disney.png" style="float: left;" width=218 height=110>
          <div class=mainButton>Guide Main Page</div>
          <form action="#">
            <input type=text name=filterSearch placeholder="Filter Search">
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </form>
        </div>
      </div>
      <!-- <br><br><br><br><br><br>  -->
      <div class=guideContent> 
       <!-- <router-link v-for="(item, key) of items" 
                    :brand="brand" 
                    :attributes="key"
                    :to="{name: 'item', --> 

        <CirclePop  v-for="(item, key) of items"
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
  import store from '../storage'
  // import UserService from '../userservice'
  import FBService from '../fbservice'

  export default {
    components: { CirclePop },
    name: 'BrandPage',
    data () {
      return {
        sharedState: store,
        brand: this.$route.params.id,
        items: {}
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData: function () {
        var vm = this
        console.log('in brand pop fetch')
        FBService.fetchByBrand(vm.sharedState.firebase, vm.brand)
          .then(function (data) {
            vm.items = data.val()
          })
      }
    }
}
</script>
