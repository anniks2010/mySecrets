const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);

const User= new mongoose.model('User',userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); ////siin siis otsustatakse, mis andmed salvestatakse cookies sisse
passport.deserializeUser(User.deserializeUser()); ///kasutatakse andmeid cookies seest.
