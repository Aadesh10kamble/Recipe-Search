import icon from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { View } from './View';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    #bookmarkElement = document.querySelector(".bookmarks__list");
    #data;
    #emptyBookmarkMessage = `<div class="message">
                                <div>
                                    <svg>
                                        <use href="${icon}#icon-smile"></use>
                                    </svg>
                                </div>
                                <p>
                                No bookmarks yet. Find a nice recipe and bookmark it :)
                                </p>
                            </div>`;


    render(data, bookmarks) {
        this.#data = data;
        const html = this.#renderMarkup(bookmarks);
        this.#execute(html);
        this.button(bookmarks);
    }

    #execute(html) {
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", html);

    }

    #renderMarkup(bookmarks) {
        const bookmarkFiller = bookmarks.find(el => el.title === this.#data.title) ? "-fill" : "";
        const recipeImageHtml = `<figure class="recipe__fig">
                                    <img src="${this.#data.image_url}" alt="Tomato" class="recipe__img" />
                                    <h1 class="recipe__title">
                                        <span>${this.#data.title}</span>
                                    </h1>
                                    </figure>`;
        const recipeTimeHtml = `<div class="recipe__info">
                                    <svg class="recipe__info-icon">
                                    <use href="${icon}#icon-clock"></use>
                                    </svg>
                                    <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cooking_time}</span>
                                    <span class="recipe__info-text">minutes</span>
                                </div>`;

        const recipeIngredientsHtml = this.#data.ingredients.map((ing) => `<li class="recipe__ingredient">
                                                                    <svg class="recipe__icon">
                                                                    <use href="${icon}#icon-check"></use>
                                                                    </svg>
                                                                    <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ""}</div>
                                                                    <div class="recipe__description">
                                                                    <span class="recipe__unit">${ing.unit}</span>
                                                                    ${ing.description}
                                                                    </div>
                                                                    </li>`).join("\n");

        const recipeServingHtml = `<div class="recipe__info">
                                        <svg class="recipe__info-icon">
                                        <use href="${icon}#icon-users"></use>
                                        </svg>
                                        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
                                        <span class="recipe__info-text">servings</span>
                                    </div>`;

        const recipeDirectionHtml = `<div class="recipe__directions">
                                        <h2 class="heading--2">How to cook it</h2>
                                        <p class="recipe__directions-text">
                                            This recipe was carefully designed and tested by
                                            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
                                            directions at their website.
                                        </p>
                                        <a
                                            class="btn--small recipe__btn"
                                            href="${this.#data.source_url}"
                                            target="_blank"
                                        >
                                            <span>Directions</span>
                                            <svg class="search__icon">
                                            <use href="${icon}#icon-arrow-right"></use>
                                            </svg>
                                        </a>
                                    </div>`;

        const userGeneratedHtml = `<div class="recipe__user-generated">
                                    ${this.#data.key ? `<svg>
                                                            <use href="${icon}#icon-user"></use>
                                                        </svg>` : "" }
                                </div>`;

        const bookmarkButtonHtml = `<button class="btn--round">
                                        <svg class="">
                                            <use href="${icon}#icon-bookmark${bookmarkFiller}"></use>
                                        </svg>
                                        </button>`;

        const ingredientListHtml = `<div class="recipe__ingredients">
                                        <h2 class="heading--2">Recipe ingredients</h2>
                                        <ul class="recipe__ingredient-list">
                                        ${recipeIngredientsHtml}
                                        </ul>
                                    </div>`;
                                    
        const html = `
                        ${recipeImageHtml}
                        <div class="recipe__details">
                                ${recipeTimeHtml}
                                ${recipeServingHtml}
                                ${userGeneratedHtml}
                                ${bookmarkButtonHtml}
                        </div>
                        ${ingredientListHtml}
                        ${recipeDirectionHtml}`;
        return html;
    }

    renderBookmark(bookmarks) {
        let html;
        if (!bookmarks.length) html = this.#emptyBookmarkMessage;
        else {
            html = bookmarks.map((ele) => `<li class="preview">
                                    <a class="preview__link preview__link--active" href="#${ele.id}">
                                    <figure class="preview__fig">
                                        <img src=${ele.image_url} alt="Test" />
                                    </figure>
                                    <div class="preview__data">
                                        <h4 class="preview__title">${ele.title}</h4>
                                        <p class="preview__publisher">${ele.publisher}</p>
                                        ${ele.key ? `<div class="preview__user-generated">
                                        <svg>
                                        <use href="${icon}.svg#icon-user"></use>
                                        </svg>
                                    </div>` : ""}
                                    </div>
                                    </a>
                                </li>`).join("\n");
        }
        this.#bookmarkElement.innerHTML = "";
        this.#bookmarkElement.insertAdjacentHTML("afterbegin", html);
    }

    button(bookmarks) {
        const bookmarkButton = this._parentElement.querySelector(".btn--round");
        bookmarkButton.addEventListener("click", (event) => {
            let href;
            const symbol = bookmarkButton.querySelector("use");
            if (symbol.getAttribute("href").includes("fill")) {
                const remove = (bookmarks.findIndex((el) => el.title === this.#data.title));
                bookmarks.splice(remove, 1);
                href = `${icon}#icon-bookmark`;
            } else {
                bookmarks.push(this.#data);
                href = `${icon}#icon-bookmark-fill`;
            }
            symbol.setAttribute("href", href);
            this.renderBookmark(bookmarks);
        })
    }

    addHandlerRender(callFunction) {
        ["hashchange", "load"].forEach((eventName) => window.addEventListener(eventName, callFunction));
    }
};

export default new RecipeView();



{/* <div class="recipe__info-buttons">
                                        <button class="btn--tiny btn--increase-servings">
                                            <svg>
                                            <use href="${icon}#icon-minus-circle"></use>
                                            </svg>
                                        </button>
                                        <button class="btn--tiny btn--increase-servings">
                                            <svg>
                                            <use href="${icon}#icon-plus-circle"></use>
                                            </svg>
                                        </button>
                                        </div> */}