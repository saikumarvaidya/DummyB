/**
 * Created by ajayr on 05-08-2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/Users');


router.get('/', ensureAuthenticated, function (req, res) {
    console.log("req", req);
    res.json({'user already logged in ': true, loggedinuser: req.user});
    // res.render('index',{key:req});
});

router.get('/failure',function (req,res) {
   res.json({'user loggin failed':true});
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.json({'user not logged in': true});
    }
}


function ensureAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated()) {
        res.json({'logged in fuck off':'true',loggedinuser:req.user});
    } else {
        return next();
    }
}

passport.use(new LocalStrategy(
    function (username, password, done) {

        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }
            return done(null, user);

        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
    User.getUserByUsername(id, function(err, user) {
        done(err, user);
    });
});
router.post('/',ensureAuthenticatedUser,
    passport.authenticate('local', {successRedirect:'/api/v1/auth', failureRedirect:'/failure',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });


module.exports = router;
