
var expressSanitizer = require("express-sanitizer"),
	methodOverride 	 = require("method-override"),
	bodyParser       = require("body-parser"),
	express          = require("express"),
	mongoose         = require("mongoose"),
	app              = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/pets");


var petSchema = new mongoose.Schema({
	age:String,
	breed:String,
	name: String,
	location: String,
	image:String
});

var Pet = mongoose.model("Pet", petSchema);

app.get("/", function(req, res){
	res.redirect("/pets");
});


app.get("/pets", function(req, res){
	Pet.find({}, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.render("index", {data:response});
		}
	});
});

app.get("/pets/new", function(req, res){
	res.render("new");
});

app.post("/pets", function(req, res){
	Pet.create(req.body.pet, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.redirect("/pets");
		}
	});
});

app.get("/pets/:id", function(req, res){
	Pet.findById(req.params.id, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.render("show", {data:response});
		}
	});
});

app.get("/pets/:id/edit", function(req, res){

	Pet.findById(req.params.id, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.render("edit", {data:response});
		}
	});
});


app.put("/pets/:id", function(req, res){
	Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.redirect("/pets");
		}
	});
});


app.delete("/pets/:id", function(req, res){
	Pet.findByIdAndRemove(req.params.id, function(error, response){
		if(error){
			console.log(error);
		}else{
			res.redirect("/pets");
		}
	});
});



app.get("*", function(req, res){
	res.send("Wrong page pup");
});

app.listen(2000, function(){
	console.log("THE FBI IS ON OUR TALES");
});