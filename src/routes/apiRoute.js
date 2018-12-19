const router = require("express").Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify("You're at /api/"));
});

module.exports = router;
