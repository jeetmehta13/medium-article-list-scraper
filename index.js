const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const response = require("./utils/response");

const app = express();
const server = require("http").Server(app);
var routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(response);

app.use("/", routes);

const port = process.env.PORT || 3001;
//Hello Jeet
server.listen(port, err => {
    console.log(err || "Listening on port " + port);
});

process
    .on("exit", code => {
        process.exit(code);
    })
    .on("SIGINT", () => {
        process.exit(0);
    });