`use strict`;

import icons from "url:../img/icons.svg";

export default class View {
  _data;

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

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this._parentEl.querySelectorAll(`*`));

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

  _clear() {
    this._parentEl.innerHTML = ``;
  }

  _handleColourTextClick(textEl, e) {
    e.stopPropagation();
    navigator.clipboard.writeText(textEl.innerText);
    console.log(`${textEl.innerText} copied to clipboard`);
    this._renderMessage(`${textEl.innerText} copied to clipboard`);
  }

  _renderMessage(message = this._message) {
    const container = document.querySelector(`.copy`);
    const markup = `
        <div class="copy-message">
            <div>
                <svg>
                <use href="${icons}#icon-double-check"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
    container.insertAdjacentHTML(`beforeend`, markup);
  }
}
