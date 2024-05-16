const Recipe = require("../models/recipeModel");

exports.getRecipes = (req, res, next) => {
  Recipe.findAll()
    .then((result) =>
      res.status(200).json({
        data: {
          recipes: result,
        },
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "failed",
        message: err,
      })
    );
};

exports.getSingleRecipe = (req, res, next) => {
  const id = req.params.id;
  Recipe.findByPk(id)
    .then((recipe) =>
      res.status(200).json({
        status: "success",
        recipe,
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "failed",
        message: err,
      })
    );
};

exports.postNewRecipe = (req, res, next) => {
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  Recipe.create({
    description,
    imageUrl,
  })
    .then((result) =>
      res.status(201).json({
        status: "success",
        data: {
          recipe: result,
        },
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "failed",
        message: err,
      })
    );
};

exports.editRecipe = (req, res, next) => {
  const recipeId = req.params.id;
  const { description, imageUrl } = req.body;

  Recipe.findByPk(recipeId)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          status: "failed",
          message: "Recipe not found",
        });
      }

      recipe.description = description;
      recipe.imageUrl = imageUrl;

      return recipe.save();
    })
    .then((updatedRecipe) => {
      res.status(200).json({
        status: "success",
        data: {
          recipe: updatedRecipe,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: "failed",
        message: "Failed to update recipe",
        error: err.message,
      });
    });
};

exports.deleteRecipe = (req, res, next) => {
  const recipedId = req.params.id;
  Recipe.findByPk(recipedId)
    .then((recipe) => {
      if (!recipe) {
        res.status(404).json({
          status: "failed",
          message: "Recipe not found",
        });
      }
      recipe.destroy();
    })
    .then((result) =>
      res.status(204).json({
        status: "Success",
        message: "Recipe deleted successfully",
      })
    )
    .catch((err) =>
      res.status(500).json({
        status: "failed",
        message: "Failed to delete the recipe",
        error: err.message,
      })
    );
};
