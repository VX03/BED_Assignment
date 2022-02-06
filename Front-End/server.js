const express = require("express");
const app = express();

//login
app.get("/login/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
  });

 //get home
  app.get("/home/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
  });

 //get home
 app.get("/addItems/", (req, res) => {
    res.sendFile("/public/add.html", { root: __dirname });
  });

  app.get("/addCategory/", (req, res) => {
    res.sendFile("/public/addCategory.html", { root: __dirname });
  });

  app.get("/addProduct/", (req, res) => {
    res.sendFile("/public/addProduct.html", { root: __dirname });
  });
  app.get("/addPreference/", (req, res) => {
    res.sendFile("/public/addPreference.html", { root: __dirname });
  });

  app.get("/addPromotion/", (req, res) => {
    res.sendFile("/public/addPromotion.html", { root: __dirname });
  });

  app.get("/product/", (req, res) => {
    res.sendFile("/public/product.html", { root: __dirname });
  });

  app.get("/promotion/", (req, res) => {
    res.sendFile("/public/promotion.html", { root: __dirname });
  });
  const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
