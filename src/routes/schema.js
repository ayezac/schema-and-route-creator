let express = require("express");
let router = express.Router();
const createSchema = require("../utils/createSchema");
const createRoute = require("../utils/createRoute");
const validateKey = require("../middleware/apikeys");

router.post("/schema", validateKey, (req, res) => {
  try {
    createSchema(req.body);
    createRoute(req.body);

    return res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || "something went wrong");
  }
});

module.exports = router;
