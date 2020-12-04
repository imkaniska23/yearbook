var express         = require("express"),
    mysql           = require("mysql"),
    methodOverride  = require("method-override"),
    bodyparser      = require("body-parser");
    app             = express();

//Set view-engine to ejs
app.set("view engine","ejs");

//Use "public" folder
app.use(express.static("public"));

//Use method-override and body-parser
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//mysql connection
var con = mysql.createConnection({
  host: "localhost",
  user: "yearbook",
  password: "password",
  database: "yearbook"
});

//connect to mysql server
con.connect(function(err){
  if(err) throw err;
});

//connect to node
app.listen(3000,"localhost",function(err){
  if(err) throw err;
  else {
    console.log("Server started!");
  }
});

//home page
app.get("/",function(req,res){
  res.render("index");
})

app.post("/dept",function(req,res){
  var dept=req.body.dept;
  res.redirect("/"+dept);
})

//form page
app.get("/:dept",function(req,res){
  var dept=(req.params.dept).toUpperCase();
  if(dept=="BT")
  {
    var num=8037;
    var dept2="BT";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="CE")
  {
    var num=8052;
    var dept2="CE";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="CHE")
  {
    var num=8054;
    var dept2="CH";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="CSE")
  {
    var num=8104;
    var dept2="CS";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="IT")
  {
    var num=8089;
    var dept2="IT";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="ECE")
  {
    var num=8097;
    var dept2="EC";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="EE")
  {
    var num=8095;
    var dept2="EE";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="ME")
  {
    var num=8146;
    var dept2="ME";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else if(dept=="MME")
  {
    var num=8057;
    var dept2="MM";
    res.render("form",{dept:dept,num:num,dept2:dept2});
  }
  else res.render("unknown");
});

//form upload
app.post("/submit",function(req,res){
  var data = req.body;
  con.query("insert into "+data.department.toLowerCase()+" values (?,?,?,?,?,?,?,?,?)",[data.name,data.department,data.roll_no,data.email_id,data.phone,data.spot,data.clubs,data.wing,data.quote],function(err,result){
    if(err) res.render("error");
    else res.render("submit");
  });
});
