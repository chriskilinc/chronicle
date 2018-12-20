const port = process.env.PORT || 3001; //  Configures the application PORT to either the current enviorments port OR if enviorment port is not set, port '3000'
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const indexRoute = require("./routes/indexRoute");
const apiRoute = require("./routes/apiRoute");
const logRoute = require("./routes/logRoute");

//  Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyparser.json());

//  Index Route
app.use("/", indexRoute);

//  Api Route
app.use("/api", apiRoute);

//  Log Route
app.use("/api/log", logRoute);

app.listen(port, () => console.log(`Listening on port ${port}....`));
