const router = require('express').Router();
const R = require('Ramda');
const pjson = require('../../package');

let state = [];

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state));
});

router.post('/', (req, res) => {
  const dateFull = new Date(Date.now());
  console.log(`POST api/log : ${dateFull.toISOString()}`);
  res.setHeader('Content-Type', 'application/json');

  if (R.isEmpty(req.body)) {
    res.status(400).send(JSON.stringify({ error: 'Bad Request (400)' }));
  } else {
    //  Save to Database
    let log = req.body;
    log.meta = {
      created: dateFull,
      logger: `${pjson.name} v${pjson.version}`
    };

    state.push(log);

    //  Debugging
    res.send(JSON.stringify(log));
  }
});

module.exports = router;
