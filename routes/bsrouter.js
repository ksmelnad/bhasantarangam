const express = require("express");
const router = express.Router();
const mgClient = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

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
  db_connect.collection("words").insertOne(
    {
      id: req.body.id,
      title: req.body.title,
      artha: req.body.artha,
      vyutpatti: req.body.vyutpatti,
      nighantu: req.body.nighantu,
      eng: req.body.eng,
      date: Date(),
    },
    function (err, res) {
      if (err) throw err;
      console.log("1 document added!");
    }
  );
});

// Delete word
router.delete("/words/:id", (req, res) => {
  let db_connect = mgClient.db();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("words").deleteOne(myquery, (err, res) => {
    if (err) throw err;
    console.log("1 document deleted!");
  });
});

module.exports = router;
