module.exports = {
    ensureAuthenticated: function(req,res,next){

        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Not Authorized');
        res.redirect('/auth/login');
    },
    ensureProfessor: function(req,res,next) {
        if(req.user  && req.user.isProfessor) return next();
        req.flash('error_msg','Not Authorized');
        res.redirect('/auth/login');
    },
    ensureStudent: function(req,res,next) {
        if(req.user  && req.user.isStudent) return next();
        req.flash('error_msg','Not Authorized');
        res.redirect('/auth/login');
    }
}