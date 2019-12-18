const constatnts = require('../constants');
var Database = require("../database/database");
module.exports.UserSignIn =  async ({emailid,password},callback) => {
    try {
    
        await Database.connectionPool.getConnection(async function(err, connection){ 
             connection.changeUser({
                 database : Database.databaseName
             }, function(err) {
                 if (err) {
                     console.log("Database is not selected");
                     callback(new Error(err),null,null);
                 }else { 
                     
                     var sqlQuery = "SELECT * FROM business WHERE emailid='"+emailid+"'";
                    
                     connection.query(sqlQuery, async function (err, result, fields) {
                         if (err){
                             console.log("Query  is not executed");
                             callback(new Error(err),null,null);
                         }else {
                             if(result.length==0) { 
                                callback(null,{},1);
                             }else { 
                                     
                                     Object.keys(result).forEach(async function(key) {
                                         var dbPassword = result[key].password;
                                         var flag=result[key].flag;   
                                         if(dbPassword==password){   
                                             if(flag==0)  
                                             {
                                                 var arraybusinessUserprofile = [];
                                                 Object.keys(result).forEach(async function(key) {
                                                 var row = result[key];  
                                                 arraybusinessUserprofile.push(row); 
                                                 });
                                                 var json_arr = {};
                                                 json_arr["businessUserProfile"] = arraybusinessUserprofile;
                                                 callback(null, json_arr,2);
                                             }
                                             else
                                             {
                                                 callback(null,{},4);
                                             }
                                         
                                         }else{
                                                 callback(null,{},3);
                                         }
                                               
                                     });
                                 }
                             }
                         });
                 } 
             });
             connection.release();
         });               
 }catch(error){
     console.log('Something went wrong: Service: UserSignIn',error);
     callback(new Error(error),null,null);
 }

}
