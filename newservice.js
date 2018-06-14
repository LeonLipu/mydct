var express = require('express');
var app = express();
var fs = require("fs");
var https=require("https")


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDb.db');


app.use(express.static(__dirname));





app.get('/odia/:id', function(req, res) {
    var value = [];

    console.log("Brahmananda kar ");
    db.all("select * from dictionary where English='" + req.params.id + "'", function(err, rows) {
        rows.forEach(function(row) {

                  db.all("select * from tbl_details where eng='" + req.params.id + "'", function(err, records) {

                                            records.forEach(record=>{




                                                 console.log(record);


                                            });

                                    var unit={Odia:row,details:records};
                                    res.header("Access-Control-Allow-Origin", "*");

                                    res.end(JSON.stringify(unit));

                  } );


          console.log(row);
      // if (row.Odia.length != 0) {
      //           var unit = {};
      //           unit.eng = row.English;
      //           unit.ori = row.Odia;
      //           unit.hin=row.Hindi;
      //           value.push(unit);
      //    }

        });


    }); // end of db call

}); // end of get request call
















var server = https.createServer({}, app);


var server=app.listen(8081, function() {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
