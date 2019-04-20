const express = require('express');
const router = express.Router();
var sql = require('mysql');

// configure database
const dbConfig = require('../config/connectVars');

var executeQuery = function(res, query, callback){
  var connection = sql.createConnection(dbConfig, function (err) {
    if(err){
      console.log("Error while connecting to the database :- " + err);
      res.send(err);
    }
  });
  connection.connect();

  connection.query(query, function (err, results, fields) {
    if(err) {
      console.log("Error while querying database :- " + err);
      res.send(err);
    } else {
      callback(results);
    }
  });

  connection.end();
};

// Search users by emailId
router.get("/user", function(req , res){
  var query = "SELECT * FROM userData WHERE emailId LIKE '%" + req.query.email + "%'";
  executeQuery(res, query, function (result) {
    res.send(result);
  });
});

// Insert/Update user
 router.post("/user", function(req , res){
  var query = "SELECT * FROM userData WHERE emailId = '" + req.body.email + "'";

  executeQuery(res, query, function (result) {
    if(!result[0]){
      query = "INSERT INTO userData (userName, emailId, phoneNo, password, dateTime) VALUES ('" +
        req.body.username + "', '" + req.body.email + "', '" + req.body.phoneNo + "', '" + req.body.pwd + "', NOW())";

      executeQuery(res, query, function (result) {
        res.send(result);
      });
    } else{
      query = "UPDATE userData SET userName='" + req.body.username  +  "', emailId='" + req.body.email +
        "', phoneNo='" + req.body.phoneNo + "', password='" + req.body.pwd + "', dateTime=NOW() WHERE emailId='" + req.body.email + "'";

      executeQuery(res, query, function (result) {
        res.send(result);
      });
    }
  });
});

// Delete users by emailId
router.delete("/user/:email", function(req , res){
  var query = "DELETE FROM userData WHERE emailId='" + req.params.email + "'";

  executeQuery(res, query, function (result) {
    res.send(result);
  });
});

module.exports = router;
