<template>
    <div>
        <namjestaj @obrisano="dohvatisve" class="nam" v-for="nam in store.namjestaji" :podatci="nam" :key="nam._id"/>
    </div>
</template>

<script>
import {dohvatiSve} from '@/axios.js'
import store from '@/store'
import namjestaj from '@/components/namjestajCard'
export default {
    components: {
    namjestaj
  },
    data(){
        return{
            link_slike: "",
            store
        }
    },
    
    async created(){
        await this.dohvatisve()
    },
    methods:{
        
        async dohvatisve () {
            try {
                let res = await dohvatiSve()
                this.urlSlike = res.config.baseURL
                this.store.namjestaji = res.data.namjestaji

                this.store.namjestaji.forEach(element => {
                    element.productImage = res.config.baseURL.replace('api','') + element.productImage
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        
        this.$root.$on("component1", async () =>{
          await this.dohvatisve()
        })
    }
}
</script>

<style scoped>
.nam{
    margin-bottom: 5vh !important;
}
</style>