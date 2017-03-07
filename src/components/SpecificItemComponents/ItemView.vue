 <template>
  <div class="col s6">
    <h5>{{itemBrand}}</h5>
    <p>{{itemName}}</p>
    <img alt="" :src="itemPictureSource" class="responsive-img">
    <a class="waves-effect waves-light btn">Add to Collection</a>
    <a class="waves-effect waves-light btn">Add to Wish List</a>
  </div>
</template> 

<script>
  export default {
    name: 'ItemView',
    props: ['itemBrand', 'itemName', 'itemPictureSource']
  }
</script>
