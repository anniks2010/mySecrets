require('dotenv').config(); ///see rida peab olema kõige esimene alata
const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose'); ///passport-local -it ei ole vaja eraldi importida, kuna see sisaldab juba neid asju.
const session=require('express-session');
///const encrypt=require('mongoose-encryption');
const mainPage=require('./routes/main');
const app=express();

app.use(express.static('static'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

///Sessioon tuleb lahti teha enne ühendust andmebaasiga
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }));

  ///Enne andmebaasiga ühendamist tuleb initsaliseerida passport
  app.use(passport.initialize());
  app.use(passport.session());

  require('./models/db');
  app.use(mainPage);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});