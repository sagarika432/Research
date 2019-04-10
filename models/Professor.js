const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create  Schema
const ProfessorSchema = new Schema ({
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
    date: {
        type :Date ,
        default :Date.now
    },
    collegeName: {
        type: String,
    },
    isProfessor: {
        type:  Boolean,
        default: true
    },
    isStudent: {
        type: Boolean,
        default: false
    },

});
mongoose.model('professor' , ProfessorSchema);
