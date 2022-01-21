//class:1B04
//admin no:p2123136
//name:Vernell Lim Xi

var app = require('./controller/app.js');

var port=8081

var server = app.listen(port, function () {

    console.log('Web App Hosted at http://localhost:%s',port);

});
