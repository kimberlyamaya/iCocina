const express = require("express");
const path = require("path");
const routes = require("./controllers");
const expressHbs = require("express-handlebars");
const something = require("hbs");

// import sequelize connection
const sequelize = require("./config/connection");

// this is where you put helpers
const hbs = expressHbs.create({
  helpers: {
    breaklines(text) {
      const newText = text.replace(/(\r\n|\n|\r)/gm, "<br>");
      return newText;
    },
  },
});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware instructing server make all files in public dir readily available
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
