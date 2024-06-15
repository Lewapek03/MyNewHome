require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "20mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "projekt-js-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    sameSite: "strict",
  })
);

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to main api page." });
});

const { verifyToken } = require("./app/middleware/authJwt");

require("./app/routes/auth.routes")(app);

app.use(verifyToken);

require("./app/routes/user.routes")(app);
require("./app/routes/ads.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
