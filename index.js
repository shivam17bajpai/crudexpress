var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var app=express();
var mongoose=require('mongoose');
var Movie=require('./schema');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port=process.env.Port ||7000;
var router=express.Router();
mongoose.connect('mongodb://localhost/movie');


app.use(function(req,res,next){
	console.log('Use It');
	next();

});

app.post('/insert', function(req, res) {

 var mov = new Movie();  
    mov.movieName = req.body.movieName;  
    mov.rating = req.body.rating;  
    
    mov.save(function (err,data) {  
        if (err) {  
            res.send(err);  
        }  
        res.json(data)  
    })  
});  


app.get('/find', function(req, res, next) {
  Movie.find(function(err,movieResult){
  	if(err){
  		res.send("Error Retrieving Movies");
  	} else{
  		console.log(movieResult);
  		res.json(movieResult);
  	}
  });
  });


app.put('/update/:movieName',function (req, res) {  

 let movieName = req.params.movieName;
//console.log(req.body.name);

  Movie.update({movieName:req.params.movieName},
    {$set:{movieName:req.body.movieName}},{new:true}, 
    function(err, doc){

  if(err)
    return res.send(err);
  res.json(doc);
 });
});




app.delete('/delete/:_id', function(req, res) {

  Movie.findOneAndRemove({
   _id:req.params._id}, (err, mov)=>{
    if(err)
      res.send("error")
    else
      res.send("Deleted Successfully")
  });

});

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);

module.exports = app;