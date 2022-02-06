//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

const db = require("./databaseConfig");

const Promotion = {

    AddPromotion:function(productid,startdate,enddate,discount,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                
               var sql='SELECT price FROM product WHERE productid=?;'

                var sql2=`
                Insert into promotion(fk_productid,start,end,discount,discounted_price) values(?,?,?,?,?);
                `
               
                var sql3='SELECT promotionid,date_of_creation FROM promotion ORDER BY promotionid DESC LIMIT 1;'
                var price;
                conn.query(sql, [productid], function (err,result) {
                    //conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } 
                        
                        console.log(result[0])
                        price=result[0].price*((100-discount)/100);
                          console.log("here now")

                           conn.query(sql2, [productid,startdate,enddate,discount,price], function(err,result){
                            //conn.end();
                            console.log("this")
                              
                              if (err) {
                            console.log(err);
                            return callback(err,null);
                            } 

                              conn.query(sql3, [], function (err,result) {
                              conn.end();
                                if (err) {
                                  console.log(err);
                                  return callback(err,null);
                                } 
                                else{
                                  console.log(result[0]);
                                  callback(null, result[0]);
                                }
                        })
                    })
                    
                });

            }

        });

    

    },

    allPromotion:function(id,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                SELECT product.name, promotion.start, promotion.end, promotion.discount, product.price, promotion.discounted_price,promotion.date_of_creation FROM promotion
                INNER JOIN product ON
                product.productid = promotion.fk_productid
                WHERE promotion.fk_productid=?;
                `
                conn.query(sql, [id], function (err,result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } 
                    else{
                        console.log(result);
                        callback(null, result);
                    }
                    
                });

            }

        });

    },
    findAll:function(callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                SELECT product.name, promotion.start, promotion.end, promotion.discount, product.price, promotion.discounted_price,promotion.date_of_creation FROM promotion
                INNER JOIN product ON
                product.productid = promotion.fk_productid
                `
                conn.query(sql, function (err,result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err,null);
                    } 
                    else{
                        console.log(result);
                        callback(null, result);
                    }
                    
                });

            }

        });

    },

    deletePromotion:function(promotionid,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql=`
                DELETE FROM promotion WHERE promotionid=?;
                `
                conn.query(sql, [promotionid], function (err,result) {
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

    editPromotion:function(promotionid,productid,startdate,enddate,discount,callback){
        var dbConn=db.getConnection();
        dbConn.connect(function(err){
            if(err){//database connection got issue!
                console.log(err);
                return callback(err,null);
            }

            else{
                const sql="SELECT price FROM product WHERE productid=?;"
                const sql2="UPDATE promotion SET fk_productid=?, start=?, end=?, discount=?, discounted_price=? WHERE promotionid=?;";
                dbConn.query(sql,[productid],(error,results)=>{
                    //dbConn.end();
                    if(error){
                       return callback(error,null);
                    };
                    //console.log(results);
                    //return callback(null);
                    console.log(results[0])
                    price=results[0].price*((100-discount)/100);
                    console.log('here')
                    dbConn.query(sql2,[productid,startdate,enddate,discount,price,promotionid],(error,results)=>{
                        dbConn.end();
                        if(error){
                            console.log('here2')
                            console.log(error)
                            return callback(error,null);
                         };
                         console.log('her3')
                         console.log(results);
                         return callback(null,results);
                    })
                })
            }
        })
    },
}

module.exports = Promotion;