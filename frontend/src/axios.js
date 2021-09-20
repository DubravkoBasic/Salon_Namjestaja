const axios = require('axios');



const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000,
  });



async function registracija(forma){
    try {
        console.log(forma);
        let res = await instance.post('/registracija', forma);
        return res;
    } catch (error) {
        console.log(error);
    }
}


async function prijava(forma){
    try {
        let res = await instance.post('/login', forma);
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function dodajNamjestaj(forma){
    try {
        let res = await instance.post('/dodajnamjestaj', forma);
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function dohvatiSve(){
    try {
        let res = await instance.get('/svinamjestaji');
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function dohvatiPoKategorji(kategorija){
    try {
        let res = await instance.get(`/dohvatikategoriju?kategorija=${kategorija}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function Obrisi(id){
    try {
        let res = await instance.delete(`/namjestaj/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}


async function posaljiMail(payload){
    try {
        let res = await instance.post('/mail', payload);
        return res;
    } catch (error) {
        console.log(error);
    }
}


export {registracija, prijava, dodajNamjestaj, dohvatiSve, posaljiMail, dohvatiPoKategorji, Obrisi}