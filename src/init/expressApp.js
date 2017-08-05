import express from "express";
import bodyParser from "body-parser";
import morganLogger from "morgan";
import cookieParser from "cookie-parser";
import compress from "compression";
import swagger from "swagger-express"
import olsMiddleware from "../middlewares/OLSMiddleware"
import headersMiddleware from "../middlewares/headersMiddleware"
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');


require("dotenv").config();
const app = express();

const { DEV_MODE,API_VERSION="v1" } = process.env;

if (DEV_MODE) {
    app.use(morganLogger("dev"));
}

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cookieParser());
app.use(compress());

app.use(headersMiddleware);

app.use(olsMiddleware);



// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());



// Routes
import apiRoutes from "../routes/index";

const base=`/api/${API_VERSION}`;

app.get("/",(req,res,next)=>{
    res.json({
        "Welcome To":"REST!",
        "API Started at":base,
    })
})

app.use(base, apiRoutes);

app.get("*",(req,res,next)=>{
    res.json({
        not:'Found'
    })
})



export default app;
