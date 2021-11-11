`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class ButtonView extends View {
  _parentEl;

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
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
                    style="color: ${colour.higherContrastColour};">
                    ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
                <svg class="arrow arrow__${type}s" viewBox="0 0 32 32" style="color: 
                    ${colour.higherContrastColour}">
                <use href="${icons}#icon-arrow-${arrowDir}"></use>
            </svg>
            </div>`;
    return markup;
  }

  /**
   * Handles minor technical aspects of button animation to improve usability
   * @param {"tint"|"shade"} type The type of panel that has been clicked
   * @param {Object} colour The colour object that the button will overlay if on a mobile device
   * @author Ben Pinner
   */
  slideBtnIn(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);

    // After a second, delete the content of textEl
    // and if on mobile device, change the colour of
    // the button to contrast better with the panel
    setTimeout(() => {
      textEl.textContent = "";
      window.screen.width <= 768
        ? (btn.style.color =
            colour.higherContrastColour ?? colour.contrastColour)
        : ``;
    }, 1000);
  }

  /**
   * Handles minor technical aspects of button animation to improve usability
   * @param {"tint"|"shade"} type The type of panel that has been clicked
   * @param {Object} colour The colour object that the button will overlay
   * @author Ben Pinner
   */
  slideBtnOut(type, colour) {
    const textEl = document.querySelector(`.${type}s-text`);
    const btn = document.querySelector(`.arrow__${type}s`);

    // Restore textEl content, and reset button colour
    textEl.textContent = `${(type[0].toUpperCase(), type.slice(1))}s`;
    btn.style.color = colour.higherContrastColour;
  }
}

export default new ButtonView();
