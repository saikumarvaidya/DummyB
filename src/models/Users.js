/**
 * Created by ajayr on 29-07-2017.
 */
import mongoose, {Schema} from "mongoose"
var bcrypt = require('bcryptjs');

const userSchema = new Schema({

    name:String,
    email:String,
    username:String,
    password:String
});

// Registering the model

var User = mongoose.model('users', userSchema);

//user registration
module.exports.createNewUser = function(newUser, callback){
    console.log("newUser",newUser);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save().then((err,result)=>{
                console.log("result",callback(err,result));
            });
        });
    });
}


module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}
export default User;