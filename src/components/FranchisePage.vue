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
       
        <CirclePop v-for="item of items" v-bind:item="item"></CirclePop>
      </div>
    </div>
  </div>
</template>

<script>
  import CirclePop from '@/components/CirclePop'
  console.log('here')
  export default {
    components: {
      CirclePop
    },
    // props: ['franchise'],
    data: function () {
      console.log('route id ' + this.$route.params.id)
      return {
        franchise: this.$route.params.id
      }
    },
    computed: {
      items: function () {
        return [
          {
            name: 'Harry Potter',
            price: '$12',
            img: '../assets/img/wolf.jpg'
          },
          {
            name: 'JohnnyWalker',
            price: '$12',
            img: '../assets/img/wolf.jpg'
          }
        ]
      }
    },
    name: 'FranchisePage'
  }
</script>
