const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
require("dotenv").config();

var filename = "";
fs.readdir(__dirname, (err, files) => {
    files.forEach((file) => {
        if (file.split(".")[1] == "csv") {
            filename = file;
        }
    });
});

app.use("/data.csv", function (req, res) {
    if (filename != "") {
        res.sendFile(path.join(__dirname + "/" + filename));
    } else {
        res.send("Es wurde keine .csv Datei auf dem Server gefunden.");
    }
});

app.use("/style.css", function (req, res) {
    res.sendFile(path.join(__dirname + "/style.css"));
});

app.use("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname + "/favicon.ico"));
});

app.use("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.debug("Server listening on port " + port);
