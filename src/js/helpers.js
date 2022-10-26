import { async } from "regenerator-runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const ingredientObject = function (quantity, unit, description) {
  return {
    "quantity": quantity ? +quantity : null,
    "unit": unit,
    "description": description
  };
};

export { timeout, ingredientObject };