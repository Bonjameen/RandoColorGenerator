`use strict`;
import * as model from "./model.js";
import generatorView from "./generatorView.js";
import variationsView from "./views/variationsView.js";
import colourous from "../colourous.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) module.hot.accept();

const controlGenerator = function () {
  const colour = [model.state.colour.rgb, model.state.colour.hex];
  const type = model.state.type;
  if (model.state.tints.length === 0) {
    model.setShadesTints();
    generatorView.render({ colour, type });
  } else {
    model.setNewColour();
    generatorView.update({ colour, type });
  }
};

const init = () => {
  generatorView.addHandlerRender(controlGenerator);
};
init();
