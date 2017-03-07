<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>


<script>
import Nav from './components/Nav'
export default {
  components: {
    Nav
  },
  name: 'app'
}
</script>

<style src="./assets/css/materialize.min.css"></style>
<style src="./assets/css/styles.css"></style>
