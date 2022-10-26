import icon from 'url:../../img/icons.svg';
import {View} from './View.js'
import chunk from 'lodash-es/chunk.js';

class ResultView extends View {
  pageNumber = 0;
  _parentElement = document.querySelector(".results");
  #data;

  renderResult() {
    const html = this.#data[this.pageNumber].map((ele) => `<li class="preview">
                                                  <a class="preview__link preview__link--active" href="#${ele.id}">
                                                    <figure class="preview__fig">
                                                      <img src=${ele.image_url} alt="Test" />
                                                    </figure>
                                                    <div class="preview__data">
                                                        <h4 class="preview__title">${ele.title}</h4>
                                                        <p class="preview__publisher">${ele.publisher}</p>
                                                    </div>
                                                  </a>
                                                </li>`).join("\n");
    
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  render(data) {
    this.#data = chunk(data, 10);
    this.renderResult();
  }

  get pageInfo() {
    return {
      totalPage: this.#data.length,
      currentPage: this.pageNumber
    }
  }

};

export default new ResultView();


{/* <div class="preview__user-generated">
                                                          <svg>
                                                            <use href="${icon}.svg#icon-user"></use>
                                                          </svg>
                                                        </div> */}