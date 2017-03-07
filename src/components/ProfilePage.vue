<template>
<div class="content container">

    <div class="row">
      
      <div class=preContent id="userStuff">
      
        <div class="col s4">
          <div class=userCollectionWishlistBox>
            <h5>Adam's Stuff</h5>
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
              <div class="input-field col s4">
                <select class="browser-default">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div class="input-field col s4">
                <select class="browser-default">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            
            </form>

          </div>
      
    </div>
      
    <div class="userMainContent row">
      <div class="col s4">
          
                <div class="circle">
                  <img alt="" src="img/circle.jpeg" width=150 height=150>
                  <p class="userItemName">BMO</p>
                  <p class="topTextCircle">BMO</p>
                  <p class=bottomTextCirlce>$12 items</p>
                </div>
      </div>  

      <div class="col s4">
          <div class=circle>
            <img alt="" src="img/circle.jpeg" width=150 height=150>
            <p class="userItemName">BMO</p>
            <p class="topTextCircle">Jake the Dog</p>
            <p class=bottomTextCirlce>$10</p>
          </div>
      </div> 

      <div class="col s4">
        <div class=circle>
          <img alt="" src="img/circle.jpeg" width=150 height=150>
          <p class="userItemName">BMO</p>
          <p class="topTextCircle">Anything</p>
          <p class=bottomTextCirlce>$5</p>
        </div>

      </div>    
    </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ProfilePage'
}
</script>