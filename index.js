// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res, next) => {
  let date = req.params.date ? new Date(req.params.date) : new Date();
  const otherDate = new Date(parseInt(req.params.date));

  if (date == "Invalid Date" && otherDate == "Invalid Date") {
    return next({ message: "Invalid Date" });
  } else {
    res.json({
      unix:
        date.getTime() === "Invalid Date" || !date.getTime()
          ? Number(req.params.date)
          : Number(date.getTime()),
      utc:
        date.toUTCString() !== "Invalid Date"
          ? date.toUTCString()
          : otherDate.toUTCString(),
    });
  }
});

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
