`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class CopyMessageView extends View {
  _parentEl;

  _generateMarkup() {
    const colour = this._data.colour;
    const code = this._data.code;
    this._parentEl = document.querySelector(`.copy-message-container`);

    const markup = `
        <div 
          class="
          copy-message 
          ${code ? `` : `hidden`}" 
          style="
          background-color: ${colour.lowerContrastColour.rgb}; 
          color: ${colour.lowerContrastColour.contrastColour}">
            <svg>
                <use href="${icons}#icon-double-check"></use>
            </svg>
            <p>${code} copied to clipboard</p>
        </div>`;
    return markup;
  }

  slideBtnIn(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);
    setTimeout(() => {
      textEl.textContent = "";
      window.screen.width <= 768
        ? (btn.style.color = colour.higherContrastColour)
        : ``;
    }, 1000);
  }

  slideBtnOut(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);
    textEl.textContent = `${(type[0].toUpperCase(), type.slice(1))}s`;
    btn.style.color = colour.higherContrastColour;
  }
}

export default new CopyMessageView();
