var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');


var db = require.main.require ('./models/db_controller');




var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/assets/images/upload_images"); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case. 
  //i specified the original file name .you can modify this name to anything you want
    }
  });

  var upload = multer({ storage: storage });


router.get('/',function(req,res){

    db.getAllDoc(function(err,result){
        if(err)
        throw err;
        res.render('view_doctor.ejs',{list : result})
    });
    
});

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


  









//  router.get('/search',function(req,res){
//      res.rende
//      var key = req.body.search;
//      console.log(key);
//     db.searchDoc(key,function(err, rows, fields) {
//         if (err) throw err;
//       var data=[];
//       for(i=0;i<rows.length;i++)
//         {
//           data.push(rows[i].first_name);
//         }
//         res.end(JSON.stringify(data));
//       });
//     });


    router.get('/',function(req,res){

        db.getAllDoc(function(err,result){
            if(err)
            throw err;
            res.render('doctors.ejs',{list : result})
        });
        
    });


    router.post('/search',function(req,res){
        var key = req.body.search;
        db.searchDoc(key,function(err,result){
            console.log(result);
            
            res.render('doctors.ejs',{list : result});
        });
    });

module.exports = router;