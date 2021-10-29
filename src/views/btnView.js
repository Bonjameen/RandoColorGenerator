`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class ColourBoxView extends View {
  _parentEl;

  _generateMarkup() {
    const colour = this._data.colour;
    const type = this._data.type;
    const active = this._data.active;
    this._parentEl = document.querySelector(`.btn--${type}s__container`);

    let arrowDir;
    if (active) arrowDir = type === `tint` ? `left` : `right`;
    else arrowDir = type === `tint` ? `right` : `left`;

    const btnClassString = `btn btn--${type}s ${
      active ? `btn--${type}s__active` : ``
    }`;
    const markup = `
            <div class="${btnClassString}" data-type="${type}">
                <span class="${type}s-text ${active ? `hidden` : ``}" 
                    style="color: ${colour.contrastColour}">
                    ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
                <svg class="arrow arrow__${type}s" viewBox="0 0 32 32" style="color: 
                    ${colour.contrastColour}">
                <use href="${icons}#icon-arrow-${arrowDir}"></use>
            </svg>
            </div>`;
    return markup;
  }

  async hideBtn(el) {
    setTimeout(() => {
      el.style.display = "none";
    }, 1000);
  }

  async displayBtn(el) {
    el.style.display = "block";
  }
}

export default new ColourBoxView();
