import colourBoxView from "./colourBoxView";
import View from "./View";
import variationView from "./variationView";

`use strict`;

class VariationsView extends View {
  _parentEl = document.querySelector(`.variations`);

  addHandlerClick(btnClickHandler, codeClickHandler) {
    this._parentEl.addEventListener(
      `click`,
      this._handleClick.bind(this, btnClickHandler, codeClickHandler)
    );
  }

  slidePanel = (type, active) => {
    // Button
    const button = document.querySelector(`.btn--${type}s`);
    // const children = [...button.children];
    // const buttonName = children
    //   .find((child) => child.classList.contains(`arrow`))
    //   .name.split(`-`)[1];
    button.classList.toggle(`btn--${type}s__active`);
    children.find((child) =>
      child.classList.contains(`arrow`)
    ).name = `chevron-${buttonName === `forward` ? `back` : `forward`}-outline`;

    // Sliding colours
    if (type === `tint`) {
      tintEls.forEach((_, i) => slideIndividualColour(type, i));
    } else if (type === `shade`) {
      shadeEls.forEach((_, i) => slideIndividualColour(type, i));
    }
  };

  _handleClick(btnClickHandler, codeClickHandler, e) {
    const target = e.target;
    const btnEl = target.closest(`.btn`);
    const textEl = target.closest(`.rgb-text, .hex-text`);
    if (btnEl) {
      e.stopPropagation();
      const type = [...btnEl.classList]
        .find(
          (className) =>
            className.includes(`tint`) || className.includes(`shade`)
        )
        .split(`--`)[1]
        .slice(0, -1);
      btnClickHandler(type);
    }
    if (textEl) {
      e.stopPropagation();
      codeClickHandler(textEl.innerText);
    }
  }

  /**
   * Generates the html markup for the view
   * @returns {string} The html markup to render or update the view with
   * @author Ben Pinner
   */
  _generateMarkup() {
    const tintsActive = this._data.tintsActive;
    const shadesActive = this._data.shadesActive;
    const tints = this._data.tints;
    const shades = this._data.shades;
    console.log(`shades`, shades);
    const colour = this._data.colour;
    const markup = `
                  ${variationView.render(
                    {
                      colour,
                      type: `tint`,
                      tints,
                      active: tintsActive,
                    },
                    false
                  )}
                  ${variationView.render(
                    {
                      colour,
                      type: `shade`,
                      shades,
                      active: shadesActive,
                    },
                    false
                  )}`;
    return markup;
  }
}

export default new VariationsView();
