const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require("./home-routes.js");
const recipeRoutes = require("./recipe-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

router.use('/api', apiRoutes);
router.use("/", homeRoutes);
router.use("/recipe", recipeRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;