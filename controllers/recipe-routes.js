const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Comment, Category, Difficulty } = require("../models");
const { Op } = require("sequelize");

router.get("/", (req, res) => {
  console.log(req.session);
  console.log("getting recipes");
  Recipe.findAll({
    attributes: [
      "id",
      "title",
      "ingredient",
      "instruction",
      "calories",
      "category_id",
      "user_id",
      "difficulty_id",
      "image",
      "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "user_id",
          "recipe_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      //res.render("homepage", { recipes, loggedIn: req.session.loggedIn })
      res.render("recipe", { recipes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// getting recipe by params
router.get("/:cuisine/:difficulty", async (req, res) => {
  const category = await Category.findOne({
    where: { category_type: req.params.cuisine },
  });

  const categoryId = category.get().id;

  const difficulty = await Difficulty.findOne({
    where: { difficulty_level: req.params.difficulty },
  });

  const difficultyId = difficulty.get().id;

  Recipe.findAll({
    where: {
      category_id: categoryId,
      difficulty_id: difficultyId,
    },
    raw: true,
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({
          message:
            "No recipe found with the selected category and difficulty level",
        });
        return;
      }
      res.render("recipe", { recipes: dbRecipeData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
