var express = require('express');
var http = require('http');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();
const mongoose = require('mongoose')

const {ensureAuthenticated , ensureProfessor , ensureStudent} = require('../helpers/auth')
require('../models/Student');
const Student = mongoose.model('student');

require('../models/Professor')
const Professor = mongoose.model('professor');

require('../models/Project')
const Project = mongoose.model('project');

require('../models/Application')
const Application = mongoose.model('application');

router.get('/', ensureAuthenticated, ensureProfessor, (req,res) => {
    const title = 'Research Activity'
    res.render('professor/professor-dashboard',{
        title: title,
    })

})

router.post('/addProject', ensureAuthenticated, ensureProfessor , async(req,res) => {
    
    const newProject = new Project({
        project: req.body.project,
        sponsor: req.body.sponsor,
        grants: req.body.grants,
        timeOfCompletion: req.body.timeOfCompletion,
        professorMembers: [req.user.id],
        studentMembers: [],
        floatedBy: req.user.id
    })
    try {
        await newProject.save();
        req.flash('success_msg','Project Floated');
        res.redirect(`/ml/github/${req.user.name.replace(" ","%20")}/${req.body.project.replace(" ","%20")}`);
    } catch(err) {
        console.log(err);

    }

})

router.get('/addProject',ensureAuthenticated,ensureProfessor,(req,res) => {
    res.render('projects/add');
})

router.get('/showProjects',ensureAuthenticated,(req,res) => {
    Project.find()
    .populate('floatedBy')
    .then(projects => {
        console.log(req.user)
        res.render('projects/show',{
            projects,
            user: req.user
        });
    });
})


router.get('/apply/:id',ensureAuthenticated,ensureStudent, async (req,res) => {
    const id = req.params.id;
    const newApplication = new Application({
        project: id,
        student: req.user.id,
        applicationSubmitted : true,
        inReview: true,
        approved: false,
    });
    try{
        await newApplication.save();
        res.redirect(`/professor/showApplication/${newApplication._id}`);
    }catch(err) {
        console.log(err);
    }

})

router.get('/showApplication/:id',ensureAuthenticated,ensureStudent, async(req,res) => {
    try{
        const id = req.params.id
        Application.findOne({ _id : id})
        .populate('project student')
        .then(application => {
            console.log(application);
            res.render('application',{application});
        })
    } catch(err) {
        console.log(err)
    }
});

router.get('/getApplications',ensureAuthenticated,ensureProfessor,(req,res) => {
    Application.find({ inReview: true }).populate({
        path: 'project',
        match: { floatedBy: req.user.id },
    }).populate({path:'student'}).exec((err, applications) => {
      res.render('applications/list',{
          applications
      })
      // contains only tags where tagName is 'funny' or 'politics'
    })
});

router.get('/application/approve/:id',ensureAuthenticated,ensureProfessor,async (req,res) => {
    await Application.findOneAndUpdate({_id: req.params.id} , {approved:true , inReview : false} );
    res.redirect('/professor/getApplications');
})

router.get('/application/reject/:id',ensureAuthenticated,ensureProfessor,async (req,res) => {
    await Application.findOneAndUpdate({_id: req.params.id} , {approved:false , inReview : false} );
    res.redirect('/professor/getApplications');
})

router.get('/student/myApplications',ensureAuthenticated,ensureStudent, async( req ,res ) => {
    Application.find({ student : req.user.id })
    .populate('project student')
    .then(applications => {
       // console.log(applications);
        res.render('applications/studentApplications',{applications});
    })
})
module.exports = router;