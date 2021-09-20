<template>
    <div class="holder">

        <div class="ukupno">Ukupno: {{ukupno}} kn</div>
        <div class="columns nam"  v-for="nam in kosarica"  :key="nam._id">
            <div class="column">
                <p>Naziv: {{nam.naziv}}</p>
                <p>Cijena: {{nam.cijena}} kn</p>
            </div>
            <div class="column">
                <p>Količina: {{nam.kolicina}}</p>
                <b-button class="obrisi" @click.prevent="obrisi(nam)">Izbaci iz košarice</b-button>
            </div>
        </div>
        <b-button type="is-success" v-if="kosarica.length >0" @click.prevent="kupi">Kupi</b-button>
    </div>
</template>


<script>
import store from '@/store.js'
import {posaljiMail} from '@/axios.js'
export default {
    data(){
        return{
            kosarica: store.kosarica,
            ukupno: 0
        }
    },
    created(){
        
        this.kosarica.forEach(element => {
            this.ukupno = this.ukupno + element.kolicina * element.cijena
        });
    },
    methods:{
        
        async kupi(){
            let text = ""
            this.kosarica.forEach(el => {
                text = text + "Naziv: " + el.naziv + ", Cijena: " + el.cijena + ", Količina: " + el.kolicina + "\n"
            });
            text = text + "\n" + "      " + "UKUPNO: " + this.ukupno
            console.log(text);
            try {
                let body = {
                    text,
                    email : store.korisink_mail
                }
                let res = await posaljiMail(body)
                store.kosarica = []
                this.kosarica = []
                alert("Poslana vam je poruka na vašu e-mail adresu")
                this.$router.push({ path: '/'})
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        },
        
        
        obrisi(zaBrisanje){
            this.kosarica = store.kosarica.filter(nam => nam.naziv != zaBrisanje.naziv);
            store.kosarica = this.kosarica
            this.ukupno = this.ukupno - zaBrisanje.kolicina * zaBrisanje.cijena

        }
    }
}
</script>

<style scoped>
.holder{
    margin-top: 10vh !important; 
}

p{
    font-size: 32px;
}

.nam{
    margin-top: 24px;
    border-style: solid;
    border-color: var(--secondary) !important;
    border-radius: 8px;
    padding-left: 16px;
}

.ukupno{
    font-size: 24px;
}

.obrisi{
    background-color: red !important;
}
</style>