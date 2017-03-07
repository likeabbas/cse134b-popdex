<template>
  <div class="col s4">
    <div class="frontPagePopFrame">
      <div class=imageCropper><img alt="" :src="itemPictureSource" width="266" height="200" class="circle"></div>
      <div class=frontPagePopFrameText>
        <p class=frontPagePopUniverse>{{itemBrand}}</p>
        <p class=frontPagePopName>{{itemName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FrontPagePopComponent',
    props: ['itemBrand', 'itemName', 'itemPictureSource']
  }
</script>
