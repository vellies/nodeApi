const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
var Database = require("./database/database");

dotEnv.config();
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
Database.CreateConnectionPool(process.env.DATABASE_HOST,process.env.DATABASE_PORT,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD);;
Database.CreateDatabase(process.env.DATABASE_NAME);
Database.InitializeDatabase(process.env.DATABASE_NAME);


app.use('/api/v1/business',require('./routes/businessRoutes'));
app.get('/',(req,res,next) =>{
    res.send('Hello from the RG server')
 });
 
const PORT = process.env.PORT || 3003;
app.listen(PORT,() => {
   console.log('server listening on port '+PORT);
});;

const vellies="123";
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        
      status: 500,
      message: err.message,
      body: {}
    });
  })