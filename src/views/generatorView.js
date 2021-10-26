`use strict`;

import icons from "url:./src/img/icons.svg";
import variationsView from "./variationsView";

class GeneratorView {
  #parentEl = document.body;

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  #generateMarkup() {
    const colour = this.#data.colour;
    const type = this.#data.type;
    return `
      <div class="message">Click the screen to generate a new colour</div>
        ${variationsView.render({ colour, type }, false)}
        <div class="color-text" style="opacity: 0.6, color: rgb></div>
      </div>`;
  }
}

export default new GeneratorView();
