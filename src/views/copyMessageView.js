`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class CopyMessageView extends View {
  _parentEl;

  close(timeoutFunc = null) {
    this._parentEl = document.querySelector(`.copy-message-container`);
    const message = this._parentEl.querySelector(`.copy-message`);
    if (timeoutFunc) clearTimeout(timeoutFunc);
    message.classList.toggle(`copy-message--active`);
    message.classList.toggle(`hidden`);
  }

  _generateMarkup() {
    const colour = this._data.colour;
    const code = this._data.code;
    const active = this._data.active;
    this._parentEl = document.querySelector(`.copy-message-container`);

    const markup = `
        <div 
          class="
          copy-message 
          ${code ? `copy-message--active` : `hidden`}" 
          style="
          background-color: ${colour.lowerContrastColour.rgb}; 
          color: ${colour.lowerContrastColour.contrastColour};
          border-top-color: ${colour.lowerContrastColour.contrastColour}">
            <svg>
                <use href="${icons}#icon-double-check"></use>
            </svg>
            <p>${code} copied to clipboard</p>
            <p class="close">close</p>
        </div>`;
    return markup;
  }
}

export default new CopyMessageView();
