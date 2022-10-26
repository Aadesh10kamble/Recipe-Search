class SearchView {
    _parentElement = document.querySelector(".search");

    #getUserInput() {
        return this._parentElement.querySelector(".search__field").value;
    }

    searchResult(callBack) {
        this._parentElement.querySelector(".search__btn").addEventListener("click", (event) => {
            event.preventDefault();
            callBack(this.#getUserInput());
        });
    }
};

export default new SearchView();