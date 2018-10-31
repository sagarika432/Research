const LocalStrategy = require ('passport-local').Strategy;
const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');


//Load Student model
const Student = mongoose.model('student');
module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField : 'email'},(email,password,done) => {
            //Match User
            Student.findOne({
                email : email
            }).then(user => {
                if (!user)
                {
                    return done(null,false,{message : 'No User found'});
                }
                //Match password
                bcrypt.compare(password , user.password,(err , isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user,)
                    }else{
                        return done(null,false,{message : 'Password Incorrect !'});
                    }

                })

            })

        }));

        
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Student.findById(id, function(err, user) {
          done(err, user);
        });
      });

}