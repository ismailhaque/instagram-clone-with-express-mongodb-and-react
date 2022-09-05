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
        trim : true
    },
    phone : {
        type : String,
        trim : true
    },
    bio : {
        type : String,
        trim : true
    },
    gander : {
        type : String,
        trim : true
    },
    website : {
        type : String,
        trim : true
    },
    username : {
        type : String,
        required : true,
        trim : true
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