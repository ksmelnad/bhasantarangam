const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "../" });

const mgClient = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = mgClient;
