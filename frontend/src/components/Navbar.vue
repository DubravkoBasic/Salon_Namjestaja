<template>
  <b-navbar>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/' }" @click.native="home">
                Naslovnica
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/dodajnamjestaj' }" v-if="store.admin">
                Dodaj namještaj
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/kosarica' }" v-if="store.kosarica.length >= 1 && store.korisink_mail !== ''">
                Košarica
            </b-navbar-item>

              <b-field>
                <b-input placeholder="Pretraga po kategoriji..." v-model="store.kategorija" ></b-input>
              </b-field>
              <b-button @click.prevent="trazi">
                  Traži
              </b-button>
        </template>

        <template #end>
            <b-navbar-item tag="div" v-if="!$store.korisink_mail">
                <div class="buttons">
                    <b-navbar-item class="button is-primary" tag="router-link" :to="{ path: '/registracija' }">
                        <strong>Registracija</strong>
                    </b-navbar-item>
                    <b-navbar-item class="button is-primary" tag="router-link" :to="{ path: '/prijava' }">
                        <strong>Prijava</strong>
                    </b-navbar-item>
                </div>
            </b-navbar-item>
            <b-navbar-item>
              <div class="buttons" v-if="$store.korisink_mail">
                    <b-navbar-item class="button is-primary" @click.prevent="Odjava">
                        <strong>Odjava</strong>
                    </b-navbar-item>
                </div>
            </b-navbar-item>
        </template>
  </b-navbar> 
</template>

<script>
import store from '@/store.js'
import {dohvatiPoKategorji} from '@/axios'
export default {
  data(){
    return{
      store
    }
  },
  
  methods:{
    Odjava(){
      store.token = ""
      store.korisink_mail = ""
      store.admin = undefined
      localStorage.clear()
      this.$router.push({ path: '/'})
      store.kosarica = []
    },
    
    async trazi(){
      try {
        let res = await dohvatiPoKategorji(store.kategorija)
        console.log(res);
        this.urlSlike = res.config.baseURL
        store.namjestaji = res.data.namjestaji
        store.namjestaji.forEach(element => {
            element.productImage = res.config.baseURL.replace('api','') + element.productImage
        });
      } catch (error) {
        console.log(error);
      }
    },
    
    
    async home(){
      if(this.$route.name === "Home"){
        this.$root.$emit('component1')
        
      }
    }
  }
}
</script>

<style>

.nav-holder{
  background-color: var(--primary);
}
.navbar{
  min-height: 4vh !important;
  background-color: var(--primary) !important;
  margin: auto;
  width: 80%;
}
.navbar-menu.is-active{
  background-color: var(--primary) !important;
}

.button.is-primary{
  background-color: var(--secondary) !important;
}

a.navbar-item:focus{
  background-color: var(--primary) !important;
  color: white !important;
}

.navbar-dropdown{
  background-color: var(--primary) !important;

}

a.navbar-item:hover{
  color: black !important;
}

.navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
    color: black !important;
}

.taginput .taginput-container.is-focusable, .textarea, .input
{
  margin-top: 1vh;
  color: black !important;
}

.switch, .b-radio.radio, .b-checkbox.checkbox, .carousel-list, .carousel, .is-unselectable, .tabs, .pagination-previous, .pagination-next, .pagination-link, .pagination-ellipsis, .breadcrumb, .file, .button{
  background-color: var(--primary) !important;
  color: white !important;
  border-color: var(--primary) !important;
  margin-top: 1vh;
}
</style>


