

var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sano',
  password: 'giongid1',
  port: 5432,
})
/* GET home page. */


router.get('/', function(req, res, next) {});

// get data from postgre
router.get('/getdata', function(req, res, next) {
  //getdata
  return pool.query("select * from product",(error,response)=>{
    if(error){
      console.log(error)
    }else{
   
      res.send(response.rows)

    } 
    pool.end();
  })
  
});

router.get('/add', function(req, res, next) {
  res.render('add',{})
});

router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name,
   product_price = req.body.product_price,
   img = req.body.img

  return pool.query("insert into product (product_name,product_price,img) values ($1,$2,$3)",
  [product_name,product_price,img],(err,response)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send("Da them du lieu: "+product_name+product_price+img);
    }
    pool.end();
  })
 
});



module.exports = router;
