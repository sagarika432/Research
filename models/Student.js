const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create  Schema
const StudentSchema = new Schema ({
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    name : {
        type : String ,
        required : true 
    },
    department :{
        type : String,
        required : true
    },
    year : {
        type : String ,
        required :true
    },
    uid : {
        type : String ,
        required :true
    },
    date: {
        type :Date ,
        default :Date.now
    },
    github: {
        type : String,
        required :true
    },
    collegeName: {
        type: String,
        required :true
    },
    isProfessor: {
        type:  Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: true
    },
    resume: {
        type:String
    }

});
mongoose.model('student' , StudentSchema);
