import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as Model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import addrecipeView from './view/addRecipeView.js';
import icon from 'url:../img/icons.svg';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    const data = await Model.getRecipeData(id);
    recipeView.render(data, Model.bookMarkedRecipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const renderSearchResult = async function (dish) {
  try {
    resultView.renderSpinner ();
    const data = await Model.getSearchResult(dish);
    resultView.render(data);
    paginationView.renderPagination(resultView.pageInfo);
  } catch (error) {
    resultView.renderError(error.message);
    paginationView.clearPagination();
  }
};

const changePage = function (nextPage) {
  resultView.pageNumber = nextPage;
  resultView.renderResult();
  paginationView.renderPagination(resultView.pageInfo);
};

const postingRecipe = async function (data) {
  try {
    addrecipeView.renderSpinner ();
    const myRecipe = await Model.postRecipeData(data);
    addrecipeView.successMessage ();
    window.location.hash = myRecipe.id;
    Model.bookMarkedRecipe.unshift (myRecipe);
    
    recipeView.renderBookmark (Model.bookMarkedRecipe);
    recipeView.render (myRecipe,Model.bookMarkedRecipe);

    
  } catch (error) {
    addrecipeView.renderError(error.message);
  }
};

// IIFE
const init = function () {
  recipeView.addHandlerRender(renderRecipe);
  searchView.searchResult(renderSearchResult);
  paginationView.nextPage(changePage);
  addrecipeView.popupOpen(postingRecipe);
};
init();