const express = require("express");
const app = express();

//login
app.get("/login/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
  });
  
// get user profile
  app.get("/users/:id", (req, res) => {
    res.sendFile("/public/profile.html", { root: __dirname });
  });
  

  app.get("/users/", (req, res) => {
    res.sendFile("/public/users.html", { root: __dirname });
  });
  
  //get product details
  app.get("/product/:id", (req, res) => {
    res.sendFile("/public/product.html", { root: __dirname });
  });

 //get home
  app.get("/home/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
  });



  const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});