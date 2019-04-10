const express = require('express') ;
const exphbs  = require('express-handlebars');
const mongoose = require ('mongoose') ;
const flash = require('connect-flash');
const session =require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const passport = require('passport');

const app  =  express();


//Load routes
const auth = require('./routes/auth');
const scraping = require('./routes/scraping');
const student = require('./routes/studentRoutes');
const professor = require('./routes/professorRoutes');

//Passport Config
require('./config/passport')(passport);





// Map  Global promise
mongoose.Promise = global.Promise;


// const mongoURI ='mongodb://varshak333:varshak333@ds137483.mlab.com:37483/article-dev';
// //const mongoURI = 'mongodb://localhost/article-dev';

// //Map global promises
// mongoose.Promise = global.Promise;

// //Mongoose  Connect
// mongoose.connect(mongoURI ,{
//     useNewUrlParser: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));


const mongoURI = 'mongodb://localhost/research-activity';

const mongoURI1 ='mongodb://varshak333:varshak333@ds147073.mlab.com:47073/research';
//connect to mongoose
mongoose.connect(mongoURI1,{
   // useMongoClient : true
   useNewUrlParser: true 
})
.then(() => {
    console.log('MongoDB connected..');
})
.catch(err => {
    console.log(err);
});

//load  Student Model
require('./models/Student');
const Student = mongoose.model('student');
require('./models/Professor')
const Professor = mongoose.model('professor');

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//BodyParser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//static folder
app.use(express.static(path.join(__dirname,'public')));


//method-override middleware
app.use(methodOverride('_method'));


//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;
    next();
});

app.get('/' , (req,res) =>
{
    if(req.user) console.log(req.user.email);
    if(req.user && req.user.isStudent) { 
        res.redirect('/student') 
    } else if (req.user && req.user.isProfessor) {
        res.redirect('/professor')
    } else {
        const title = 'Research Activity'
        res.render('index',{
            title: title,
        });
    }
});

app.get('/about' , (req,res) =>{
    res.render('about')
});

app.get('/notifications' , (req,res) =>{
    res.render('notifications')
});
//use routes
app.use('/auth',auth);
app.use('/scraping',scraping);
app.use('/student',student);
app.use('/professor',professor)


const port = process.env.PORT || 3800 ;


app.listen (port ,() =>
{
    console.log(`server started on ${port}`);
});
