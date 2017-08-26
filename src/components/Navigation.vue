<template>
  <div>
    <nav class="navbar fixed-top navbar-toggleable-md navbar-light">
      <a class="navbar-brand text-left" href="/">
        <img src="../assets/PL_Logo_250px.png" alt="">
      </a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline mr-auto">
          <div class="input-group input-group-md">
            <input type="text" class="form-control" placeholder="Search Location">
            <input type="text" class="form-control" placeholder="Maximum Price">
          </div>
        </form>
        <ul class="nav navbar-nav ml-auto">
          <!-- <li class="nav-item"><a class="nav-link" href="#" onclick="signOut();">Sign out</a></li> -->
          <li class="nav-item"><a class="nav-link" data-toggle="modal" data-target="#myModal" href="#">Login/Register</a></li>
        </ul>
      </div>
    </nav>
    <ul class="nav main-nav fixed-top">
      <li class="nav-item"><router-link class="nav-link" :to="{ name: 'sale', params: {} }">FOR SALE</router-link></li>
      <li class="nav-item"><router-link class="nav-link" :to="{ name: 'rent', params: {} }">FOR RENT</router-link></li>
      <li class="nav-item"><a class="nav-link disabled" href="#">PRE-SELLING</a></li>
      <li class="nav-item"><a class="nav-link disabled" href="#">FORCLOSURE</a></li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "navigation"
}
</script>

<style scoped>

  .border{
    border: 1px solid #000000;
  }
  .navbar{
    background-color: #ffffff;
  }
  .navbar-brand img{
     width:130px;
     padding:0;
     margin: 0 15px 0 0;
  }
  .navbar-toggler{
    border: 0px;
    cursor:pointer;
  }
  .nav-item{
    font-size: 14px;
  }
  .navbar-toggler:focus,
  .nav-link:focus{
    outline: none;
  }
  .main-nav{
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 2px -3px #d9d9d9;
    margin-top: 60px;
    z-index: 1;
  }
  .main-nav li .nav-link{
    font-size: 11px;
    padding: 0;
    margin:0 15px;
    font-weight:bold;
    padding: 20px 0 15px 0;

  }
</style>
