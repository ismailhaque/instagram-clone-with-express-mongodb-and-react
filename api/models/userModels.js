import mongoose from "mongoose";


// user schema
const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    photo : {
        type : String,
        default : 'avatar.png'
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : true
    }

}, {
    timestamps : true
})



// export schema
export default mongoose.model(`User`, userSchema)