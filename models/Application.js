const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create  Schema
const ApplicationSchema = new Schema ({
   project: {
       type: Schema.Types.ObjectId,
       ref: 'project'
   },
   student: {
       type: Schema.Types.ObjectId,
       ref: 'student'
   },
   applicationSubmitted: {
       type: Boolean,
       default: true
   },
   inReview: {
       type: Boolean,
       default: true,
   },
   approved: {
       type:Boolean
   },
   date: {
    type :Date ,
    default :Date.now
   }
});
mongoose.model('application' , ApplicationSchema);
