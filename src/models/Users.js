/**
 * Created by ajayr on 29-07-2017.
 */
import mongoose, {Schema} from "mongoose"


const userSchema = new Schema({

    user_id:Number,
    user_name:String,
    user_password:String,
    user_present_class:String,
    section_id:String,
    school_id:String,
    user_father_name:String,
    user_mother_name:String,
    user_father_password:String,
    user_contact:[String],
    user_address:{d_no:String,pincode:String,district:String,mandal:String,vill_city:String,state:String},
    user_dob:Date,
    user_joined_Date:Date,
    user_left_Date:Date
});

// Registering the model

var User = mongoose.model('Users', userSchema);

module.exports.getUserByUsername = function(username, callback){
    var query = {user_id: username};
    User.findOne(query, callback);
}
export default User;