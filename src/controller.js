`use strict`;
import * as model from "./model.js";
import generatorView from "./views/generatorView.js";
import variationsView from "./views/variationsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import colourBoxView from "./views/colourBoxView.js";
import btnView from "./views/btnView.js";
import copyMessageView from "./views/copyMessageView.js";
import likesView from "./views/likesView.js";
import searchView from "./views/searchView.js";

import assert from "assert";
import colorRegex from "colors-regex";

if (module.hot) module.hot.accept();

const controlGenerator = function () {
  const colour = model.state.colour;
  const tintsActive = model.state.tintsActive;
  const shadesActive = model.state.shadesActive;
  const likesActive = model.state.likesActive;
  const likes = model.state.likes;
  let tints, shades;
  if (model.state.tints.length === 0) {
    model.setShadesTints();
    tints = model.state.tints;
    shades = model.state.shades;
    generatorView.render({
      colour,
      tints,
      shades,
      likes,
    });
    likesView.render({ colour, colours: likes, active: likesActive });
    likesView.setScrollbar();
    variationsView.render({
      colour,
      tints,
      shades,
      tintsActive,
      shadesActive,
    });
  } else {
    model.setNewColour();
    tints = model.state.tints;
    shades = model.state.shades;
    generatorView.update({
      colour,
      tints,
      shades,
      likes,
    });
    likesView.update({ colour, colours: likes, active: likesActive });
    variationsView.update({
      colour,
      tints,
      shades,
      tintsActive,
      shadesActive,
    });
  }
};

const controlSearchSubmit = function (code) {
  const isHex = validateHex(code);
  const isRGB = isHex ? false : validateRGB(code);
  model.state.searchFocused && model.toggleSearchFocused();

  if (!isHex && !isRGB) {
    console.error(`💥💥💥 invalid colour code`);
    return;
  }

  searchView.clear();

  const hex = isHex ? code : model.getHexFromRGB(code);
  const rgb = isRGB ? code : model.getRGBFromHex(code);

  controlSetNewColour(rgb, hex);
};

const controlSetNewColour = function (rgb, hex = null) {
  hex = hex ? model.getHexFromRGB(rgb) : null;
  model.setNewColour([rgb, hex]);
  const tints = model.state.tints;
  const shades = model.state.shades;
  const tintsActive = model.state.tintsActive;
  const shadesActive = model.state.shadesActive;
  const colour = model.state.colour;
  const likes = model.state.likes;
  generatorView.update({
    colour,
    tints,
    shades,
    likes,
  });
  variationsView.update({
    colour,
    tints,
    shades,
    tintsActive,
    shadesActive,
  });
  likesView.render({ colour, colours: likes, active: false });
};

const controlPanelSlide = function (type) {
  model.toggleVariation(type);
  const active = model.state[`${type}sActive`];
  const data = { colour: model.state.colour, type, active };
  if (!active) btnView.slideBtnOut(type, model.state.colour);
  btnView.update(data);
  if (active) btnView.slideBtnIn(type, model.state[`${type}s`][4]);
  model.state[`${type}s`].forEach((colour, i) => {
    const data = {
      colour,
      index: i,
      type,
      active,
    };
    setTimeout(() => colourBoxView.update(data), i * 100);
  });

  // variationsView.slidePanel(type, model.state[`${type}sActive`]);
};

const controlColourCodeClick = function (code) {
  const colour = model.state.colour;
  const data = { colour, code };
  copyMessageView.update(data);
  model.state.copyMessageTimeout = setTimeout(copyMessageView.close, 6000);
};

const controlCloseMessageClick = function () {
  copyMessageView.close(model.state.copyMessageTimeout);
};

const controlLike = function () {
  const colour = model.state.colour;
  if (!model.state.likes.some((like) => like.rgb === colour.rgb))
    model.addLike(colour);
  else model.deleteLike(colour.rgb);
  const colours = model.state.likes;
  const likes = model.state.likes;
  const likesActive = model.state.likesActive;
  const genData = { colour, likes };
  const likesData = { colour, colours, active: likesActive };
  generatorView.render(genData);
  likesView.render(likesData);
  likesView.setScrollbar();
};

const controlLikesBtnClick = function () {
  model.toggleLikesActive();
  const colour = model.state.colour;
  const colours = model.state.likes;
  const active = model.state.likesActive;
  const data = { colour, colours, active };
  if (active) likesView.slideBtnIn();
  likesView.update(data);
  if (!active) likesView.slideBtnOut();
};

const controlSearchClick = function () {
  !model.state.searchFocused ? generatorView.toggleSearch() : null;
  !model.state.searchFocused ? model.toggleSearchFocused() : null;
  const focused = model.state.searchFocused;
  const colour = model.state.colour;
  const likes = model.state.likes;

  if (window.screen.width <= 540) {
    likesView.update({
      searchFocused: focused,
      colour,
      colours: likes,
    });
    likesView.slideBtnIn();
  }
  searchView.focusSearchBar();
  searchView.update({ colour, focused });
};

const controlSearchClose = function () {
  model.toggleSearchFocused();
  const focused = model.state.searchFocused;
  const colour = model.state.colour;
  const likes = model.state.likes;
  searchView.update({ colour, focused });
  if (window.screen.width <= 540) {
    likesView.update({
      searchFocused: focused,
      colour,
      colours: likes,
    });
    likesView.slideBtnOut();
  }
};

const init = () => {
  generatorView.addHandlerRender(controlGenerator);
  generatorView.addHandlerClick(
    controlGenerator,
    controlColourCodeClick,
    controlCloseMessageClick,
    controlLike,
    controlSearchClick,
    controlSearchClose
  );
  generatorView.addHandlerSubmit(controlSearchSubmit);
  variationsView.addHandlerClick(controlPanelSlide, controlColourCodeClick);
  likesView.addHandlerClick(controlLikesBtnClick, controlSetNewColour);
  model.retrieveLikes();
  model.setColourNames();
};
init();

const validateCode = (code) => {
  return !colorRegex.hex.strict.test(code) && !colorRegex.rgb.strict.test(code);
};

const validateHex = (code) => {
  return colorRegex.hex.strict.test(code);
};

const validateRGB = (code) => {
  return colorRegex.rgb.strict.test(code);
};
