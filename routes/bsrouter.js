const express = require("express");
const router = express.Router();
const mgClient = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

router.get("/padas", function (req, res) {
  let db_connect = mgClient.db();
  db_connect
    .collection("padas")
    .find({}).sort( { id_eng: -1 } )
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// Add word
router.post("/create", function (req, res) {
  let db_connect = mgClient.db();
  db_connect.collection("padas").insertOne(
    {
      id: req.body.id,
      id_eng: req.body.id_eng,
      title: req.body.title,
      title_trans: req.body.title_trans,
      san: req.body.san,
      ex: req.body.ex,
      eng: req.body.eng,
      kan: req.body.kan,
      hin: req.body.hin,
      mar: req.body.mar,
      date: Date(),
    },
    function (err, res) {
      if (err) throw err;
      console.log("1 document added!");
    }
  );
});

// Delete word
router.delete("/padas/:id", (req, res) => {
  let db_connect = mgClient.db();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("padas").deleteOne(myquery, (err, res) => {
    if (err) throw err;
    console.log("1 document deleted!");
  });
});

module.exports = router;
