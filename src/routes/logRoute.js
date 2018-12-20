const router = require("express").Router();
const R = require("Ramda");

let state = [];

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(state));
});

router.post("/", (req, res) => {
  console.log("POST api/log");
  res.setHeader("Content-Type", "application/json");

  if (R.isEmpty(req.body)) {
    res.status(400).send(JSON.stringify({ error: "Bad Request (400)" }));
  } else {
    //  Save to Database
    let log = req.body;
    log.systemTime = new Date(Date.now())

    state.push(log);

    //  Debugging
    res.send(JSON.stringify(req.body));
  }
});

module.exports = router;
