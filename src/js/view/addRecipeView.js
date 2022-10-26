import icon from 'url:../../img/icons.svg';
import {View} from './View.js';

class AddRecipeView extends View {
    #popupOpen = document.querySelector(".nav__btn--add-recipe");
    #popupClose = document.querySelector(".btn--close-modal");
    #formSubmit = document.querySelector (".upload__btn");
    #windowElement = document.querySelector(".add-recipe-window");
    _parentElement = document.querySelector(".form");
    #recipeForm = document.querySelector(".upload--info");
    #ingredientsForm = document.querySelector(".upload--ingredients");
    #successMessage = `<div class="message">
                                <div>
                                    <svg>
                                        <use href="${icon}#icon-smile"></use>
                                    </svg>
                                </div>
                                <p>
                                Recipe Successfully added :)
                                </p>
                            </div>`;

    #OpenClose() {
        document.querySelector(".overlay").classList.toggle("hidden");
        this.#windowElement.classList.toggle("hidden");
    }

    #submitRecipe(callBack) {
        this.#formSubmit.addEventListener("click", (event) => {
            event.preventDefault();

            const data = {
                recipeData: [...new FormData(this.#recipeForm)],
                ingredientData: [...new FormData(this.#ingredientsForm)]
            }
            console.log (data.recipeData);
            callBack(data);
        })     
    }

    popupClose() {
        this.#popupClose.addEventListener("click", (event) => {
            event.preventDefault();
            this.#OpenClose();
        })

    }

    popupOpen(callBack) {
        this.#popupOpen.addEventListener('click', (event) => {
            event.preventDefault();
            this.#submitRecipe(callBack);
            this.#OpenClose();
        });
        this.popupClose();   
    }

    successMessage () {
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", this.#successMessage);
    }   
};

export default new AddRecipeView();