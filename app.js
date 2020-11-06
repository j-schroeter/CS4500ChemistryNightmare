const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home", {
        title: "Home"
    });
});

app.get("/game/:id", function(req, res) {
    res.render("game", {
        title: "Game",
        id: req.params.id
    });
});

server.listen(app.get("port"), function() {
    console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
});

io.on("connection", function(socket) {
    console.log("User %s connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User %s disconnected", socket.id);
    });
});