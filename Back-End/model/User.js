//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

const db = require("./databaseConfig");

const user = {
    addUser:function(username,email,password,contact,type,callback){
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");

                var sql = 'Insert into user(username, email,password,contact,type) values(?,?,?,?,?)';

                conn.query(sql, [username, email,password,contact,type], function (err,result) {
                    conn.end();
                    
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                        
                    } else {
                        console.log(result);
                        return callback(null,result.insertId);
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
        SELECT * FROM user;
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

      findByID:function(id,callback){
        var dbConn=db.getConnection();
        dbConn.connect(function(err){
            if(err){//database connection got issue!
                console.log(err);
                return callback(err,null);
            }

            else{
                const findUserByIDQuery="SELECT*FROM user WHERE userid=?;";
                dbConn.query(findUserByIDQuery,[id],(error,results)=>{
                    dbConn.end();

                    if(results.length===0){
                        console.log("return null")
                        return callback(null,null);
                        
                    }
                    
                    console.log(results)
                    return callback(null,results[0]);
                })
            }
        })
    },
    
    editUser:function(username,email,password,contact,type,id,callback){
        var dbConn=db.getConnection();
        dbConn.connect(function(err){
            if(err){//database connection got issue!
                console.log(err);
                return callback(err,null);
            }

            else{
                const editUserQuery="UPDATE user SET username=?,email=?,password=?,contact=?,type=? WHERE userid=?;";
                dbConn.query(editUserQuery,[username,email,password,contact,type,id],(error,results)=>{
                    dbConn.end();
                    if(error){
                       return callback(error,null);
                    };
                    console.log(results);
                    return callback(null);
                })
            }
        })
    },
    verify: function (username, password, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
    
          if (err) {//database connection gt issue!
    
            console.log(err);
            return callback(err, null);
          } else {
    
            const query = "SELECT * FROM user WHERE username=? and password=?";
    
            dbConn.query(query, [username, password], (error, results) => {
              if (error) {
                callback(error, null);
                return;
              }
              if (results.length === 0) {
                return callback(null, null);
    
              } else {
                const user = results[0];
                return callback(null, user);
              }
            });
          }
        });
      }
    

};

module.exports = user;