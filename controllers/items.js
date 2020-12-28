const mongoose=require('mongoose');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');

require('../models/db');

const User = mongoose.model('User');


exports.getMainPage =(req,res)=>{
    res.render('home');
};

exports.getAllSecrets=(req,res)=>{
    if(req.isAuthenticated()){
        User.find({"secret": {$ne: null}}, (error,userFound)=>{
            if(error){
                console.log(error);
            }else{
                console.log(req.user);
                res.render('secrets',{userSecrets: userFound});
            }
        });
        
    }else{
        res.redirect('/login');
    }
};

exports.getRegisterPage=(req,res)=>{
    res.render('register');
};

exports.newRegisterUser=(req,res)=>{
    User.register({username: req.body.username},req.body.password, (error, user)=>{
        if(error){
            console.log(error);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/secrets');
            });
        }
    });
};

exports.getSecret=(req,res)=>{
    if(req.isAuthenticated()){
        res.render('submit');
    }else{
        res.redirect('/login');
    }
};

exports.newUserSecret=(req,res)=>{
    const submittedSecret=req.body.secret;

    User.findById(req.user.id,(error,userFound)=>{
        if(error){
            console.log(error);
        }else{
            userFound.secret=submittedSecret;
            userFound.save(()=>{
                res.redirect('/secrets');
            });
        }
    });
};

exports.getLoginPage=(req,res)=>{
    res.render('login');
};

exports.newUserLogin=(req,res)=>{
    const user=new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error)=>{
        if(error){
            console.log(error);
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect('/secrets');
            });
        }
    });
};

exports.getLogout=(req,res)=>{
    req.logout();
    res.redirect('/');
};
