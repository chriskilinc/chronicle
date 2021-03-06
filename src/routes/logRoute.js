const router = require('express').Router();
const R = require('ramda');
const pjson = require('../../package');
const APIKEY = process.env.APIKEY || '00000000';

let state = [];

isValidCredentials = req => {
  if (req.body && req.body.apikey) {
    if (req.body.apikey == APIKEY) {
      //  Valid
      return true;
    } else {
      return false;
    }
  }
};

uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state));
});

router.post('/', (req, res) => {
  if (!isValidCredentials(req)) {
    res.status(500).send('Could not validate apikey on body');
  }

  const dateFull = new Date(Date.now());
  console.log(`INITIAL | POST api/log : ${dateFull.toISOString()}`);
  res.setHeader('Content-Type', 'application/json');

  if (R.isEmpty(req.body)) {
    console.log(`FAILED | POST api/log : ${dateFull.toISOString()}`);
    res.status(400).send(
      JSON.stringify({
        error: 'Bad Request (400)',
        information: {
          apikey: '',
          text: 'Example on how a log looks like',
          example: {
            logTime: '2019-01-17T20:45:44.652Z',
            system: {
              host: 'example.com',
              source: 'get/foo',
              sourceInfo: 'foo-api'
            },
            severity: 'info',
            details: {
              payload: {
                foo: 'bar'
              }
            }
          }
        }
      })
    );
  } else {
    //  Create Meta Data
    let log = req.body;
    log.id = uuidv4();
    log.meta = {
      created: dateFull,
      logger: `${pjson.name} v${pjson.version}`
    };

    //  Save to state (Dev/debug)
    if (req.body.apikey == '00000000') {
      console.log('DEV/DEBUG noticed');
      state.push(log);
    } else {
      //  Save to Database
      delete log.apikey;
    }

    console.log(`SUCCESS | POST api/log : ${dateFull.toISOString()}`);

    //  Debugging
    res.send(JSON.stringify(log));
  }
});

module.exports = router;
