<template>                  
<div class="col s4">
  <div class=circle>
    <img alt="" v-bind:src="item.picture_src" width=150 height=150> 

      <router-link  
            :brandName="brand"
            :item="item"
            :to="{name: 'item', params: {itemId: uid, brandName: brand, item: item, brand: brand, uid: uid}}"
            >

            <p class="userItemName">{{item.name}}</p>                    
            <p class=bottomTextCirlce>{{item.price}}</p>

      </router-link>
  </div>
</div>
</template>

<script>
export default {
  props: ['item', 'brand', 'uid']
}
</script>
