const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const { sequelize } = require("./models/index.js");
const routes = require("./routes/index.js");

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 8081);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "seed",
  })
);

sequelize
  .sync({ force: false })
  // 초기화
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", routes);

app.listen(app.get("port"), () => {
  console.log("Express Server Open");
});
