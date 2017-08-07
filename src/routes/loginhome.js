/**
 * Created by ajayr on 05-08-2017.
 */
var express = require('express');
var 	router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    console.log("req",req);
    res.json({'user already logged in ':true,loggedinuser:req.user});
   // res.render('index',{key:req});
});



function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.json({'user not logged in':true});

    }
}

module.exports = router;