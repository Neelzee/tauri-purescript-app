// output/Data.Unit/foreign.js
var unit = void 0;

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};

// output/Data.Semigroup/index.js
var semigroupUnit = {
  append: function(v) {
    return function(v1) {
      return unit;
    };
  }
};
var append = function(dict) {
  return dict.append;
};

// output/Control.Apply/index.js
var apply = function(dict) {
  return dict.apply;
};
var lift2 = function(dictApply) {
  var apply1 = apply(dictApply);
  var map3 = map(dictApply.Functor0());
  return function(f) {
    return function(a) {
      return function(b) {
        return apply1(map3(f)(a))(b);
      };
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var liftA1 = function(dictApplicative) {
  var apply2 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply2(pure1(f))(a);
    };
  };
};

// output/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Maybe/index.js
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();

// output/Data.Monoid/index.js
var monoidUnit = {
  mempty: unit,
  Semigroup0: function() {
    return semigroupUnit;
  }
};
var mempty = function(dict) {
  return dict.mempty;
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Bind/index.js
var bind = function(dict) {
  return dict.bind;
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind2 = bind(dictMonad.Bind1());
  var pure2 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind2(f)(function(f$prime) {
        return bind2(a)(function(a$prime) {
          return pure2(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name14, moduleName, init) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2) return val;
    if (state2 === 1) throw new ReferenceError(name14 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
var lift22 = /* @__PURE__ */ lift2(applyEffect);
var semigroupEffect = function(dictSemigroup) {
  return {
    append: lift22(append(dictSemigroup))
  };
};
var monoidEffect = function(dictMonoid) {
  var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
  return {
    mempty: pureE(mempty(dictMonoid)),
    Semigroup0: function() {
      return semigroupEffect1;
    }
  };
};

// output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};

// output/Promise.Internal/foreign.js
function then_(k, p) {
  return p.then(k);
}
function resolve(a) {
  return Promise.resolve(a);
}

// output/Promise/index.js
var then_2 = function() {
  return function(k) {
    return function(p) {
      return function() {
        return then_(mkEffectFn1(k), p);
      };
    };
  };
};
var resolve2 = function() {
  return resolve;
};

// node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
function __classPrivateFieldGet(receiver, state2, kind2, f) {
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind2 === "m" ? f : kind2 === "a" ? f.call(receiver) : f ? f.value : state2.get(receiver);
}
function __classPrivateFieldSet(receiver, state2, value12, kind2, f) {
  if (kind2 === "m") throw new TypeError("Private method is not writable");
  if (kind2 === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind2 === "a" ? f.call(receiver, value12) : f ? f.value = value12 : state2.set(receiver, value12), value12;
}

// node_modules/@tauri-apps/api/core.js
var _Channel_onmessage;
var _Channel_nextMessageId;
var _Channel_pendingMessages;
var _Resource_rid;
var SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
function transformCallback(callback, once = false) {
  return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
var Channel = class {
  constructor() {
    this.__TAURI_CHANNEL_MARKER__ = true;
    _Channel_onmessage.set(this, () => {
    });
    _Channel_nextMessageId.set(this, 0);
    _Channel_pendingMessages.set(this, {});
    this.id = transformCallback(({ message, id: id2 }) => {
      if (id2 === __classPrivateFieldGet(this, _Channel_nextMessageId, "f")) {
        __classPrivateFieldSet(this, _Channel_nextMessageId, id2 + 1, "f");
        __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message);
        const pendingMessageIds = Object.keys(__classPrivateFieldGet(this, _Channel_pendingMessages, "f"));
        if (pendingMessageIds.length > 0) {
          let nextId = id2 + 1;
          for (const pendingId of pendingMessageIds.sort()) {
            if (parseInt(pendingId) === nextId) {
              const message2 = __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[pendingId];
              delete __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[pendingId];
              __classPrivateFieldGet(this, _Channel_onmessage, "f").call(this, message2);
              nextId += 1;
            } else {
              break;
            }
          }
          __classPrivateFieldSet(this, _Channel_nextMessageId, nextId, "f");
        }
      } else {
        __classPrivateFieldGet(this, _Channel_pendingMessages, "f")[id2.toString()] = message;
      }
    });
  }
  set onmessage(handler) {
    __classPrivateFieldSet(this, _Channel_onmessage, handler, "f");
  }
  get onmessage() {
    return __classPrivateFieldGet(this, _Channel_onmessage, "f");
  }
  [(_Channel_onmessage = /* @__PURE__ */ new WeakMap(), _Channel_nextMessageId = /* @__PURE__ */ new WeakMap(), _Channel_pendingMessages = /* @__PURE__ */ new WeakMap(), SERIALIZE_TO_IPC_FN)]() {
    return `__CHANNEL__:${this.id}`;
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
async function invoke(cmd, args = {}, options2) {
  return window.__TAURI_INTERNALS__.invoke(cmd, args, options2);
}
_Resource_rid = /* @__PURE__ */ new WeakMap();

// output/Tauri/foreign.js
var greet = async (name14) => invoke("greet", { name: name14 });

// output/Web.DOM.Element/foreign.js
var getProp = function(name14) {
  return function(doctype) {
    return doctype[name14];
  };
};
var _namespaceURI = getProp("namespaceURI");
var _prefix = getProp("prefix");
var localName = getProp("localName");
var tagName = getProp("tagName");

// output/Data.Nullable/foreign.js
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output/Data.Nullable/index.js
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Web.DOM.ParentNode/foreign.js
var getEffProp = function(name14) {
  return function(node) {
    return function() {
      return node[name14];
    };
  };
};
var children = getEffProp("children");
var _firstElementChild = getEffProp("firstElementChild");
var _lastElementChild = getEffProp("lastElementChild");
var childElementCount = getEffProp("childElementCount");
function _querySelector(selector) {
  return function(node) {
    return function() {
      return node.querySelector(selector);
    };
  };
}

// output/Web.DOM.ParentNode/index.js
var map2 = /* @__PURE__ */ map(functorEffect);
var querySelector = function(qs) {
  var $2 = map2(toMaybe);
  var $3 = _querySelector(qs);
  return function($4) {
    return $2($3($4));
  };
};

// output/Web.Internal.FFI/foreign.js
function _unsafeReadProtoTagged(nothing, just, name14, value12) {
  if (typeof window !== "undefined") {
    var ty = window[name14];
    if (ty != null && value12 instanceof ty) {
      return just(value12);
    }
  }
  var obj = value12;
  while (obj != null) {
    var proto = Object.getPrototypeOf(obj);
    var constructorName = proto.constructor.name;
    if (constructorName === name14) {
      return just(value12);
    } else if (constructorName === "Object") {
      return nothing;
    }
    obj = proto;
  }
  return nothing;
}

// output/Web.Internal.FFI/index.js
var unsafeReadProtoTagged = function(name14) {
  return function(value12) {
    return _unsafeReadProtoTagged(Nothing.value, Just.create, name14, value12);
  };
};

// output/Web.DOM.Element/index.js
var toNode = unsafeCoerce2;

// output/Web.DOM.Node/foreign.js
var getEffProp2 = function(name14) {
  return function(node) {
    return function() {
      return node[name14];
    };
  };
};
var baseURI = getEffProp2("baseURI");
var _ownerDocument = getEffProp2("ownerDocument");
var _parentNode = getEffProp2("parentNode");
var _parentElement = getEffProp2("parentElement");
var childNodes = getEffProp2("childNodes");
var _firstChild = getEffProp2("firstChild");
var _lastChild = getEffProp2("lastChild");
var _previousSibling = getEffProp2("previousSibling");
var _nextSibling = getEffProp2("nextSibling");
var _nodeValue = getEffProp2("nodeValue");
var textContent = getEffProp2("textContent");
function setTextContent(value12) {
  return function(node) {
    return function() {
      node.textContent = value12;
    };
  };
}

// output/Web.Event.EventTarget/foreign.js
function eventListener(fn) {
  return function() {
    return function(event) {
      return fn(event)();
    };
  };
}
function addEventListener(type) {
  return function(listener) {
    return function(useCapture) {
      return function(target5) {
        return function() {
          return target5.addEventListener(type, listener, useCapture);
        };
      };
    };
  };
}

// output/Web.HTML/foreign.js
var windowImpl = function() {
  return window;
};

// output/Web.HTML.HTMLDocument/index.js
var toParentNode = unsafeCoerce2;
var toEventTarget = unsafeCoerce2;
var fromParentNode = /* @__PURE__ */ unsafeReadProtoTagged("HTMLDocument");

// output/Web.HTML.Window/foreign.js
function document(window2) {
  return function() {
    return window2.document;
  };
}

// output/Main/index.js
var resolve3 = /* @__PURE__ */ resolve2();
var then_3 = /* @__PURE__ */ then_2();
var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
var greet$prime = greet;
var main = function __do() {
  var w = windowImpl();
  var doc = document(w)();
  var parent2 = toParentNode(doc);
  var node$prime = querySelector("#greet-form")(parent2)();
  var v = new Tuple(node$prime, fromParentNode(parent2));
  if (v.value0 instanceof Just && v.value1 instanceof Just) {
    var greetEffect$prime = function(n) {
      return function(name14) {
        return function __do2() {
          setTextContent(name14)(n)();
          return resolve3(unit);
        };
      };
    };
    var greetEffect = function(n) {
      return function(v1) {
        return function __do2() {
          then_3(greetEffect$prime(n))(greet$prime)();
          return mempty2();
        };
      };
    };
    var node = toNode(v.value0.value0);
    var eventTarget = toEventTarget(v.value1.value0);
    var eventListener_ = eventListener(greetEffect(node))();
    return addEventListener("submit")(eventListener_)(true)(eventTarget)();
  }
  ;
  return mempty2();
};
export {
  greet$prime,
  main
};
