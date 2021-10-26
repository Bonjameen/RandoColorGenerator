import colourBoxView from "./colourBoxView";

`use strict`;

class VariationsView extends View {
  #generateMarkup() {
    const type = this.#data.type;
    const colour = this.#data.colour;
    return `
        <div class="${type}s">
            <div class="btn btn--${type}s" data-type="${type}">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                <span class="${type}s-text">
                ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
            </div>
            ${this.#data[`${type}s`]
              .map((colour) => colourBoxView.render({ colour, type }, false))
              .join(``)}
        </div>`;
  }
}

export default new VariationView();
