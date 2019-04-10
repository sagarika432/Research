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

router.get('/', (req,res) => {
    res.send('hello')
})




module.exports = router;
