<template>
  <div class="page">
    <div class="naziv">SALON NAMJEŠTAJA</div>
    <Navbar/>
  <div class="view">
    <router-view></router-view>
  </div>
    
  </div>
</template>

<script>


import Navbar from './components/Navbar.vue'
import jwt from 'jsonwebtoken'
import store from '@/store'

export default {
  name: 'App',
  components: {
    Navbar
  },
  
  created(){
    console.log("created");
    let token = localStorage.getItem('token')
    store.token = token
    let decoded = jwt.verify(token, 'namjestaj')
    if(decoded){
      store.korisink_mail = decoded._email
      store.admin = (decoded._admin === 'true');
    }else {
      localStorage.clear()
    }  
  }
}
</script>

<style>
:root {
  --primary: #14213d;
  --secondary: #fca311;
}


*{
  font-family: 'Roboto', sans-serif;
  padding: 0px;
  margin: 0px;
  color: white !important; 
}

.naziv{
  background-color: var(--primary);
  margin: auto;
  width: 80%;
  text-align: center;
  font-size: 30px;
  height: 6vh;
}

.page{
  background-color: #f1faee;
  
}

.view{
  min-height: 94vh;
  padding: 2vh;
  margin: auto;
  width: 80%;
  background-color: var(--primary);
}
</style>
