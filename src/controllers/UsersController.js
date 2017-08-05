/**
 * Created by ajayr on 29-07-2017.
 */
import Users from '../models/Users'

const users = [
    {
        user_id:121212,
        user_name:'testuser',
        user_password:'testpassword',
        user_present_class:'firstclass',
        section_id:'sa1234',
        school_id:'sc1234',
        user_father_name:'testfather',
        user_mother_name:'testmother',
        user_father_password:'testfatherpassword',
        user_contact:['1234567890','12334567810'],
        user_address:{d_no:'2-21',pincode:'5042001',district:'adilabad',mandal:'jaipur',vill_city:'indaram',state:'telangana'},
        user_dob:'12-04-1995',
        user_joined_Date:'12-09-2010',
        user_left_Date:null,
        ///////////////////
    },
    {
        /*id: 2,
        from: 'vsk',
        to: 'theajr',
        message: 'Hello...'
        */

        user_id:121213,
        user_name:'testuser1',
        user_password:'testpassword2',
        user_present_class:'firstclass',
        section_id:'sa1234',
        school_id:'sc1234',
        user_father_name:'testfather1',
        user_mother_name:'testmother1',
        user_father_password:'testfatherpassword1',
        user_contact:['1234567891','12334567812'],
        user_address:{d_no:'2-22',pincode:'5042001',district:'adilabad',mandal:'jaipur',vill_city:'indaram',state:'telangana'},
        user_dob:'12-03-1995',
        user_joined_Date:'12-09-2012',
        user_left_Date:null,
    }
]

const getUsers = (req, res, next) => {
    Users.find({}, {},req.query, (error, users) => {
        if (error) console.log(":-) error = ", error);
        res.json({
            message:users.length? 'Successfully retrieved users' : 'There are no users! Be first to create!',
            users,
        })
    });
}
const addUser = (req, res, next) => {
    /*const {
     user_id,
     user_name,
     user_password,
     user_present_class,
     section_id,
     school_id,
     user_father_name,
     user_mother_name,
     user_father_password,
     user_contact,
     user_address,
     user_dob,
     user_joined_Date,
     user_left_Date} = req.body;
     const newUser = {
     user_id,
     user_name,
     user_password,
     user_present_class,
     section_id,
     school_id,
     user_father_name,
     user_mother_name,
     user_father_password,
     user_contact,
     user_address,
     user_dob,
     user_joined_Date,
     user_left_Date
     }*/
    var userObject = new Users(req.body);
    userObject.save(function (err, newUserSavedFromDB) {
        if (err) return err;
        res.json({
            message: 'New user added successfully',
            user: newUserSavedFromDB
        })
    });
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




export {getUsers,addUser,getUser,updateUser,deleteUser}
