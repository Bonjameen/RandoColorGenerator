class VariationsView extends View {
  #tintPanelEl;
  #shadePanelEl;
  #tintEls;
  #shadeEls;
  #data;

  render(data, render = true) {
    this.#data = data;
    if (this.#tintPanelEl && this.#shadePanelEl) {
      this.#tintEls.forEach((el) =>
        el.children.forEach(this.#populateVariationBox)
      );
      this.#shadeEls.forEach((el) =>
        el.children.forEach(this.#populateVariationBox)
      );
    }
    const markup = this.#generateMarkup();
    document.body.insertAdjacentHTML(`beforeend`, markup);
    this.#tintPanelEl = document.querySelector(`.tints`);
    this.#shadePanelEl = document.querySelector(`.shades`);
    this.#tintEls = document.querySelectorAll(`.tint`);
    this.#shadeEls = document.querySelectorAll(`.shade`);
  }

  setTextColours(data) {}

  #populateVariationBox(el) {
    const index = el.dataset.index;
    el.style.backgroundColor = this.#data[`${el.classList[0]}s`][index].hex;
    el.children.forEach(this.#populateText);
  }

  #populateText(el, i) {
    el.textContent =
      this.#data[`${el.classList[0]}s`][el.parent.dataset.index][
        i ? `hex` : `rgb`
      ];
  }

  #generateMarkup() {
    return `${this.#generateVariationsMarkup(
      `tint`
    )}${this.#generateVariationsMarkup(`shade`)}`;
  }

  #generateVariationsMarkup(type) {
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
              .map(
                (colour) => `
                <div class="shade-container">
                    <div class="${type}" data-index="${i}" style="background-color: rgb(${colour[0].map(
                  Math.trunc
                )})">
                        <span class="rgb-text">${colour[0]})
                        </span>
                        <span class="hex-text">${colourous.convertRGBToHex(
                          colour[0]
                        )}
                    </div>
                </div>`
              )
              .join(``)}
        </div>`;
  }
}

export default new VariationView();
