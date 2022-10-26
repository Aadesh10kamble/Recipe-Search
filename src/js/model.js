import { async } from "regenerator-runtime";
import { API_URL, TIMEOUT_SEC, API_KEY } from "./config.js";
import { timeout, ingredientObject } from './helpers.js';

const bookMarkedRecipe = [];
const getRecipeData = async function (id) {

  try {
    const response = await Promise.race([timeout(TIMEOUT_SEC), fetch(API_URL.concat(`/${id}`))]);
    const data = await response.json();
    if (data.status === "fail") throw new Error(data.message.concat(" Recipe cannot be found"));
    return data.data.recipe;
  } catch (error) {
    throw error;
  }
};


const getSearchResult = async function (dish) {

  try {
    const response = await Promise.race([timeout(TIMEOUT_SEC), fetch(API_URL.concat(`?search=${dish}`))]);
    const data = await response.json();
    const { recipes } = data.data;
    if (!recipes.length) throw new Error(" No recipe for the dish found");
    return recipes;
  } catch (error) {
    throw (error);
  }
};

const postRecipeData = async function (data) {

  try {
    const ingredientCombine = data.ingredientData.map(el => el[1]).map(el => el.split(","));
    const ingredientSeperated = ingredientCombine.filter(el => el.length !== 1);

    if (ingredientSeperated.length !== 3) throw new Error("WRONG FORMAT");
    const ingredients = ingredientSeperated.map(el => ingredientObject(...el));

    const recipe = Object.fromEntries(data.recipeData);
    recipe.ingredients = ingredients;
    recipe.servings = +recipe.servings;
    recipe.cooking_time = +recipe.cooking_time;

    const response = await fetch(API_URL.concat(`?key=${API_KEY}`), {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(recipe),
    });

    const jsonFile = await response.json();
    if (jsonFile.status == "fail") throw new Error(`${jsonFile.message}`);
    console.log (jsonFile.data);
    return jsonFile.data.recipe;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getRecipeData, getSearchResult, bookMarkedRecipe, postRecipeData };

