<template>
  <header >
    <nav >
      <!-- <h1 style="text-align:start;"> -->
        <!-- <h3><router-link to="/register" class="home">Home</router-link></h3> -->

       
       <div class="navbar">
         <router-link  to="/register" >Register</router-link>
      
          <router-link  to="/login" >Login</router-link>
        
         <button>Logout</button>
       </div>
    </nav>
  </header>
</template>


<script>
export default {
    data(){
        return{
            isAuthenticated:false
        }
    },
    // created(){
    //     if(localStorage.getItem('isAuthenticated')){
    //             this.isAuthenticated=true
    //     }
        
    // }
}
</script>

<style scoped>


  body {
  background-color: #fff;
  font-family: 'Space Mono', monospace;
  font-family: 'Open Sans', sans-serif;
  max-width: 760px;
  margin: auto;
  font-size: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
}

nav > ul > li {
  list-style: none;
  display: inline-block;
  
}
header{
  max-width: 100%;
    margin: auto;
}
.navbar{
  float:right; 
margin-right:10px;
font-size: 20px;
margin-left: auto;
}
a {
  text-decoration: none;
  color: #087db8;
  padding: 8px 16px;
  border-radius: 8px;
}
button{
  /* margin-right:10px; 
  color:#05728f; 
 */
  background: none;
  border:none;
  text-decoration: none;
  outline: none !important;
  color: #087db8;
  padding: 8px 16px;
  border-radius: 8px;
  }
/* button:hover,
a:hover {
  background-color: rgb(199, 171, 171);
} */
</style>