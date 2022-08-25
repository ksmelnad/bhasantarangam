const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
const path = require('path');
const { MongoClient, ServerApiVersion } = require("mongodb")
const ObjectId = require('mongodb').ObjectId
require("dotenv").config()

const mgClient = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

mgClient.connect(function (err){
  console.log("MongoDB started!");
})

router.get("/padas", function (req, res) {
  let db_connect = mgClient.db();
  db_connect
    .collection("padas")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
});

router.get("/words", function (req, res) {
  let db_connect = mgClient.db();
  db_connect
    .collection("words")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
}); 

// Add word
router.post("/create", function (req, res) {
  let db_connect = mgClient.db();
  db_connect
  .collection('words')
  .insertOne({
    id: req.body.id,
    title: req.body.title,
    artha: req.body.artha,
    vyutpatti: req.body.vyutpatti,
    nighantu: req.body.nighantu,
    eng: req.body.eng,
    date: Date()
  }, function(err, res){
    if (err) throw err;
    console.log("1 document added!")
  })
})

// Delete word
router.delete("/words/:id", (req, res)=>{
  let db_connect = mgClient.db();
  let myquery = {_id: ObjectId(req.params.id)}
  db_connect
  .collection('words')
  .deleteOne(myquery, (err, res)=>{
    if (err) throw err;
    console.log("1 document deleted!")
  })
})

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
})

app.use(express.json())
app.use(express.static(path.join(__dirname, "./client", "build")));
app.use(cors()) 
app.use(router)


app.listen(process.env.PORT || 5000, (req, res)=>{
  console.log("Server is running at 5000")
})