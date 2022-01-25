//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"S9805100g!",
            database:"assignment2"

        }

        );

        return conn;

    }
}
module.exports=dbConnect;