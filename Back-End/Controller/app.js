//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

var express=require('express');
const user=require("../model/User.js");
const Category=require("../model/Category.js");
const product=require("../model/Product.js");
const Promotion=require("../model/Promotion.js");
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js"); 
var app=express();

var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

app.post("/login/", (req, res) => {

    user.verify(req.body.username,req.body.password,
      (error, user) => {
        if (error) {
          res.status(500).send();
          return;
        }
        if (user === null) {
          res.status(401).send();
          return;
        }
        const payload = { user_id: user.id,role:user.role };
        jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
          if (error) {
            console.log(error);
            res.status(401).send();
            return;
          } 
          res.status(200).send({
            token: token,
            user_id: user.userid
          });
        })
    });
  });

  app.post('/user/logout', function(req,res){
    console.log("..logging out.");
    //res.clearCookie('session-id'); //clears the cookie in the response
    //res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Log out successful!'});
  
  });

//1 - User.js
app.post('/users/',  function (req, res) {
    var username = req.body.username;
    var email = req.body.email; 
    var password = req.body.password;
    var contact = req.body.contact;
    var type = req.body.type;
    

    user.addUser(username, email, password, contact, type, function (err, result) {
        if (!err) {
            console.log(result);
            res.status(201).send({"userid":result});;
        } else if(err.code=='ER_DUP_ENTRY'){
            res.status(422).send();
        } else{
            res.status(500).send();
        }
    
    });

});

//2 - User.js
app.get("/users/",(req,res)=>{
    user.findAll((err, result) => {
        if (err) {
          console.log(error);
          res.status(500).send();
        }
        res.status(200).send(result)
      });   
})

//3 - User.js
app.get("/users/:id",(req,res,next)=>{
    console.log(typeof(req.params.id))
    const id=parseInt(req.params.id)
    console.log(typeof(id))
    if(isNaN(id)){
        res.status(400).send()
    }
    user.findByID(id, function(error, results){
        if (error) {
            console.log("error")
          res.status(500).send();
          return;
        };
        if (results === null) {
            res.status(404).send();
            return;
        };
        console.log("here")
        res.status(200).send(results)
      });
})

//4 - User.js
app.put("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    var username = req.body.username;
    var email = req.body.email; 
    var password = req.body.password;
    var contact = req.body.contact;
    var type = req.body.type;
    if (isNaN(id)) {
      res.status(400).send();
      return;
    }
  
    user.editUser(username,email,password,contact,type,id, (err) => {
      
        if(!err){
            res.status(204).send();
        }
        else if (err.code=='ER_DUP_ENTRY') {
        console.log(err);
        res.status(422).send();
      };

      res.status(500).send();
    });
});

//5 - Category.js
app.post('/category/',isLoggedInMiddleware,  function (req, res) {
    
    var role=req.decodedToken.role
    console.log("decoded role is"+role)
    if(role!="Admin"){
      res.send("invalid user")
    }
    
    var category = req.body.category;
    var description = req.body.description;


Category.addCategory(category,description, function (err, result) {
        if (!err) {
            console.log(result);
            res.status(204).send(result);
        } 
        else if(err.code == 'ER_DUP_ENTRY'){
            res.status(422).send();
        }
         else{
            res.status(500).send();
        }
    
    });
});

//6 - Category.js
app.get("/category/",(req,res)=>{
    Category.findAll((err, users) => {
        if (err) {
          console.log(error);
          res.status(500).send();
        }
        res.status(200).send(users)
      });   
})

//7 - Product.js
app.post('/product/',isLoggedInMiddleware,  function (req, res) {
    
    var role=req.decodedToken.role
    console.log("decoded role is"+role)
    if(role!="Admin"){
      res.send("invalid user product")
    }
    
    var name = req.body.name;
    var description = req.body.description; 
    var categoryid = req.body.categoryid;
    var brand = req.body.brand;
    var price = req.body.price;


    product.addProduct(name, description, categoryid, brand, price, function (err,result) {

        if (!err) {
            console.log(result);
            res.status(201).send(result);;
        } 
         else if(err.code=='ER_DUP_ENTRY'){
            res.status(422).send();
    }
         else 
         res.status(500).send();
    });

});

//8 - Product.js
app.get("/product/:id",(req,res,next)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send()
    }
    product.getProduct(id, function(error, results){
        if (error) {
          res.status(500).send();
          return;
        };
        if (results === null) {
            res.status(404).send();
            return;
        };
        console.log("here")
        res.status(200).send(results)
      });
})

//9 - Product.js
app.delete('/product/:id', function(req,res){
    var id=req.params.id;

    product.deleteProduct(id, function(err,result){
        if (err) {

            res.status(500).send();
        } 
        if(result==null){
            res.status(404).send();
        }
         else 
         res.status(204).send();
    });

    })

//10 Product.js
app.post('/product/:id/review',isLoggedInMiddleware,  function (req, res) {
    var role=req.decodedToken.role
    console.log("decoded role is"+role)
    if(role!="Admin"||role!="Customer"){
      res.send("invalid user review")
    }
    
    var productid = JSON.parse(req.params.id);
    var userid = req.body.userid;
    var rating = req.body.rating;
     var review = req.body.review; 

    product.addReview(productid,userid,rating,review, function (err,result) {

        if (!err) {
            console.log(result);
            res.status(201).send(result);;
        } 
         else 
         res.status(500).send();
    });

});

//11 - Product.js
app.get("/product/:id/reviews",(req,res,next)=>{
    console.log(typeof(req.params.id))
    const id=parseInt(req.params.id)
    console.log(typeof(id))
    if(isNaN(id)){
        res.status(400).send()
    }
    product.allReviews(id, function(error, results){
        if (error) {
          res.status(500).send();
          return;
        }
        else if(results===null){
             res.status(404).send();
            return;
        }
        console.log("here")
        res.status(200).send(results)
      });
})

//12 - Category.js  
app.post('/interest/:userid',isLoggedInMiddleware,  function (req, res) {
    var role=req.decodedToken.role
    console.log("decoded role is"+role)
    if(role!="Admin"||role!="Customer"){
      res.send("invalid user interest")
    }
    
    var userid = req.params.userid;
    var categoryids =req.body.categoryids;
    //console.log(categoryids)
    var ids=[]
    ids = categoryids.split(",");
    for (a in ids ) {
        ids[a] = parseInt(ids[a], 10);
    }
    console.log(ids)
    //categoryids=[categoryids]

    console.log(categoryids)
    Category.addInterest(ids,userid, function (err,result) {

        if (!err) {
            console.log(result);
            res.status(201).send();;
        } 
         else 
         res.status(500).send();
    });

});

//promotion
app.post('/promotion/',isLoggedInMiddleware,  function (req, res) {
  var role=req.decodedToken.role
  console.log("decoded role is"+role)
  if(role!="Admin"||role!="Customer"){
    res.send("invalid promotion interest")
  }
  
  
    var productid = req.body.id;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var discount = req.body.discount;


Promotion.AddPromotion(productid,startdate,enddate,discount, function (err, result) {
        if (!err) {
            console.log("here");
            res.status(201).send(result);
        } 

            res.status(500).send();

    
    });
});

app.get("/promotion/:id",(req,res,next)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send()
    }
    Promotion.allPromotion(id, function(error, results){
        if (error) {
          res.status(500).send();
          return;
        };
        console.log("here")
        res.status(200).send(results)
      });
})

app.delete('/promotion/:promotionid',isLoggedInMiddleware, function(req,res){
  var role=req.decodedToken.role
  console.log("decoded role is"+role)
  if(role!="Admin"||role!="Customer"){
    res.send("invalid delete promotion")
  }  
  
  var id=req.params.promotionid;

    Promotion.deletePromotion(id, function(err,result){
        if (err) {
            res.status(500).send();
        } 
        if(result==null){
            res.status(404).send();
        }
         else 
         res.status(204).send();
    });
})

app.put("/promotion/:promotionid",isLoggedInMiddleware, (req, res, next) => {
  var role=req.decodedToken.role
  console.log("decoded role is"+role)
  if(role!="Admin"||role!="Customer"){
    res.send("invalid delete promotion")
  }  
  
    const promotionid = parseInt(req.params.promotionid);
    var productid = req.body.id;
    var startdate = req.body.startdate; 
    var enddate = req.body.enddate;
    var discount = req.body.discount;
    if (isNaN(promotionid)) {
      res.status(400).send();
      return;
    }
  
    Promotion.editPromotion(promotionid,productid,startdate,enddate,discount, (err,results) => {
      
        if(!err){
            res.status(204).send();
        }
        else if (err.code=='ER_DUP_ENTRY') {
        console.log(err);
        res.status(422).send();
      };

      res.status(500).send();
    });
});

module.exports=app;