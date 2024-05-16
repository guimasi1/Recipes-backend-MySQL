require("dotenv").config();

const express = require("express");
const sequelize = require("./util/database");
const Recipe = require("./models/recipeModel");
const recipesRouter = require("./routes/recipesRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/recipes", recipesRouter);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
