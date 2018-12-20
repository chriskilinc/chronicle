const router = require("express").Router();
const R = require("Ramda");

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ log: "log" }));
});

router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (R.isEmpty(req.body)) {
    res.status(400).send(JSON.stringify({ error: "Bad Request (400)" }));
  } else {
    res.send(JSON.stringify({ log: "log" }));
  }
});

module.exports = router;
