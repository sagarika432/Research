const LocalStrategy = require ('passport-local').Strategy;
const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');


//Load Student model
const Student = mongoose.model('student');
const Professor = mongoose.model('professor');
module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField : 'email'},async(email,password,done) => {
            //Match User
            // Student.findOne({
            //     email : email
            // }).then(user => {
            //     if (!user)
            //     {
            //         return done(null,false,{message : 'No User found'});
            //     }
            //     //Match password
            //     bcrypt.compare(password , user.password,(err , isMatch) => {
            //         if(err) throw err;
            //         if(isMatch){
            //             return done(null,user,)
            //         }else{
            //             return done(null,false,{message : 'Password Incorrect !'});
            //         }

            //     })

            // })
            let user = await Student.findOne({email: email});
            if(!user) {
                user = await Professor.findOne({email: email });
                if(!user) {
                    return done(null,false,{message : 'No User found'});
                }
            } 

            bcrypt.compare(password , user.password,(err , isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null,user,)
                }else{
                    return done(null,false,{message : 'Password Incorrect !'});
                }

            })
            
            


        }));

        
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      passport.deserializeUser(async function(id, done) {
          try {
            let user = await Student.findById(id);
            if(!user) user = await Professor.findById(id);
            done(null,user)
          } catch (err) {
              done(err, null);
          }
       
      });

}