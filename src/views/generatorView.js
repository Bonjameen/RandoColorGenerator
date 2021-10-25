import icons from "url:./src/img/icons.svg";

class GeneratorView {
  #parentEl = document.body;
  #message;
  #buttons;
  #tintPanel;
  #shadesPanel;
  #colourTextEl;
  #tintEls;
  #shadeEls;
  #colourTextEls;
  #data;

  render(data) {
    this.#data = data;
    if (this.#data.colour.hex !== `#343a40`) {
      this.#parentEl.style.backgroundColor = this.#data.colour;
      document
        .querySelector(`.color-text`)
        .children.forEach(this.#populateText);
      return;
    }
    const markup = this.#generateMarkup();
    this.#parentEl.innerHTML = ``;
    this.#parentEl.insertAdjacentHTML(`afterbegin`, markup);
    this.#message = document.querySelector(`.message`);
    this.#buttons = document.querySelectorAll(`.btn`);
    this.#tintPanel = document.querySelector(`.tints`);
    this.#shadesPanel = document.querySelector(`.shades`);
  }

  #populateText(el, i) {
    el.textContent = this.#data.colour[i ? `hex` : `rgb`];
  }

  renderNewColour(data) {}

  addHandlerRender(handlers) {}

  #generateMarkup() {
    return `
      <div class="message">Click the screen to generate a new colour</div>
      
      <div class="shades">
          <div class="btn btn--shades" data-type="shade">
            <span class="shades-text">Shades</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </div>
          ${this.#data.tints
            .map(
              (tint) => `
                <div class="shade-container">
                  <div class="shade" data-index="${i}" style="background-color: rgb(${shade[0].map(
                (val) => Math.trunc(val)
              )})">
                    <span class="rgb-text">rgb(${shade[0].join(`, `)})
                    </span>
                    <span class="hex-text">${colourous.convertRGBToHex(
                      `rgb(${shade[0].join(`, `)})`
                    )}
                    </span>
                  </div>
                </div>`
            )
            .join(``)}
      </div>`;
  }

  #selectElements() {
    this.#message = document.querySelector(`.message`);
    this.#buttons = document.querySelectorAll(`.btn`);
    this.#tintPanel = document.querySelector(`.tints`);
    this.#shadesPanel = document.querySelector(`.shades`);
    this.#colourTextEl = document.querySelector(`.message`);
    this.#colourTextEls = document.querySelector(`.shades`);
    this.#tintEls = document.querySelectorAll(`.btn`);
    this.#shadeEls = document.querySelector(`.tints`);
  }
}

export default new GeneratorView();
