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

router.get('/', ensureAuthenticated, ensureStudent, (req,res) => {
    const title = 'Research Activity'
    res.render('student/student-dashboard',{
        title: title,
    })

})
module.exports = router;