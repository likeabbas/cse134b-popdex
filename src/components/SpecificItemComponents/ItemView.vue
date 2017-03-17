 <template>
    <div>
    <h5>{{itemBrand}}</h5>
    <p>{{itemName}}</p>
    <img alt="" :src="itemPictureSource" class="responsive-img">
    </div>
</template> 

<script>
  export default {
    name: 'ItemView',
    props: ['itemBrand', 'itemName', 'itemPictureSource']
  }
</script>
