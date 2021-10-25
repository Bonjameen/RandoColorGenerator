// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hlItI":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "af83c2965d140dba";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8fvzf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _iconsSvg = require("url:./src/img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
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
*/ // #endregion
//#region General DOM functions
const colourCodeClick = (el)=>{
    el.addEventListener(`click`, function(e) {
        const text = this.innerHTML;
        navigator.clipboard.writeText(text);
        e.stopPropagation();
    });
};
const setContrastColours = (colour)=>{
    const [shadeContrasts, tintContrasts] = colourous.calculateVariationsAndContrasts(colour);
    const textColour = colourous.getLightestContrastColour([
        ...shadeContrasts,
        ...tintContrasts, 
    ]);
    const btnColour = colourous.getDarkestContrastColour([
        ...shadeContrasts,
        ...tintContrasts, 
    ]);
    if (textColour) message.style.color = `rgb(${textColour.join(`,`)})`;
    if (btnColour) buttons.forEach((btn)=>{
        btn.style.color = `rgb(${btnColour.join(`,`)})`;
        btn.style.stroke = `rgb(${btnColour.join(`,`)})`;
    });
    if (colourTextEl) colourTextEl.remove();
    colourTextEl = document.createElement(`div`);
    colourTextEl.classList.add(`color-text`);
    colourTextEl.innerHTML = `<div class="rgb-text">${colour}</div><div class="hex-text">${colourous.convertRGBToHex(colour)}</div>`;
    colourTextEl.querySelectorAll(`div`).forEach((el)=>colourCodeClick(el)
    );
    colourTextEl.style.opacity = `60%`;
    const colourTextColour = colourous.getDarkestContrastColour([
        ...shadeContrasts,
        ...tintContrasts, 
    ]);
    colourTextEl.style.color = `rgb(${colourTextColour.join(`,`)})`;
    body.append(colourTextEl);
    return [
        shadeContrasts,
        colour,
        tintContrasts
    ];
};
const setTintShadeColour = (colour, child)=>{
    // Set background colour of the colour box
    child.style.backgroundColor = `rgb(${colour[0].map((val)=>Math.trunc(val)
    )})`;
    // Grab and set the rgb and hex codes shown in box
    colourTextEls = child.querySelectorAll(`.rgb-text, .hex-text`);
    colourTextEls.forEach((el)=>{
        el.innerHTML = el.classList.contains(`rgb-text`) ? `rgb(${colour[0].map((val)=>Math.round(val)
        ).join(`, `)})` : `${colourous.convertRGBToHex(`rgb(${colour[0].map((val)=>Math.round(val)
        ).join(`, `)})`)}`;
        // Set text colour of codes to good contrast colour
        const textColour = colourous.getOppositeColour(colour[0].map((val)=>Math.round(val)
        ));
        el.style.color = `rgb(${textColour})`;
        colourous.calculateContrastRatio([
            colour[0],
            textColour
        ]);
    });
};
const setTintAndShadePanels = (shades, tints)=>{
    shades.sort((a, b)=>a[1] - b[1]
    );
    console.log(shades);
    const shadeContainers = document.querySelectorAll(`.shade-container`);
    // if shades and tints exist, just change the background colors of boxes
    if (shadeContainers.length !== 0) shadeContainers.forEach((container)=>{
        const child = container.children[0];
        const i = child.dataset.index;
        if (child.classList.contains(`shade`)) setTintShadeColour(shades[i], child);
        else if (child.classList.contains(`tint`)) {
            setTintShadeColour(tints[i], child);
            if (colourous.calculateContrastRatio([
                colourous.getHueList(child.querySelector(`.rgb-text`).style.color),
                colourous.getHueList(child.style.backgroundColor), 
            ]) < 4.5) {
                const hueListColour = colourous.getHueList(child.querySelector(`.rgb-text`).style.color);
                const hueListBackgroundColour = colourous.getHueList(child.style.backgroundColor);
                const [shades, tints] = colourous.generateShadesTints(hueListColour);
                const [shadeContrasts, tintContrasts] = colourous.calculateContrasts(hueListBackgroundColour, shades, tints);
                const selectedColour = colourous.getDarkestContrastColour([
                    ...shadeContrasts,
                    ...tintContrasts, 
                ]);
                child.querySelectorAll(`.rgb-text .hex-text`).forEach((el)=>el.style.color = `rgb(${selectedColour.join(`,`)})`
                );
            }
        }
    });
    else {
        shades.forEach((shade, i)=>{
            shade[0] = shade[0].map((val)=>Math.trunc(val)
            );
            console.log(`shade`, shades[0]);
            shadesPanel.insertAdjacentHTML(`beforeend`, `<div class="shade-container"><div class="shade" data-index="${i}" style="background-color: rgb(${shade[0].map((val)=>Math.trunc(val)
            )})"><span class="rgb-text">rgb(${shade[0].join(`, `)})</span><span class="hex-text">${colourous.convertRGBToHex(`rgb(${shade[0].join(`, `)})`)}</span></div></div>`);
        });
        tints.forEach((tint, i)=>{
            tint[0] = tint[0].map((val)=>Math.trunc(val)
            );
            console.log(tints[0]);
            tintPanel.insertAdjacentHTML(`beforeend`, `<div class="shade-container"><div class="tint" data-index="${i}" style="background-color: rgb(${tint[0].map((val)=>Math.trunc(val)
            )})"><span class="rgb-text">rgb(${tint[0].join(`, `)})</span><span class="hex-text">${colourous.convertRGBToHex(`rgb(${tint[0].join(`, `)})`)}</span></div></div>`);
        });
    }
    return [
        document.querySelectorAll(`.shade`),
        document.querySelectorAll(`.tint`), 
    ];
};
const init = ()=>{
    const backgroundColor = `#343a40`;
    body.style.backgroundColor = backgroundColor;
    const [shades, _, tints] = setContrastColours(body.style.backgroundColor);
    [shadeEls, tintEls] = setTintAndShadePanels(shades.slice(0, -1), tints.slice(0, -1));
    [
        ...shadeEls
    ].map((shade)=>[
            shade.querySelector(`.hex-text`),
            shade.querySelector(`.rgb-text`), 
        ]
    ).forEach((item)=>item.forEach((el)=>colourCodeClick(el)
        )
    );
    [
        ...tintEls
    ].map((tint)=>[
            tint.querySelector(`.hex-text`),
            tint.querySelector(`.rgb-text`), 
        ]
    ).forEach((item)=>item.forEach((el)=>colourCodeClick(el)
        )
    );
};
init();
//#endregion
//#region event listeners and listener functions
body.addEventListener(`click`, ()=>{
    color = colourous.randomColour();
    body.style.backgroundColor = color;
    const [shades, _, tints] = setContrastColours(color);
    setTintAndShadePanels(shades.slice(0, -1), tints.slice(0, -1));
});
buttons.forEach((btn, i)=>btn.addEventListener(`click`, (e)=>{
        e.stopPropagation();
        slidePanel(e.currentTarget.dataset.type);
    // setTimeout(slidePanel, (i + 1) * 200, btn.dataset.type, e, i);
    })
);
const slidePanel = (type)=>{
    // Button
    const button = [
        ...buttons
    ].find((btn)=>btn.dataset.type === type
    );
    const children = [
        ...button.children
    ];
    const buttonName = children.find((child)=>child.classList.contains(`arrow`)
    ).name.split(`-`)[1];
    button.classList.toggle(`btn--${type}s__active`);
    children.find((child)=>child.classList.contains(`arrow`)
    ).name = `chevron-${buttonName === `forward` ? `back` : `forward`}-outline`;
    console.log(children.find((child)=>child.tagName.toLowerCase() === `span`
    ).classList.toggle(`hidden`));
    // Sliding colours
    if (type === `tint`) tintEls.forEach((_, i)=>slideIndividualColour(type, i)
    );
    else if (type === `shade`) shadeEls.forEach((_, i)=>slideIndividualColour(type, i)
    );
};
const slideIndividualColour = (type, i)=>{
    const colour = document.querySelector(`.${type}[data-index="${i}"]`);
    setTimeout(()=>{
        colour.classList.toggle(`${type}--active`);
    }, i * 100);
}; //#endregion

},{"url:./src/img/icons.svg":"8Qs59","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8Qs59":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('f4g9C') + "icons.e7078503.svg" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"chiK4":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["hlItI","8fvzf"], "8fvzf", "parcelRequiredd8e")

//# sourceMappingURL=index.5d140dba.js.map
