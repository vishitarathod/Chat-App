<template>
  <header style="max-width: 1170px;
    margin: auto;">
    <nav >
      <h1 style="text-align:start;">
        
      </h1>
     <div style="text-align:end;">
       <h1><router-link to="/register" style="float:left; margin-left:15px">Home</router-link></h1>
       <div>
         <router-link  to="/register" style="margin-right:10px">Register</router-link>
      
          <router-link  to="/login" style="margin-right:10px">Login</router-link>
        
         <button style="margin-right:10px; color:#007BFF; border:none; background: none;">Logout</button>
       </div>
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
    created(){
        if(localStorage.getItem('isAuthenticated')){
                this.isAuthenticated=true
        }
        
    }
}
</script>

<style>
    /* body {
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
  padding: 1rem 0;
}

nav > ul > li {
  list-style: none;
  display: inline-block;
}

nav > ul > li > a,
a {
  text-decoration: none;
  color: #087db8;
  padding: 8px 16px;
  border-radius: 8px;
}

nav > ul > li > a:hover,
a:hover {
  background-color: #fdf2f8;
} */
</style>