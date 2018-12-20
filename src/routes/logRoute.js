const router = require('express').Router();
const R = require('ramda');

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify('/api/log'));
});

router.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  if (R.isEmpty(req.body)) {
    res.status(400).send(JSON.stringify({ error: '400 BAD REQUEST' }));
  }

  res.send(JSON.stringify(req.body));
});

module.exports = router;
