<template>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <form>
            <button type="button" class="btn btn-primary btn-block" name="button">Login with Facebook</button>
            <!-- <div class="g-signin2 text-center" data-onsuccess="onSignIn" data-width="300" data-theme="light" data-longtitle="true"></div> -->
            <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError"> Sign in with Google</g-signin-button>
            <div class="row" style="padding:10px 0px">
              <div class="col-md-5 hidden-sm-down"><hr></div>
              <div class="col-md-2">
                or
              </div>
              <div class="col-md-5 hidden-sm-down"><hr></div>
            </div>
            <div class="form-group input-group">
              <span class="input-group-addon pe-7s-mail" id="basic-addon1"></span>
              <input type="email" class="form-control" id="email" aria-describedby="basic-addon1" placeholder="Enter email">
            </div>
            <div class="form-group input-group">
              <span class="input-group-addon pe-7s-key" id="basic-addon2"></span>
              <input type="password" class="form-control" id="password" aria-describedby="basic-addon1" placeholder="Your Password">
            </div>
            <button type="button" class="btn btn-success btn-block" name="button" @click="login">Login</button>
          </form>
          <div style="padding:13px 0px 0px 0px"><a href="#">Forgot password?</a></div>
        </div>
        <div class="modal-footer">
          <div class="" style="width:100%">No account yet? <a href="#"> Signup</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name :"login",
    data:function(){
      return{
        googleSignInParams:{
          client_id:'683005103605-dqtsbo3ujkc2eftkpj8cnumvggsrrni3.apps.googleusercontent.com'
        }
      }
    },
    methods:{
      login: function (e) {
        console.log(e);
        this.$auth.login({ email, password }).then(function () {
          // Execute application logic after successful login
        })
      },
      onSignInSuccess:function(googleUser){
          var profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      },
      onSignInError:function(e){
        console.log(e);
      }
    }
}
</script>

<style scoped="">
  .input-group-addon{
    width: 40px;
  }
  .modal-content{
      -webkit-border-radius: 0px !important;
      -moz-border-radius: 0px !important;
      border-radius: 0px !important;
      border: 0px;
  }

</style>
<style>
  .g-signin-button{
    margin-top: 10px;
    font-size: 15px;
    display: inline-block;
    background: white;
    color: #444;
    width: 100%;
    border-radius: 4px;
    border: thin solid #e6e6e6;
    white-space: nowrap;
    padding: 6px;
    cursor: default;
  }
  .g-signin-button:hover{
    background-color: #e6e6e6;
  }
</style>
