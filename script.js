`use strict`;

// const decToHex = [
//   `0`,
//   `1`,
//   `2`,
//   `3`,
//   `4`,
//   `5`,
//   `6`,
//   `7`,
//   `8`,
//   `9`,
//   `A`,
//   `B`,
//   `C`,
//   `D`,
//   `E`,
//   `F`,
// ];

const body = document.querySelector(`body`);
const message = document.querySelector(`.message`);
const buttons = document.querySelectorAll(`.btn`);
const tintPanel = document.querySelector(`.tints`);
const shadesPanel = document.querySelector(`.shades`);

let colourTextEl, color, tintEls, shadeEls, colourTextEls;

const colourous = new Colourous();

//#region Colour Functions

/*

const randomInt = (min, max) =>
  Math.floor(Math.random(min, max) * (max - min + 1));

const randomColour = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

const convertDecimalToHex = (dec) => {
  let remainder;
  let remainderString = ``;
  while (dec !== 0) {
    remainder = dec % 16;
    remainderString = `${decToHex[remainder]}${remainderString}`;
    dec = Math.floor(dec / 16);
  }

  return remainderString.padStart(2, `0`);
};

const getHueList = (color) =>
  color
    .slice(4, -1)
    .split(`,`)
    .map((val) => Number(val));

const convertRGBToHex = (colour) => {
  const hueList = getHueList(colour);
  return `#${hueList.reduce((hex, cur) => hex + convertDecimalToHex(cur), ``)}`;
};

// Maths
// Tints - New value = current value + ((255 - current value) x tint factor)
// Shades - New value = current value x shade factor
const generateTint = (colour, factor) =>
  colour.map((val) => val + (255 - val) * factor);
const generateShade = (colour, factor) => colour.map((val) => val * factor);

const generateShadesTints = (colour) => {
  const tints = [];
  const shades = [];
  for (let i = 0; i < 10; i++) {
    tints.push(generateTint(colour, (i + 1) / 10));
    shades.push(generateShade(colour, (i + 1) / 10));
  }

  return [shades, tints];
};

// const [backgroundTints, backgroundShades] = generateShadesTints();

// if R <= 10 then Rg = R/3294, else Rg = (R/269 + 0.0513)^2.4

// if G <= 10 then Gg = G/3294, else Gg = (G/269 + 0.0513)^2.4

// if B <= 10 then Bg = B/3294, else Bg = (B/269 + 0.0513)^2.4

// L = 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg

const calculateRelativeLuminance = (colour) => {
  const hueValues = colour.map((val) =>
    val <= 10 ? val / 3294 : (val / 269 + 0.0513) ** 2.4
  );
  return 0.2126 * hueValues[0] + 0.7152 * hueValues[1] + 0.0722 * hueValues[2];
};

const calculateContrastRatio = (colours) => {
  luminosities = [
    calculateRelativeLuminance(colours[0]),
    calculateRelativeLuminance(colours[1]),
  ];
  if (
    typeof (
      (Math.max(...luminosities) + 0.05) /
      (Math.min(...luminosities) + 0.05)
    ) !== `number`
  )
    console.log(`calcContrast`);
  return (
    (Math.max(...luminosities) + 0.05) / (Math.min(...luminosities) + 0.05)
  );
};

const getOppositeColour = (colour) => {
  if (calculateRelativeLuminance(colour) > 0.5) {
    return colour.map((val) => Math.abs(225 - val));
  } else
    return colour.map((val) =>
      Math.abs(275 - val) > 255 ? 255 : Math.abs(275 - val)
    );
};

const calculateVariationsAndContrasts = (colour) => {
  const hueList = getHueList(colour).map((hue) => Number(hue));

  const [shades, tints] = generateShadesTints(hueList);

  const shadeContrasts = shades.map((shade) => [
    shade.map((val) => Math.round(val)),
    calculateContrastRatio([hueList, shade.map((val) => Math.round(val))]),
  ]);
  const tintContrasts = tints.map((tint) => [
    tint.map((val) => Math.round(val)),
    calculateContrastRatio([hueList, tint.map((val) => Math.round(val))]),
  ]);

  return [shadeContrasts, tintContrasts];
};

const calculateContrasts = (colour, shades, tints) => {
  const shadeContrasts = shades.map((shade) => [
    shade.map((val) => Math.round(val)),
    calculateContrastRatio([colour, shade.map((val) => Math.round(val))]),
  ]);
  const tintContrasts = tints.map((tint) => [
    tint.map((val) => Math.round(val)),
    calculateContrastRatio([colour, tint.map((val) => Math.round(val))]),
  ]);

  return [shadeContrasts, tintContrasts];
};

const getDarkestContrastColour = (contrasts) => {
  const selectedColour = contrasts
    .sort((a, b) => a[1] - b[1])
    .find((c) => c[1] > 7);
  if (!selectedColour)
    return contrasts.reduce((acc, c) => (c[1] > acc[1] ? c : acc), [[], 0])[0];

  return selectedColour[0];
};

const getLightestContrastColour = (contrasts) => {
  const selectedColour = contrasts
    .sort((a, b) => a[1] + b[1])
    .find((c) => c[1] > 5.5);
  if (!selectedColour)
    return contrasts.reduce((acc, c) => (c[1] > acc[1] ? c : acc), [[], 0])[0];

  return selectedColour[0];
};
*/
// #endregion

//#region General DOM functions

const colourCodeClick = (el) => {
  el.addEventListener(`click`, function (e) {
    const text = this.innerHTML;
    navigator.clipboard.writeText(text);
    e.stopPropagation();
  });
};

const setContrastColours = (colour) => {
  const [shadeContrasts, tintContrasts] =
    colourous.calculateVariationsAndContrasts(colour);

  const textColour = colourous.getLightestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);
  const btnColour = colourous.getDarkestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);

  if (textColour) {
    message.style.color = `rgb(${textColour.join(`,`)})`;
  }
  if (btnColour) {
    buttons.forEach((btn) => {
      btn.style.color = `rgb(${btnColour.join(`,`)})`;
      btn.style.stroke = `rgb(${btnColour.join(`,`)})`;
    });
  }

  if (colourTextEl) colourTextEl.remove();
  colourTextEl = document.createElement(`div`);

  colourTextEl.classList.add(`color-text`);
  colourTextEl.innerHTML = `<div class="rgb-text">${colour}</div><div class="hex-text">${colourous.convertRGBToHex(
    colour
  )}</div>`;

  colourTextEl.querySelectorAll(`div`).forEach((el) => colourCodeClick(el));
  colourTextEl.style.opacity = `60%`;
  const colourTextColour = colourous.getDarkestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);
  colourTextEl.style.color = `rgb(${colourTextColour.join(`,`)})`;
  body.append(colourTextEl);

  return [shadeContrasts, colour, tintContrasts];
};

const setTintShadeColour = (colour, child) => {
  // Set background colour of the colour box
  child.style.backgroundColor = `rgb(${colour[0].map((val) =>
    Math.trunc(val)
  )})`;

  // Grab and set the rgb and hex codes shown in box
  colourTextEls = child.querySelectorAll(`.rgb-text, .hex-text`);

  colourTextEls.forEach((el) => {
    el.innerHTML = el.classList.contains(`rgb-text`)
      ? `rgb(${colour[0].map((val) => Math.round(val)).join(`, `)})`
      : `${colourous.convertRGBToHex(
          `rgb(${colour[0].map((val) => Math.round(val)).join(`, `)})`
        )}`;

    // Set text colour of codes to good contrast colour
    const textColour = colourous.getOppositeColour(
      colour[0].map((val) => Math.round(val))
    );
    el.style.color = `rgb(${textColour})`;
    if (colourous.calculateContrastRatio([colour[0], textColour]) < 5.5) {
      // el.style.textShadow =
      //   calculateRelativeLuminance(textColour) < 0.6
      //     ? `0 0 1px rgb(225,225,225,0.8)`
      //     : `0 0 1px rgb(22,22,22,0.8)`;
    }
  });
};

const setTintAndShadePanels = (shades, tints) => {
  shades.sort((a, b) => a[1] - b[1]);
  console.log(shades);
  const shadeContainers = document.querySelectorAll(`.shade-container`);
  // if shades and tints exist, just change the background colors of boxes
  if (shadeContainers.length !== 0) {
    shadeContainers.forEach((container) => {
      const child = container.children[0];
      const i = child.dataset.index;
      if (child.classList.contains(`shade`)) {
        setTintShadeColour(shades[i], child);
      } else if (child.classList.contains(`tint`)) {
        setTintShadeColour(tints[i], child);
        if (
          colourous.calculateContrastRatio([
            colourous.getHueList(child.querySelector(`.rgb-text`).style.color),
            colourous.getHueList(child.style.backgroundColor),
          ]) < 4.5
        ) {
          const hueListColour = colourous.getHueList(
            child.querySelector(`.rgb-text`).style.color
          );
          const hueListBackgroundColour = colourous.getHueList(
            child.style.backgroundColor
          );
          const [shades, tints] = colourous.generateShadesTints(hueListColour);
          const [shadeContrasts, tintContrasts] = colourous.calculateContrasts(
            hueListBackgroundColour,
            shades,
            tints
          );
          const selectedColour = colourous.getDarkestContrastColour([
            ...shadeContrasts,
            ...tintContrasts,
          ]);
          child
            .querySelectorAll(`.rgb-text .hex-text`)
            .forEach(
              (el) => (el.style.color = `rgb(${selectedColour.join(`,`)})`)
            );
        }
      }
    });
    // else create new shade container elements
  } else {
    shades.forEach((shade, i) => {
      shade[0] = shade[0].map((val) => Math.trunc(val));
      console.log(`shade`, shades[0]);
      shadesPanel.insertAdjacentHTML(
        `beforeend`,
        `<div class="shade-container"><div class="shade" data-index="${i}" style="background-color: rgb(${shade[0].map(
          (val) => Math.trunc(val)
        )})"><span class="rgb-text">rgb(${shade[0].join(
          `, `
        )})</span><span class="hex-text">${colourous.convertRGBToHex(
          `rgb(${shade[0].join(`, `)})`
        )}</span></div></div>`
      );
    });
    tints.forEach((tint, i) => {
      tint[0] = tint[0].map((val) => Math.trunc(val));
      console.log(tints[0]);
      tintPanel.insertAdjacentHTML(
        `beforeend`,
        `<div class="shade-container"><div class="tint" data-index="${i}" style="background-color: rgb(${tint[0].map(
          (val) => Math.trunc(val)
        )})"><span class="rgb-text">rgb(${tint[0].join(
          `, `
        )})</span><span class="hex-text">${colourous.convertRGBToHex(
          `rgb(${tint[0].join(`, `)})`
        )}</span></div></div>`
      );
    });
  }
  return [
    document.querySelectorAll(`.shade`),
    document.querySelectorAll(`.tint`),
  ];
};

const init = () => {
  const backgroundColor = `#343a40`;
  body.style.backgroundColor = backgroundColor;

  const [shades, _, tints] = setContrastColours(body.style.backgroundColor);
  [shadeEls, tintEls] = setTintAndShadePanels(
    shades.slice(0, -1),
    tints.slice(0, -1)
  );
  [...shadeEls]
    .map((shade) => [
      shade.querySelector(`.hex-text`),
      shade.querySelector(`.rgb-text`),
    ])
    .forEach((item) => item.forEach((el) => colourCodeClick(el)));
  [...tintEls]
    .map((tint) => [
      tint.querySelector(`.hex-text`),
      tint.querySelector(`.rgb-text`),
    ])
    .forEach((item) => item.forEach((el) => colourCodeClick(el)));
};

init();

//#endregion

//#region event listeners and listener functions

body.addEventListener(`click`, () => {
  color = colourous.randomColour();
  body.style.backgroundColor = color;
  const [shades, _, tints] = setContrastColours(color);

  setTintAndShadePanels(shades.slice(0, -1), tints.slice(0, -1));
});

buttons.forEach((btn, i) =>
  btn.addEventListener(`click`, (e) => {
    e.stopPropagation();
    slidePanel(e.currentTarget.dataset.type);

    // setTimeout(slidePanel, (i + 1) * 200, btn.dataset.type, e, i);
  })
);

const slidePanel = (type) => {
  // Button
  const button = [...buttons].find((btn) => btn.dataset.type === type);
  const children = [...button.children];
  const buttonName = children
    .find((child) => child.classList.contains(`arrow`))
    .name.split(`-`)[1];
  button.classList.toggle(`btn--${type}s__active`);
  children.find((child) => child.classList.contains(`arrow`)).name = `chevron-${
    buttonName === `forward` ? `back` : `forward`
  }-outline`;
  console.log(
    children
      .find((child) => child.tagName.toLowerCase() === `span`)
      .classList.toggle(`hidden`)
  );

  // Sliding colours
  if (type === `tint`) {
    tintEls.forEach((_, i) => slideIndividualColour(type, i));
  } else if (type === `shade`) {
    shadeEls.forEach((_, i) => slideIndividualColour(type, i));
  }
};

const slideIndividualColour = (type, i) => {
  const colour = document.querySelector(`.${type}[data-index="${i}"]`);
  setTimeout(() => {
    colour.classList.toggle(`${type}--active`);
  }, i * 100);
};

//#endregion
