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
        res.redirect('/professor/showProjects');
    } catch(err) {
        console.log(err);

    }
})

router.get('/addProject',ensureAuthenticated,ensureProfessor,(req,res) => {
    res.render('projects/add');
})

router.get('/showProjects',(req,res) => {
    Project.find()
    .populate('floatedBy')
    .then(projects => {
        res.render('projects/show',{
            projects
        });
    });
})
module.exports = router;