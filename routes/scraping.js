var express = require('express');
var http = require('http');
const request = require('request');
const cheerio = require('cheerio');
var router = express.Router();
module.exports = router;


router.get('/github/:githandle',(req,res) => {
    url = 'https://github.com/'+ req.params.githandle;
    var json = {
    
        result : {
            
        }
        
        };
    request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {


        //console.log(html);
        const $ = cheerio.load(html);
        const no_repositories = $('.UnderlineNav-body') ;
        console.log(no_repositories.text());
      
                 $('.UnderlineNav-body a').each((i,el)=>{
                           // const item =$(el).text();
                            
                            const key = $(el).attr('title');
                            const x = $(el);
                            //const item1 = $(el).find('span').text();
                            
                            var value='' ;
                            if (x.has('span'))
                                value = (x.children('span').text().replace(/\s\s+/g, ''));
                            else    
                                value ='';
                            console.log(key + " :" + value);
                    
                           json.result [key] = value;
                            
                        })
                    }
                    res.send(JSON.stringify(json));
    });
 
    
});

router.get('/internships' , (req,res) => {


    
    var json2 = [];
    var json = {
    
        result : {

            
            
        }
        
    };
    request('https://internshala.com/internships/machine%20learning-internship', (error, response, html) => {
    if (!error && response.statusCode == 200) {


       // console.log(html);
         const $ = cheerio.load(html);
//const no_repositories = $('.pv-accomplishments-block__count') ;
//console.log(no_repositories.text());
      
                $('.table-cell a').each((i,el)=>{
                           //const item =$(el).text();
                            
                            const key = $(el).attr('href');
                           //const x = $(el).parent('h4');
                            //const item1 = $(el).find('span').text();
                            
                            var value= $(el).text().replace(/\s\s+/g, '') ;
                            
                            if (value == 'View Details')
                              value = 'Click on link for more details';
                           // console.log(key + " :" + value);
                            
                            var json1  ={
                                "name" : value,
                                "link" : 'http://internshala.com' + key
                            }
                            json2.push(json1);
                           
                            //json.result [value] = key;
                            
                        })
                  }
                  json2.shift();
                  //console.log(json2)
                  //json2 = JSON.stringify(json2)
                  
                  res.render('research-internship',{
                    ideas : json2
            
                });
                    //res.send(JSON.stringify(json2));
                   
    });
 
    //console.log(json2);
   

});


router.get('/hackathons',(req,res) => {
    url = 'https://www.hackevents.co/hackathons';
    var json2 = [] ;
    var json = {
    
        result : {
           
        }
        
        };
    request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {


        //console.log(html);
        const $ = cheerio.load(html);
      //  const no_repositories = $('card-list card-list--column jobs-search-results__list') ;
       //console.log(no_repositories.text());
      
                 $('.card-list card-list--column jobs-search-results__list').each((i,el)=>{
                           // const item =$(el).text();
                            
                          //  const key = $(el).attr('href');
                           // const x = $(el)
                            //const item1 = $(el).find('span').text();
                            
                            var value=$('.job-card-search__title lt-line-clamp lt-line-clamp--multi-line ember-view').text();
                            //if (x.has('span'))
                             //   value = (x.children('span').text().replace(/\s\s+/g, ''));
                           // else    
                             //   value ='';
                            //console.log(key + " :" + value);
                            var json1 = {
                                "name" : value,
                               
                            }
                           
                            json2.push(json1);
                            
                        })
                    }
                    res.send(JSON.stringify(json2));
    });
 
    
});

router.get('/research',(req,res) => {
    url = 'https://www.linkedin.com/jobs/research-intern-jobs/?country=in';
    var json = {
    
        result : {
            
        }
        
        };
    request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {


        //console.log(html);
        const $ = cheerio.load(html);
        const no_repositories = $('.UnderlineNav-body') ;
        console.log(no_repositories.text());
      
                 $('.UnderlineNav-body a').each((i,el)=>{
                           // const item =$(el).text();
                            
                            const key = $(el).attr('title');
                            const x = $(el);
                            //const item1 = $(el).find('span').text();
                            
                            var value='' ;
                            if (x.has('span'))
                                value = (x.children('span').text().replace(/\s\s+/g, ''));
                            else    
                                value ='';
                            console.log(key + " :" + value);
                    
                           json.result [key] = value;
                            
                        })
                    }
                    res.send(JSON.stringify(json));
    });
 
    
});