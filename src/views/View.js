`use strict`;

import icons from "url:../../img/icons.svg";

export default class View {
  #data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. colour, tints, shades)
   * @param {boolean} [render = true] If false create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Ben Pinner
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      console.error(`render data is empty`);

    this.#data = data;
    const markup = this.#generateMarkup();

    if (!render) return markup;

    this.#clear();
    this.#parentEl.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    this.#data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this.#parentEl.querySelectorAll(`*`));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ``
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  #clear() {
    this.#parentEl.innerHTML = ``;
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this.#parentEl.insertAdjacentHTML(`afterbegin`, markup);
  }
}
