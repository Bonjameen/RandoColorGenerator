`use strict`;

import View from "./View";
import icons from "url:../img/icons.svg";

class ButtonView extends View {
  _parentEl;
  _arrowDirections = {
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
    this._parentEl =
      this._parentEl ??
      document.querySelector(`.btn--${type}s`)?.closest(`.btn__container`);

    const arrowId = this._generateArrowIconId(type, active);

    const btnClassString = `btn btn--${type}s ${active ? `btn--active` : ``}`;

    const markup = `
            <div class="${btnClassString}" data-type="${type}">
                <span class="btn__text ${active ? `hidden` : ``}" 
                    style="color: ${colour.higherContrastColour};">
                    ${type[0].toUpperCase()}${type.slice(1)}s
                </span>
                <svg class="btn__icon" viewBox="0 0 32 32" style="color: 
                    ${colour.higherContrastColour}">
                <use href="${icons}#${arrowId}"></use>
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
    try {
      console.log(
        this._parentEl ??
          (`not`,
          document.querySelector(`.btn--${type}s`)?.closest(`.btn__container`))
      );
      this._parentEl =
        this._parentEl ??
        document.querySelector(`.btn--${type}s`)?.closest(`.btn__container`);
      console.log(`In`, document);
      const textEl = this._parentEl.querySelector(`.btn__text`);
      const btn = this._parent.querySelector(`.btn__icon`);

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
    } catch (err) {
      console.error(`In 💥💥💥 ${err}`);
    }
  }

  /**
   * Handles minor technical aspects of button animation to improve usability
   * @param {"tint"|"shade"} type The type of panel that has been clicked
   * @param {Object} colour The colour object that the button will overlay
   * @author Ben Pinner
   */
  slideBtnOut(type, colour) {
    try {
      this._parentEl =
        this._parentEl ??
        document.querySelector(`.btn--${type}s`)?.closest(`.btn__container`);
      console.log(`Out`, document);
      const textEl = this._parentEl.querySelector(`.btn__text`);
      const btn = this._parentEl.querySelector(`.btn__icon`);
      console.log(btn);

      // Restore textEl content, and reset button colour
      textEl.textContent = `${(type[0].toUpperCase(), type.slice(1))}s`;
      btn.style.color = colour.higherContrastColour;
    } catch (err) {
      console.error(`Out 💥💥💥 ${err}`);
    }
  }

  _generateArrowIconId(type, active) {
    let arrowId =
      (type === `like` ? `icon-caret-` : `icon-arrow-`) +
      this._arrowDirections[type][active ? 1 : 0];
    console.log(arrowId);
    return arrowId;
  }
}

export default new ButtonView();
