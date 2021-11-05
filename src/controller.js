`use strict`;
import * as model from "./model.js";
import generatorView from "./views/generatorView.js";
import variationsView from "./views/variationsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import colourBoxView from "./views/colourBoxView.js";
import btnView from "./views/btnView.js";
import copyMessageView from "./views/copyMessageView.js";

if (module.hot) module.hot.accept();

const controlGenerator = function () {
  const colour = model.state.colour;
  const tintsActive = model.state.tintsActive;
  const shadesActive = model.state.shadesActive;
  let tints, shades;
  if (model.state.tints.length === 0) {
    model.setShadesTints();
    tints = model.state.tints;
    shades = model.state.shades;
    generatorView.render({
      colour,
      tints,
      shades,
    });
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
    });
    variationsView.update({
      colour,
      tints,
      shades,
      tintsActive,
      shadesActive,
    });
  }
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

const init = () => {
  generatorView.addHandlerRender(controlGenerator);
  generatorView.addHandlerClick(
    controlGenerator,
    controlColourCodeClick,
    controlCloseMessageClick
  );
  variationsView.addHandlerClick(controlPanelSlide, controlColourCodeClick);
};
init();
