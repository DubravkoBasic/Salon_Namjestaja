<template>
    <section class="form">
        <b-field label="Email">
            <b-input type="email"
                maxlength="30"
                v-model="form.email">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input 
                v-model="form.lozinka" 
                type="password" 
                maxlength="30">
            </b-input>
        </b-field>
       
        <b-field>
            <b-button class="form-next" @click.prevent="Prijava">Prijava</b-button>
        </b-field>
    </section>
</template>

<script>
import {prijava} from '@/axios.js'
import store from '@/store'
export default {
    data(){
        return{
            form:{
                email: "",
                lozinka: "",
            } 
        }
    },
    methods: {
        
       async Prijava(){
            for (const [, value] of Object.entries(this.form)) {
                if(value === "") return alert("Molimo popunite sva polja")
            }
            try {
                let res = await prijava(this.form)
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

<style>
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