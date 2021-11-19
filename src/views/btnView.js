`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class ButtonView extends View {
  _parentEl;
  _arrowDirs = {
    tint: [`right`, `left`],
    shade: [`left`, `right`],
    like: [`down`, `up`],
  };

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
  _generateMarkup() {
    const colour = this._data.colour;
    const type = this._data.type;
    const active = this._data.active;
    const hide = this._data.hide;
    this._parentEl = document
      .querySelector(`.btn--${type}s`)
      ?.closest(`.btn__container`);

    const arrowIconId = this._generateButtonIconId(type, active);

    const btnClassString = `btn btn--${type}s ${active ? `btn--active` : ``} ${
      hide ? `hidden` : ``
    }`;

    const markup = `
            <div class="${btnClassString}" data-type="${type}">
                <span class="btn__text ${active ? `hidden` : ``}" 
                    style="color: ${colour.higherContrastColour}">
                    ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
                <svg class="btn__icon" viewBox="0 0 32 32" 
                style="color: ${colour.higherContrastColour};
                    fill: ${colour.higherContrastColour}">
                <use href="${icons}#${arrowIconId}"></use>
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
    this._parentEl = document
      .querySelector(`.btn--${type}s`)
      ?.closest(`.btn__container`);
    const textEl = this._parentEl.querySelector(`.btn__text`);
    const btn = this._parentEl.querySelector(`.btn__icon`);

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
   * @param {"tint"|"shade"|"like"} type The type of panel that has been clicked
   * @param {Object} colour The colour object that the button will overlay
   * @author Ben Pinner
   */
  slideBtnOut(type, colour) {
    this._parentEl = document
      .querySelector(`.btn--${type}s`)
      ?.closest(`.btn__container`);
    const textEl = this._parentEl.querySelector(`.btn__text`);
    const btn = this._parentEl.querySelector(`.btn__icon`);

    // Restore textEl content, and reset button colour
    textEl.textContent = `${type[0].toUpperCase()}${type.slice(1)}s`;
    btn.style.color = colour.higherContrastColour;
  }

  _generateButtonIconId(type, active) {
    const iconId = type === `like` ? `icon-caret-` : `icon-arrow-`;
    return iconId + this._arrowDirs[type][active ? 1 : 0];
  }
}

export default new ButtonView();
