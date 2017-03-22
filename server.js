// Get dependencies
var express = require('express');
var path    = require("path");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//connect to database
var mongoose = require("mongoose");

var url = process.env.MEMURL ;
 mongoose.connect(url).then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));;

  //=================================
var passport                    = require("passport"),
    LocalStrategy               = require("passport-local").Strategy;
    // passportLocalMongoose       = require ("passport-local-mongoose");


  
 // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//View Engine
app.set("view engine","ejs");
//public files
app.use (express.static("public"));
app.use (express.static("node_modules"));
//app.use(cookieParser());

var Voteuser  = require("./models/voteuser");
var Poll  = require("./models/poll");
//Authenticate Section

  app.use(require("express-session")({
    secret: "Rusty the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Voteuser.authenticate()));
passport.serializeUser(Voteuser.serializeUser());
passport.deserializeUser(Voteuser.deserializeUser());
//Authentication


// Get our API routes
const api = require('./routes/api/api');
const mypage = require('./routes/otherpages/mypage');

//set local variables
app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

app.use("/mypage",mypage);

app.get('/getuser',(req,res)=>{
  if (req.user== undefined){
    res.send("");
    
 }else {
res.send(req.user.username);

  }
  
});

app.get('/logout',(req,res)=>{
   req.logout();
 res.redirect("/");
  
});






  app.post("/login",passport.authenticate("local",{}),function(req,res){
      
        if (req.user==undefined){
          res.send("")
        } else {
              res.send(req.user.username);
        }
      
      });


app.post("/signupnow",function(req,res){
       // save/register user details and authenticate for instant login
  Voteuser.register(new Voteuser({username:req.body.username,name:req.body.name}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
               
       });
      }
  });
 
})




app.post("/changepass",function(req,res){
  var namestore=req.user.name;
       
Voteuser.findByIdAndRemove(req.user._id,function(err){
   if(err){
     console.log(err.message);
   }else {
     
   }

})

  Voteuser.register(new Voteuser({username:req.body.username,name:namestore}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
               console.log(req.user);
       });
      }
  });
 
})

app.post("/createpoll",function(req,res){
       
  Poll.create({title:req.body.title,author:req.body.creator,options:req.body.options,count:req.body.count},function(err,poll){
      if (err){
           res.send(err.message);
         
      }else {
       res.send("https://legendaryvote.herokuapp.com/"+poll.author+"/"+poll.title);
      }
  });
})



app.post("/editpoll",function(req,res){
       
  Poll.findByIdAndUpdate(req.body.id,{title:req.body.title,author:req.body.creator,options:req.body.options,count:req.body.count},function(err,poll){
      if (err){
           res.send(err.message);
         
      }else {
          Poll.findById(req.body.id,function(err,realpoll){
            if(err){
              console.log(err.message);
            } else {
                  res.send("https://legendaryvote.herokuapp.com/"+realpoll.author+"/"+realpoll.title);
              
            }
          })

       
      }
  });
})


app.post("/editpoll2",function(req,res){
       
  Poll.findByIdAndUpdate(req.body.id,{title:req.body.title,author:req.body.creator,options:req.body.options,count:req.body.count},function(err,poll){
      if (err){
           res.send(err.message);
         
      }else {
          Poll.findById(req.body.id,function(err,realpoll){
            if(err){
              console.log(err.message);
            } else {
                   res.json(realpoll);
                console.log(realpoll);
            }
          })

       
      }
  });
})

app.post("/getpoll",function(req,res){
       
  Poll.find({author:req.body.username},function(err,pollist){
      if (err){
           res.send(err.message);
         
      }else {
       
       res.json(pollist);
      }
  });
})

app.post("/deletepoll",function(req,res){
       
  Poll.findByIdAndRemove(req.body.id,function(err){
      if (err){
           res.send(err.message);
         
      }else {
       
      }
  });
})


app.post("/getsinglepoll",function(req,res){
       
  Poll.find({author:req.body.author,title:req.body.title},function(err,singlepoll){
      if (err){
            console.log(err.message);
         
      }else {
      if (singlepoll.length <1){
        Poll.find({author:req.body.author,title:req.body.title+"?"},function(err,newsinglepoll){ //takes care of quotation marks
                    if (err){
                      console.log(err.message);
                    } else {
                      res.json(newsinglepoll);
                       console.log(newsinglepoll);
            }})
      }else {
           res.json(singlepoll);
          console.log(singlepoll);
      }
     
      }
  });
})



// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html')); //path installation required
  //res.sendFile("../dist/index.html'");
});






/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';



app.listen(port,function(){
  console.log("Server has started")
})