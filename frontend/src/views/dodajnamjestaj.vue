<template>
    <section class="form">
        <b-field label="Naziv namještaja">
            <b-input 
                maxlength="30"
                v-model="form.naziv"
            ></b-input>
        </b-field>
        <b-field label="Cijena namještaja">
            <b-input 
                type="number"
                v-model="form.cijena">
            </b-input>
        </b-field>

        <b-field label="Kategorija">
            <b-select placeholder="Ormar" v-model="form.kategorija">
                    <option value="Ormar" selected>Ormar</option>
                    <option value="Radni stol">Radni stol</option>
                    <option value="Uredska stolica">Uredska stolica</option>
                    <option value="Krevet">Krevet</option>
                              
            </b-select>
        </b-field>

        <b-field label="Opis">
            <b-input maxlength="200" type="textarea" v-model="form.opis"></b-input>
        </b-field>

        <b-field class="file is-primary" :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label">
                <span class="file-cta">
                    <span class="file-label">Dodaj sliku</span>
                </span>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-upload>
        </b-field>
        <b-field>
            <b-button class="form-next" @click.prevent="dodaj">Dodaj namještaj</b-button>
        </b-field>
    </section>
</template>

<script>

import {dodajNamjestaj} from '@/axios.js'
export default {

    data(){
        return{
            form:{
                naziv: "",
                cijena: 0,
                kategorija: "",
                opis: ""
            },
            file: null
        }
    },
    methods: {
        
       async dodaj(){
           for (const [, value] of Object.entries(this.form)) {
                if(value === "") return alert("Molimo popunite sva polja")
            }
            let form = new FormData()
            form.append('productImage', this.file)
            form.append('naziv', this.form.naziv)
            form.append('cijena', this.form.cijena)
            form.append('opis', this.form.opis)
            form.append('kategorija', this.form.kategorija)
            try {
                let res = await dodajNamjestaj(form)
                console.log(res);
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

option, select, textarea{
    color: black !important;
}

</style>