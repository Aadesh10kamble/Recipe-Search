import icon from 'url:../../img/icons.svg';

class PaginationView {
    _parentElement = document.querySelector(".pagination");

    renderPagination(info) {
        let html;
        if (info.currentPage === 0) {
            console.log("FIRST PAGE");
            html = `
                    <button class="btn--inline pagination__btn--next">
                    <span>Page ${info.currentPage + 2}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-right"></use>
                    </svg>
                    </button>`;
        }
        else if (info.currentPage === info.totalPage - 1) {
            console.log("LAST PAGE");
            html = `
                    <button class="btn--inline pagination__btn--prev">
                    <span>Page ${info.currentPage}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-left"></use>
                    </svg>
                    </button>`;
        }
        else {
            html = `
                    <button class="btn--inline pagination__btn--prev">
                    <span>Page ${info.currentPage}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-left"></use>
                    </svg>
                    </button>
                    
                    <button class="btn--inline pagination__btn--next">
                    <span>Page ${info.currentPage + 2}</span>
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-right"></use>
                    </svg>
                    </button>`;
        }
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }

    clearPagination() {
        this._parentElement.innerHTML = "";
    }

    nextPage(callBack) {
        this._parentElement.addEventListener("click", function (event) {
            const nextPageNumber = +(event.target.closest("button")?.querySelector("span").textContent.split(" ").at(-1));
            if (nextPageNumber) callBack(nextPageNumber - 1);
        })
    }
};

export default new PaginationView();