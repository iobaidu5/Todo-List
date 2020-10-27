const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require ('mongoose');



const app = express();
   

  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("public"));

  mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

  const itemsSchema = {
    name: String
  };

  const Item = mongoose.model("item", itemsSchema);

  const item1 = new Item({
    name:"Welcome to Todo List"
  });

  const item2 = new Item({
    name:"Hit + to Add New"
  });


  const item3 = new Item({
    name:"<-- Hit this to delete"
  });

  const defaultItems = [item1,item2,item3];

  Item.insertMany(defaultItems, function(err){
     if (err){
       console.log(err);

     }else {
       console.log("success");
     }
  });

  app.get("/", function(req,res){ 
           
         res.render("list",{listTitle: "Today", newListItems: items});
  });

  app.post("/", function(req,res){
    let item = req.body.newItem;

    if(req.body.list === "Work"){
       workItems.push(item);
       res.redirect("/work");
    }else{
     let item = req.body.newItem;
     items.push(item);
     res.redirect("/");
    }
  });

  app.get('/work',function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
  });

  app.get("/about",function(req,res){
    res.render("about");
  });

  app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  });

  app.listen(3000, function(){
    console.log("Server is Listening on port 3000");
  });  