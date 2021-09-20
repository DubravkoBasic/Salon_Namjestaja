<template>
    <section class="form">
        <b-field label="Email">
            <b-input type="email"
                v-model="form.email"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Korisničko ime">
            <b-input 
                maxlength="30"
                v-model="form.korisnicko_ime"
            ></b-input>
        </b-field>

        <b-field label="Lozinka">
            <b-input 
                type="password" 
                maxlength="30"
                v-model="form.lozinka"
            ></b-input>
        </b-field>
        <b-field label="Ponovljena lozinka">
            <b-input 
                type="password" 
                maxlength="30"
                v-model="form.ponovljena_lozinka"
            ></b-input>
        </b-field>
        <b-field>
            <b-button class="form-next" @click.prevent="a">Registracija</b-button>
        </b-field>
    </section>
</template>

<script>
import store from '@/store.js'
import {registracija} from '@/axios.js'
export default {

    data(){
        return{
            form:{
                email: "",
                korisnicko_ime: "",
                lozinka: "",
                ponovljena_lozinka: ""
        
            } 
        }
    },
    methods: {
       async a(){
           
           for (const [, value] of Object.entries(this.form)) {
                if(value === "") return alert("Molimo popunite sva polja")
            }
            if(this.form.lozinka !== this.form.ponovljena_lozinka) return alert("Lozinke nisu iste")

            delete this.form.ponovljena_lozinka
            try {
                let res = await registracija(this.form)
                store.token = res.data.token
                localStorage.setItem("token", res.data.token);
                store.korisink_mail = res.data.kor.email
                store.admin = res.data.kor.admin
                this.$router.push({ path: '/'})
            } catch (error) {
                console.log(error);
            }
       }
    }
}
</script>



<style lang="css">

.form{
    padding-top: 20vh;
    top:50%;
    margin: auto;
    width: 60%;
}

.form-next{
    background-color: var(--secondary) !important;
    color: white;
    font-weight: bold;
    border: none;
}

.input{
    color: black !important;
}

a:hover {
    color: #363636 !important;
}

</style>