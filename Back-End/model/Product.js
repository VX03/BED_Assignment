

const db = require("./databaseConfig");

const Product = {
    addProduct:function(name,description,categoryid,brand,price,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");

                var sql = `
                insert into product(name, description,fk_categoryid,brand,price) values(?,?,?,?,?);
                `;

                var sql2=`
                SELECT productid FROM product ORDER BY productid DESC LIMIT 1;
                `
                conn.query(sql, [name,description,categoryid,brand,price], function (err,result) {
                    //conn.end();

                    if (err) {
                        conn.end();
                        console.log(err);
                        return callback(err,null);
                    } 
                        conn.query(sql2, [], function(err,result){
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } 
                            else{
                                console.log(result);
                                return callback(null, result[0]);
                            }
                        })
                    
                });

            }

        });

    

    },

    getProduct:function(id,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                SELECT product.name,product.description, category.categoryid,category.category, product.brand,product.price FROM product
                INNER JOIN category ON
                product.fk_categoryid = category.categoryid
                WHERE product.productid = ?
                `
                conn.query(sql, [id], function (err,result) {
                    conn.end();

                    if (result.length===0) {
                        console.log(err);
                        return callback(null,null);
                    } 
                    else if(err){
                        console.log("error");
                        return callback(err,null);
                    }
                    
                    console.log(result[0])
                    return callback(null,result[0]);
                    
                });

            }

        });

    

    },
    findAll: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
    
          if (err) {//database connection gt issue!
    
            console.log(err);
            return callback(err, null);
          } else {
            const findAllQuery =
              `
        SELECT * From product;
        `;
            dbConn.query(findAllQuery, (error, results) => {
              dbConn.end();
              if (error) {
                callback(error, null);
                return;
              }
              callback(null, results);
            });
          }
        });
      },

    deleteProduct:function(id,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                DELETE FROM product WHERE productid=?
                `
                conn.query(sql, [id], function (err,result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } 
 
                    else if(result.affectedRows===0){
                        return callback(null,null);
                    }
                    else{
                        console.log(result);
                        callback(null, result);
                    }
                    
                });

            }

        });

    

    },

    addReview:function(productid,userid,rating,review,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");

                var sql = `
                INSERT INTO reviews(fk_productid,fk_userid,rating,review) VALUES(?,?,?,?);
                `;

                var sql2=`
                SELECT reviewsid FROM reviews ORDER BY reviewsid DESC LIMIT 1;
                `
                conn.query(sql, [productid,userid,rating,review], function (err,result) {
                    //conn.end();

                    if (err) {
                        conn.end();
                        console.log(err);
                        return callback(err,null);
                    } 
                        conn.query(sql2, [], function(err,result){
                            conn.end();
                            if (err) {
                                console.log(err);
                                return callback(err,null);
                            } 
                            else{
                                console.log(result);
                                callback(null, result[0]);
                            }
                        })
                    
                });

            }

        });

    

    },

    allReviews:function(id,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                SELECT product.productid,user.userid, user.username,reviews.rating, reviews.review,reviews.date_of_creation FROM reviews
                INNER JOIN user ON
                user.userid = reviews.fk_userid
                INNER JOIN product ON
                product.productid = reviews.fk_productid
                WHERE product.productid = ?;
                `
                conn.query(sql, [id], function (err,result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    }
                    else if(result.length===0){
                        return callback(null,null);
                    } 
                    else{
                        console.log(result);
                        return callback(null, result);
                    }
                    
                });

            }

        });

    },
    
    
}

module.exports = Product;