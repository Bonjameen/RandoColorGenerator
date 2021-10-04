`use strict`;

const decToHex = [
  `0`,
  `1`,
  `2`,
  `3`,
  `4`,
  `5`,
  `6`,
  `7`,
  `8`,
  `9`,
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
];

const body = document.querySelector(`body`);
const message = document.querySelector(`.message`);
const buttons = document.querySelectorAll(`.btn`);
const tintPanel = document.querySelector(`.tints`);
const shadesPanel = document.querySelector(`.shades`);

let colorTextEl, color, tintEls, shadeEls;

const randomInt = (min, max) =>
  Math.floor(Math.random(min, max) * (max - min + 1));

const randomColor = () =>
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

const convertRGBToHex = (color) => {
  const hueList = getHueList(color);
  return `#${hueList.reduce((hex, cur) => hex + convertDecimalToHex(cur), ``)}`;
};

// Maths
// Tints - New value = current value + ((255 - current value) x tint factor)
// Shades - New value = current value x shade factor
const generateTint = (color, factor) =>
  color.map((val) => val + (255 - val) * factor);
const generateShade = (color, factor) => color.map((val) => val * factor);

const generateShadesTints = (color) => {
  const tints = [];
  const shades = [];
  for (let i = 0; i < 10; i++) {
    tints.push(generateTint(color, (i + 1) / 10));
    shades.push(generateShade(color, (i + 1) / 10));
  }

  return [shades, tints];
};

// const [backgroundTints, backgroundShades] = generateShadesTints();

// if R <= 10 then Rg = R/3294, else Rg = (R/269 + 0.0513)^2.4

// if G <= 10 then Gg = G/3294, else Gg = (G/269 + 0.0513)^2.4

// if B <= 10 then Bg = B/3294, else Bg = (B/269 + 0.0513)^2.4

// L = 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg

const calculateRelativeLuminance = (color) => {
  const hueValues = color.map((val) =>
    val <= 10 ? val / 3294 : (val / 269 + 0.0513) ** 2.4
  );
  if (
    typeof (
      0.2126 * hueValues[0] +
      0.7152 * hueValues[1] +
      0.0722 * hueValues[2]
    ) !== `number`
  )
    console.log(`calcRelLum`);
  return 0.2126 * hueValues[0] + 0.7152 * hueValues[1] + 0.0722 * hueValues[2];
};

const calculateContrastRatio = (colors) => {
  luminosities = [
    calculateRelativeLuminance(colors[0]),
    calculateRelativeLuminance(colors[1]),
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

const calculateVariationsAndContrasts = (color) => {
  const hueList = getHueList(color).map((hue) => Number(hue));

  const [shades, tints] = generateShadesTints(hueList);

  const shadeContrasts = shades.map((shade) => [
    shade,
    calculateContrastRatio([hueList, shade]),
  ]);
  const tintContrasts = tints.map((tint) => [
    tint,
    calculateContrastRatio([hueList, tint]),
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
    .find((c) => c[1] > 7);
  if (!selectedColour)
    return contrasts.reduce((acc, c) => (c[1] > acc[1] ? c : acc), [[], 0])[0];

  return selectedColour[0];
};

const setContrastColours = (color) => {
  const [shadeContrasts, tintContrasts] =
    calculateVariationsAndContrasts(color);
  const colorEl = document.querySelector(`.color-text`);

  const textColour = getLightestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);
  const btnColour = getDarkestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);

  getLightestContrastColour([...shadeContrasts, ...tintContrasts]);

  if (textColour) {
    message.style.color = `rgb(${textColour.join(`,`)})`;
  }
  if (btnColour) {
    buttons.forEach((btn) => {
      btn.style.color = `rgb(${btnColour.join(`,`)})`;
      btn.style.stroke = `rgb(${btnColour.join(`,`)})`;
    });
  }

  if (colorTextEl) colorTextEl.remove();
  colorTextEl = document.createElement(`div`);

  colorTextEl.classList.add(`color-text`);
  colorTextEl.innerHTML = `<div class="rgb-text">${color}</div><div class="hex-text">${convertRGBToHex(
    color
  )}</div>`;

  colorTextEl.querySelectorAll(`div`).forEach((el) => {
    el.addEventListener(`click`, function (e) {
      const text = this.innerHTML;
      navigator.clipboard.writeText(text);
      console.log(text);
      e.stopPropagation();
    });
  });
  colorTextEl.style.opacity = `60%`;
  const colourTextColour = getDarkestContrastColour([
    ...shadeContrasts,
    ...tintContrasts,
  ]);
  colorTextEl.style.color = `rgb(${colourTextColour.join(`,`)})`;
  body.append(colorTextEl);

  return [shadeContrasts, color, tintContrasts];
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
        child.style.backgroundColor = `rgb(${shades[i][0].map((val) =>
          Math.trunc(val)
        )})`;
      } else if (child.classList.contains(`tint`)) {
        child.style.backgroundColor = `rgb(${tints[i][0].map((val) =>
          Math.trunc(val)
        )})`;
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
        )})"></div></div>`
      );
    });
    tints.forEach((tint, i) => {
      tint[0] = tint[0].map((val) => Math.trunc(val));
      console.log(tints[0]);
      tintPanel.insertAdjacentHTML(
        `beforeend`,
        `<div class="shade-container"><div class="tint" data-index="${i}" style="background-color: rgb(${tint[0].map(
          (val) => Math.trunc(val)
        )})"></div></div>`
      );
    });
  }
};

const getHueList = (color) => color.slice(4, -1).split(`,`);

const init = () => {
  const backgroundColor = `#343a40`;
  body.style.backgroundColor = backgroundColor;

  const [shades, color, tints] = setContrastColours(body.style.backgroundColor);
  setTintAndShadePanels(shades.slice(0, -1), tints.slice(0, -1));

  shadeEls = document.querySelectorAll(`.shade`);
  tintEls = document.querySelectorAll(`.tint`);
};

init();

body.addEventListener(`click`, () => {
  color = randomColor();
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
