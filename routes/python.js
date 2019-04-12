var express = require('express');
var http = require('http');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();
const mongoose = require('mongoose')
const nodemailer =require('nodemailer')

const {ensureAuthenticated , ensureProfessor , ensureStudent} = require('../helpers/auth')
require('../models/Student');
const Student = mongoose.model('student');

require('../models/Professor')
const Professor = mongoose.model('professor');

require('../models/Project')
const Project = mongoose.model('project');

require('../models/Application')
const Application = mongoose.model('application');

const ps = require('python-shell')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'universalresearchportal@gmail.com',
        pass: 'Sagarika@123'
    }

});

router.get('/', (req,res) => {
    res.send('hello');
})

call_github = async (req,res) => {
    const name = req.params.name;
    const projectName = req.params.projectName;

    var options = {
        args:
        [
        ]
      }
      ps.PythonShell.run('/home/sagarika12/Research/routes/github.py', options, async function (err, data) {
        if (err) res.send(err);
        let result = JSON.parse(data);
        let emailList = new Set();
        if(result["one"].includes("varshak333@gmail.com")) {
            result["one"].forEach(element => {
                emailList.add(element) 
            });
        }
        if(result["two"].includes("varshak333@gmail.com")) {
            result["two"].forEach(element => {
                emailList.add(element) 
            });
        }
        if(result["three"].includes("varshak333@gmail.com")) {
            result["three"].forEach(element => {
                emailList.add(element) 
            });
        }
        console.log(Array.from(emailList))
        let mailOptions = {
            from: 'varshak333@gmail.com',
            to: Array.from(emailList),
            subject: `Check out New Floated Projects ${projectName} by ${name} `,
            html: `<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="20" >

            <tr>
            
            <td>
            
            <h2>Checkout new floated project ${projectName} by ${name}</h2>
            <img src="https://www.mathematica-mpr.com/-/media/internet/labor-graphics-and-photos/labor-photos/ss_251529133-clear-630-315.jpg">
            
            </td>
            
            </tr>
            
            </table>
            `
        }
        await transporter.sendMail(mailOptions,(err, info) =>{
            if(err) {
                console.log(err)
            } else {
                console.log(info.response);
            }
        })
        res.redirect('/professor/showProjects')


      });
}
router.get('/github/:name/:projectName',ensureAuthenticated,ensureProfessor,call_github);


module.exports = router;
