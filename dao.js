var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});

con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL!");
});

const getRegionByProvince = (provinceId,callback) =>{
    con.query("SELECT * FROM region where province_id ="+provinceId, function (err, result) {
        if (err) throw err;
        callback(result);
      });
}