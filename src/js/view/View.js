import icon from 'url:../../img/icons.svg';

class View {
    _parentElement;

    renderError(message) {
        const html = `<div class="error">
                          <div>
                          <svg>
                              <use href="${icon}#icon-alert-triangle"></use>
                          </svg>
                          </div>
                          <p>${message}</p>
                      </div>`;
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }
    renderSpinner() {
        const html = `<div class="spinner">
                            <svg>
                                <use href="${icon}#icon-loader"></use>
                            </svg>
                            </div>`;
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }
};

export {View};