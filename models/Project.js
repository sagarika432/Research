const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create  Schema
const ProjectSchema = new Schema ({

    project:{
        type:String,

    },
    sponsor: {
        type: String,
    },
    grants: {
        type: String,
    },
    timeOfCompletion: {
        type: String,
    },
    professorMembers: [{type: mongoose.Schema.Types.ObjectId , ref: 'professor'}] ,
    studentMembers: [{type: mongoose.Schema.Types.ObjectId , ref: 'student'}] ,
    floatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'professor'
    }

});
mongoose.model('project' , ProjectSchema);
