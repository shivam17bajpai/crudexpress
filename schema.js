let mongoose =require("mongoose");
let Schema =mongoose.Schema;
let movieSchema=new Schema({
	movieName:String,
	rating:String

});
module.exports=mongoose.model("Movie",movieSchema);