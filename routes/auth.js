const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Load helper

const {ensureAuthenticated , ensureProfessor , ensureStudent} = require('../helpers/auth')


//load  Student Model
require('../models/Student');
const Student = mongoose.model('student');

require('../models/Professor')
const Professor = mongoose.model('professor');

router.get ('/student/signup' ,(req,res) => {
    res.render('users/register');
});


router.get ('/professor/signup' ,(req,res) => {
    res.render('users/professor-register');
});

router.get('/login',(req,res) => {
    res.render('users/login');

});

//login form post
router.post('/login' , (req,res ,next) => {
    passport.authenticate('local' , {
        successRedirect : '/',
        failureRedirect : '/auth/login',
        failureFlash :true
    })(req,res,next);

});


//student reg form post
router.post('/student/signup', (req,res) => {
    let errors = [] ;
    if (req.body.password != req.body.password2)
    {
        errors.push({
            text : 'Passwords do not match'
        });
        
    }
    if (req.body.password.length < 8)
    {
        errors.push({
            text : 'Passwords must be atleast 8 characters'
        });
    }
    if(errors.length > 0)
    {
        res.render('users/register',{
            errors : errors,
            name : req.body.name,
            email : req.body.email,
            department : req.body.department,
            uid: req.body.uid,
            year : req.body.year,
            github: req.body.github,
            collegeName: req.body.collegeName,
        });
    }
    else{
        Student.findOne({email : req.body.email})
        .then(user => {
            if(user){
                req.flash('error_msg','Email alerady registered');
                res.redirect('/auth/student/signup');
            } else {
                
        const newStudent = new Student ({
            name : req.body.name,
            email : req.body.email,
            department: req.body.department,
            year : req.body.year ,
            password : req.body.password,
            uid : req.body.uid,
            github: req.body.github,
            collegeName: req.body.collegeName
        });
        bcrypt.genSalt(10 , (err,salt) => {
            bcrypt.hash(newStudent.password,salt,(err,hash)=>{
                if(err) throw err;
                newStudent.password = hash ;
                newStudent.save()
                    .then(student =>{
                        req.flash('success_msg','You are now registered and can log in');
                        res.redirect('/auth/login');
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    });

            });

        });
            }
        });
        //console.log(newStudent);
    }
});



//Professor SignUp
router.post('/professor/signup', (req,res) => {
    let errors = [] ;
    if (req.body.password != req.body.password2)
    {
        errors.push({
            text : 'Passwords do not match'
        });
        
    }
    if (req.body.password.length < 8)
    {
        errors.push({
            text : 'Passwords must be atleast 8 characters'
        });
    }
    if(errors.length > 0)
    {
        res.render('users/register',{
            errors : errors,
            name : req.body.name,
            email : req.body.email,
            department : req.body.department,
            uid: req.body.uid,
            year : req.body.year
        });
    }
    else{
        Professor.findOne({email : req.body.email})
        .then(user => {
            if(user){
                req.flash('error_msg','Email alerady registered');
                res.redirect('/auth/student/signup');
            } else {
                
        const newProfessor = new Professor ({
            name : req.body.name,
            email : req.body.email,
            department: req.body.department,
            password : req.body.password,
            collegeName: req.body.collegeName
        });
        bcrypt.genSalt(10 , (err,salt) => {
            bcrypt.hash(newProfessor.password,salt,(err,hash)=>{
                if(err) throw err;
                newProfessor.password = hash ;
                newProfessor.save()
                    .then(Professor =>{
                        req.flash('success_msg','You are now registered and can log in');
                        res.redirect('/auth/login');
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    });

            });

        });
            }
        });
        //console.log(newStudent);
    }
});






//Logout User
router.get ('/logout',(req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');

});
module.exports = router;

