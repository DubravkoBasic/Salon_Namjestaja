<template>
    <div class="card">
            <div class="card-image">
                <figure class="image is-2by5">
                <img :src="podatci.productImage" :srcset-sizes="[400, 800]"   alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="columns"  >
                    <div class="column">
                        <p><b>{{podatci.naziv}}</b></p>
                        <p>{{podatci.cijena}} kn</p>
                        <br>
                        <b-button v-if="!store.admin" type="is-success" @click.prevent="kupi">Dodaj u košaricu</b-button>
                        <b-button v-if="store.admin" type="is-danger" @click.prevent="obrisi">Obriši</b-button>
                    </div>
                    <div class="column">
                        <p>{{podatci.kategorija}}</p>
                        <b-tooltip :label="podatci.opis"
                            position="is-bottom" multilined>
                            <p class="tooltip">{{podatci.opis.substring(0,30)}}...</p>
                        </b-tooltip>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import store from '@/store'
import {Obrisi} from '@/axios'
export default {
  
    props: ["podatci"],
    data(){
        return{
            store
        }
    },
    methods:{
        
        kupi(){
            if(store.korisink_mail === ""){
                alert("Za kupnju napravite račun ili se ulogirajte")
                return;
            }

            let postoji = false
            store.kosarica.forEach(element => {
                if(element.naziv === this.podatci.naziv){
                    element.kolicina = element.kolicina + 1
                    postoji = true
                }                
            });
            if(!postoji){
                let namjestaj = {
                    naziv: this.podatci.naziv,
                    cijena : this.podatci.cijena,
                    kolicina: 1
                }
            store.kosarica.push(namjestaj)         
            }
            console.log(store.kosarica);  
        },
        
        async obrisi(){
            try {
                let res = await Obrisi(this.podatci._id)
                console.log(res);
                this.$emit('obrisano')
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.card{
    width: 80%;
    margin:auto;
}
*{
    color: black !important;
}

.column{
    font-size: 24px;
}

.tooltip{
    cursor: help;
    color:lightseagreen !important;
}

.card-footer:last-child, .card-content:last-child, .card-header:last-child {
    border-top: 2px solid var(--primary) !important;
}
</style>