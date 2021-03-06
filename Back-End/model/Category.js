

const db = require("./databaseConfig");

const Category = {


  
  getCategory:function(id,callback){
    var conn = db.getConnection();
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err,null);
        }
        else {
            console.log("Connected!");
            var sql=`
            SELECT product.name, product.description, category.categoryid, category.category, product.brand, product.price FROM product
            INNER JOIN category ON
            product.fk_categoryid = category.categoryid
            WHERE category.categoryid = ?
            `
            conn.query(sql, [id], function (err,result) {
                conn.end();


               if(err){
                    console.log("error");
                    return callback(err,null);
                }
                console.log(result)
                return callback(null,result);
                
            });

        }

    });



},
    addCategory:function(category,description,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");

                var sql = 'Insert into category(category,description) values(?,?)';

                conn.query(sql, [category,description], function (err,result) {
                    conn.end();
                    
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                        
                    } else {
                        console.log(result);
                        return callback(null);
                    }
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
        SELECT categoryid,category,description FROM category;
        `;
            dbConn.query(findAllQuery, (error, results) => {
              dbConn.end();
              if (error) {
                callback(error, null);
                return;
              }
              return callback(null, results);
            });
          }
        });
      },

    addInterest: function (categoryid,userid,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
    
          if (err) {//database connection gt issue!
    
            console.log(err);
            return callback(err, null);
          } else {
            const addQuery =
              `
              Insert into userinterest(fk_categoryid,fk_userid) values(?,?);
        `;
        for(var i=0;i<categoryid.length;i++)
            {
              dbConn.query(addQuery,[categoryid[i],userid], (error, results) => {
                if(i===categoryid.length-1){
                  console.log("end")
                dbConn.end();
              }
              
                if (error) {
                  console.log(error)
                callback(error, null);
                return;
              }
              console.log(results);
              return callback(null, results);
              
            
            });
          }

          }
        });
      },


}


module.exports = Category;