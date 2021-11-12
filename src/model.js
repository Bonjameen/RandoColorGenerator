`use strict`;
import colourous from "./colourous";
import colourNames from "./data/data";

/**
 * The app state, stores the colour generated, all tints and shades, and also contrast colours for each individual colour
 */
export const state = {
  colour: {
    rgb: `rgb(52, 58, 64)`,
    hex: `#343a40`,
    higherContrastColour: ``,
    lowerContrastColour: { rgb: ``, contrastColour: `` },
    luminance: ``,
    name: ``,
  },
  tints: [],
  shades: [],
  tintsActive: false,
  shadesActive: false,
  likesActive: false,
  searchFocused: false,
  likes: [],
  names: [],
};

export const setNewColour = function (colour = null) {
  [state.colour.rgb, state.colour.hex] =
    colour ?? colourous.generateRandomColour();
  setMainColourName();
  setShadesTints();
};

/**
 * Gets and sets the shade and tint values for state.colour
 * @author Ben Pinner
 */
export const setShadesTints = function () {
  // Calculate and set luminance of current colour
  state.colour.luminance = colourous.calculateRelativeLuminance(
    state.colour.rgb
  );

  // state.colour.name = getColourHue(state.colour.rgb)
  // Calculate variations and contrasts of main colour
  [state.shades, state.tints] = calculateShadesTints();
  const contrasts = getRGBContrastValues(state.tints, state.shades);

  if (![...state.shades, ...state.tints].find((c) => c[1] > 7)) {
    state.colour.higherContrastColour =
      state.colour.luminance < 0.5 ? `rgb(220,220,220)` : `rgb(35,35,35)`;
  } else {
    state.colour.higherContrastColour =
      colourous.getHigherContrastColour(contrasts);
  }
  const lowerContrastColour = colourous.getLowerContrastColour(contrasts);
  state.colour.lowerContrastColour.rgb = lowerContrastColour;
  state.colour.lowerContrastColour.luminance =
    colourous.calculateRelativeLuminance(lowerContrastColour);
  const [shades, tints] = calculateShadesTints(
    lowerContrastColour,
    state.colour.lowerContrastColour.luminance
  );
  const contrastValues = getRGBContrastValues(shades, tints);
  state.colour.lowerContrastColour.contrastColour =
    colourous.getHigherContrastColour(contrastValues);
  const [tintTextColours, shadeTextColours] = calculateShadesTintsContrasts(
    state.tints,
    state.shades
  );
  tintTextColours.forEach(
    (colour, i) => (state.tints[i].contrastColour = colour)
  );

  shadeTextColours.forEach(
    (colour, i) => (state.shades[i].contrastColour = colour)
  );
};

export const addLike = function (like) {
  if (state.likes.some((item) => item.rgb === like.rgb)) return;
  state.likes.push(like);
  persistLikes();
};

export const deleteLike = function (code) {
  state.likes = state.likes.filter((like) => like.rgb !== code);
  persistLikes();
};

export const storeLikes = function () {
  localStorage.setItem(`likes`, JSON.stringify(state.likes));
};

export const retrieveLikes = function () {
  const likes = JSON.parse(localStorage.getItem(`likes`));
  if (likes instanceof Array) state.likes = likes;
};

const persistLikes = function () {
  localStorage.setItem(`likes`, JSON.stringify(state.likes));
  state.likes = JSON.parse(localStorage.getItem(`likes`));
};

export const toggleLikesActive = function () {
  state.likesActive = !state.likesActive;
};

export const toggleVariation = function (type) {
  state[`${type}sActive`] = !state[`${type}sActive`];
};

const calculateShadesTints = function (colour = null, luminance = null) {
  if (!colour)
    return colourous.calculateVariationsAndContrasts(
      state.colour.rgb,
      state.colour.luminance
    );
  return colourous.calculateVariationsAndContrasts(colour, luminance);
};

const calculateShadesTintsContrasts = function (tints, shades) {
  const tintTextColours = tints.map((tint) => {
    const [shadeVariations, tintVariations] = calculateShadesTints(
      tint.rgb,
      tint.luminance
    );
    const contrasts = getRGBContrastValues(tintVariations, shadeVariations);
    return colourous.getHigherContrastColour(contrasts);
  });
  const shadeTextColours = shades.map((shade) => {
    const [shadeVariations, tintVariations] = calculateShadesTints(
      shade.rgb,
      shade.luminance
    );
    const contrasts = getRGBContrastValues(tintVariations, shadeVariations);
    return colourous.getHigherContrastColour(contrasts);
  });
  return [tintTextColours, shadeTextColours];
};

/**
 * Gets the rgb values for all tints and shades in the state
 * @returns {string[][]} A list containing a tint rgb value list and a shade rgb value list
 * @author Ben Pinner
 */
const getTintsShadesRGB = function () {
  const tints = state.tints.map((val) => val.rgb);
  const shades = state.shades.map((val) => val.rgb);

  return [tints, shades];
};

const getRGBContrastValues = (tints, shades) =>
  [...tints, ...shades].map((colour) => [colour.rgb, colour.contrast]);

export const getHexFromRGB = function (code) {
  return colourous.convertRGBToHex(code);
};
export const getRGBFromHex = function (code) {
  return colourous.convertHexToRGB(code);
};

const getColourHue = (code) => {
  return colourous.generateHueNumber(code);
};

export const setColourNames = () => {
  const names = colourNames;
  state.names = names;
  console.log(state.names);
};

const setMainColourName = () => {
  const hueNum = getColourHue(state.colour.rgb);
  state.colour.name = state.names[hueNum];
};

export const toggleSearchFocused = () => {
  state.searchFocused = !state.searchFocused;
};
