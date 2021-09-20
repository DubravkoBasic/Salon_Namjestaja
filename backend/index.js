const fs = require("fs")
require("./database.js");
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const korisnik = require("./scheme/korisnik");
const namjestaj = require("./scheme/namjestaj");
const nodemailer = require("nodemailer");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(express.json());


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        console.log(file.originalname)
        cb(null, Date.now() + file.originalname)
    }
});


const fileFilter = function(req, file, cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else{
        cb(null, false)
    }
}


const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 8
    },
    fileFilter: fileFilter
});



async function main(payload) {
  try {
      
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "projektnam21@gmail.com",
          pass: "#ProjektNam21",
        },
      });
    
      await transporter.sendMail({
        from: 'projektnam21@gmail.com',
        to: payload.email,
        subject: "Obavijest o narudžbi",
        text: payload.text,
      });
  } catch (error) {
      console.log(error);
  }
   
}


var RutaNamjestaj = new express.Router()


RutaNamjestaj.post('/api/mail', async (req, res) =>{
    try {
        main(req.body)
    } catch (error) {
        console.log(error);
    }
})


      
RutaNamjestaj.post('/api/dodajnamjestaj', upload.single('productImage'), async (req, res) =>{
    try {
        var nam = new namjestaj({
            naziv: req.body.naziv,
            productImage: req.file.path,
            cijena: req.body.cijena,
            kategorija: req.body.kategorija,
            opis: req.body.opis
        }) 
        await nam.save()
        res.status(200).send(nam)
    } catch (error) {
        console.log(error);
    }
})


RutaNamjestaj.get('/api/dohvatikategoriju', async (req, res) =>{
    const match = {}
    try {
        console.log(req.query);
        let kategorija = new RegExp(`^.*${req.query.kategorija}.*$`, "img")
        match['kategorija'] = kategorija
        var namjestaji = await namjestaj.find(match, null)
        res.send({namjestaji})
    } catch (error) {
        console.log(error);
    }
})


RutaNamjestaj.get('/api/svinamjestaji', async (req, res) =>{
    try {
        var namjestaji = await namjestaj.find();
        res.send({namjestaji})
    } catch (error) {
        console.log(error);
    }
})


RutaNamjestaj.delete('/api/namjestaj/:id', async (req, res) =>{
    console.log(req.params.id);
    try {
        const nam = await namjestaj.findOne({_id: req.params.id})
        if(!nam){
            return res.status(404).send()
        }
        const pathToFile = nam.productImage;

        fs.unlink(pathToFile, function(err) {
        if (err) {
            throw err
        } else {
            console.log("Successfully deleted the file.")
        }
        })
        await nam.remove()
        res.send(nam)
    } catch (error) {
        console.log(error);
    }
})



function Token(korisnik) {
    const token = jwt.sign({ _email: korisnik.email.toString(), _admin: korisnik.admin.toString()}, 'namjestaj', {expiresIn: '1h'})
    return token
}


var RutaKorisnik = new express.Router()


RutaKorisnik.post('/api/registracija', async(req, res) =>{
    try {
        var kor_find = await korisnik.findOne({email: req.body.email})
        if(kor_find) { return res.status(409).send({poruka: "Korisinik postoji"}) }

        var kor = new korisnik({
            email: req.body.email,
            lozinka: await bcrypt.hash(req.body.lozinka, 8),
            korisnicko_ime: req.body.korisnicko_ime
        }) 
        await kor.save()
        let token = Token(kor)
        delete kor._doc.lozinka
        res.status(200).send({kor, token})
    } catch (error) {
        console.log(error);
    }
})


RutaKorisnik.post('/api/login', async(req, res) =>{
    var kor = await korisnik.findOne({email: req.body.email})

    const isMatch = await bcrypt.compare(req.body.lozinka, kor.lozinka)
    if(!isMatch){
        return res.status(406).send({poruka: "Prijava nemoguca"})
    }
    let token = Token(kor)
    delete kor._doc.lozinka
    res.status(200).send({kor, token})

})


app.use(RutaNamjestaj);
app.use(RutaKorisnik);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + '/public/'));
}


app.listen(port, ()=>{
    console.log(`Server je na portu ${port}`);
})

