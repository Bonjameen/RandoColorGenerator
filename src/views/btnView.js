`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class ButtonView extends View {
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
                    style="color: ${colour.contrastColour};">
                    ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
                <svg class="arrow arrow__${type}s" viewBox="0 0 32 32" style="color: 
                    ${colour.contrastColour}">
                <use href="${icons}#icon-arrow-${arrowDir}"></use>
            </svg>
            </div>`;
    return markup;
  }

  slideBtnIn(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);
    setTimeout(() => {
      textEl.textContent = "";
      window.screen.width <= 768
        ? (btn.style.color = colour.contrastColour)
        : ``;
    }, 1000);
  }

  slideBtnOut(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);
    textEl.textContent = `${(type[0].toUpperCase(), type.slice(1))}s`;
    btn.style.color = colour.contrastColour;
  }
}

export default new ButtonView();
