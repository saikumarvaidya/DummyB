/**
 * Created by ajayr on 29-07-2017.
 */
import Users from '../models/Users'
import {createNewUser} from "../models/Users"
//to get all present users
const getUsers = (req, res, next) => {
    Users.find({}, {},req.query, (error, users) => {
        if (error) console.log(":-) error = ", error);
        res.json({
            message:users.length? 'Successfully retrieved users' : 'There are no users! Be first to create!',
            users,
        })
    });
}


// Register User
const registerUser=(req, res,next)=>{
console.log("req",req);
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    console.log("req.body",req.body);


    var newUser = new Users({
            name: name,
            email:email,
            username: username,
            password: password
        });

        createNewUser(newUser, function(result){
            console.log("err,user---",result);
            console.log(result);
        });

        //req.flash('success_msg', 'You are registered and can now login');

    res.json({'created user is below ': true, createduser: req.user});

}






const getUser = (req, res, next) => {
    let {id} = req.params;
    console.log(":-) id = ", id);
    Users.findOne({_id: id}, (error, userObject) => {
        if (error) console.log(":-) error = ", error);
        res.json({
            message: userObject ? 'Successfully retrived user details with ID: ' + id : 'Ping Not found with ID = ' + id,
            user: userObject,
        })
    });

}



const updateUser=(req,res,next)=> {
    const {id}=req.params;
    Users.findOneAndUpdate({_id:id},req.body,{new:true},(err,updatedUser)=>{
      if(err) console.log("error =",err);
        res.json({
            message:'succes fully updated below user details',
            user:updatedUser,
        })
    });
}



const deleteUser=(req,res,next)=>{
    const {id}=req.params;
    Users.findOneAndRemove({_id:id},(err,deletedUser)=>{
       if(err)console.log("this id not found",err);
       res.json({
           message:deletedUser?"deleted succesfuly":"not found",
           user:deletedUser
       })
    });
}



export {getUsers,registerUser,getUser,updateUser,deleteUser}