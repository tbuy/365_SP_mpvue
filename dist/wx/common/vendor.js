global.webpackJsonpMpvue([0],[
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;

  if (typeof wx !== 'undefined') {
    global.mpvue = wx;
    global.mpvuePlatform = 'wx';
  } else if (typeof swan !== 'undefined') {
    global.mpvue = swan;
    global.mpvuePlatform = 'swan';
  }else if (typeof tt !== 'undefined') {
    global.mpvue = tt;
    global.mpvuePlatform = 'tt';
  }else if (typeof my !== 'undefined') {
    global.mpvue = my;
    global.mpvuePlatform = 'my';
  }
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated', 'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap',
  'attached',
  'ready',
  'moved',
  'detached'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = ['mpvue-runtime'].join();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  // } else if (typeof MutationObserver !== 'undefined' && (
  //   isNative(MutationObserver) ||
  //   // PhantomJS and iOS 7.x
  //   MutationObserver.toString() === '[object MutationObserverConstructor]'
  // )) {
  //   // use MutationObserver where native Promise is not available,
  //   // e.g. PhantomJS IE11, iOS7, Android 4.4
  //   var counter = 1
  //   var observer = new MutationObserver(nextTickHandler)
  //   var textNode = document.createTextNode(String(counter))
  //   observer.observe(textNode, {
  //     characterData: true
  //   })
  //   timerFunc = () => {
  //     counter = (counter + 1) % 2
  //     textNode.data = String(counter)
  //   }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value, key) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  if (key) {
    this.key = key;
  }
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData, key) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value, key);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val, undefined, key);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, undefined, key);
      dep.notify();

      if (!obj.__keyPath) {
        def(obj, '__keyPath', {}, false);
      }
      obj.__keyPath[key] = true;
      if (newVal instanceof Object && !(newVal instanceof Array)) {
        // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
        def(newVal, '__newReference', true, false);
      }
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  // Vue.set 添加对象属性，渲染时候把 val 传给小程序渲染
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  target.__keyPath[key] = true;
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  // Vue.del 删除对象属性，渲染时候把这个属性设置为 undefined
  target.__keyPath[key] = 'del';
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var mark;
var measure;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';
Vue$3.mpvueVersion = '2.0.6';

/* globals renderer */



var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }



function getComKey (vm) {
  return vm && vm.$attrs ? vm.$attrs['mpcomid'] : '0'
}

// 用于小程序的 event type 到 web 的 event
var eventTypeMap = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

/*  */

// import { namespaceMap } from 'mp/util/index'

var obj = {};

function createElement$1 (tagName, vnode) {
  return obj
}

function createElementNS (namespace, tagName) {
  return obj
}

function createTextNode (text) {
  return obj
}

function createComment (text) {
  return obj
}

function insertBefore (parentNode, newNode, referenceNode) {}

function removeChild (node, child) {}

function appendChild (node, child) {}

function parentNode (node) {
  return obj
}

function nextSibling (node) {
  return obj
}

function tagName (node) {
  return 'div'
}

function setTextContent (node, text) {
  return obj
}

function setAttribute (node, key, val) {
  return obj
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

// import baseModules from 'core/vdom/modules/index'
// const platformModules = []
// import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// const modules = platformModules.concat(baseModules)
var modules = [ref];

var corePatch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function patch () {
  corePatch.apply(this, arguments);
  this.$updateDataToMP();
}

function callHook$1 (vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  } else if (hook === 'onPageNotFound' && handlers) {
    handlers = [handlers];
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        ret = handlers[i].call(vm, params);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) { return callHook$1(v, hook, params); });
  }

  return ret
}

// mpType 小程序实例的类型，可能的值是 'app', 'page'
// rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
function getGlobalData (app, rootVueVM) {
  var mp = rootVueVM.$mp;
  if (app && app.globalData) {
    mp.appOptions = app.globalData.appOptions;
  }
}

// 格式化 properties 属性，并给每个属性加上 observer 方法

// properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
// properties: {
//   paramA: Number,
//   myProperty: { // 属性名
//     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
//     observer: function(newVal, oldVal, changedPath) {
//        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
//     }
//   },
// }

// props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
// props: {
//   // 基础的类型检查 (`null` 匹配任何类型)
//   propA: Number,
//   // 多个可能的类型
//   propB: [String, Number],
//   // 必填的字符串
//   propC: {
//     type: String,
//     required: true
//   },
//   // 带有默认值的数字
//   propD: {
//     type: Number,
//     default: 100
//   },
//   // 带有默认值的对象
//   propE: {
//     type: Object,
//     // 对象或数组且一定会从一个工厂函数返回默认值
//     default: function () {
//       return { message: 'hello' }
//     }
//   },
//   // 自定义验证函数
//   propF: {
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['success', 'warning', 'danger'].indexOf(value) !== -1
//     }
//   }
// }

// core/util/options
function normalizeProps$1 (props, res, vm) {
  if (!props) { return }
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }

  // fix vueProps to properties
  for (var key$1 in res) {
    if (res.hasOwnProperty(key$1)) {
      var item = res[key$1];
      if (item.default) {
        item.value = item.default;
      }
      var oldObserver = item.observer;
      item.observer = function (newVal, oldVal) {
        vm[name] = newVal;
        // 先修改值再触发原始的 observer，跟 watch 行为保持一致
        if (typeof oldObserver === 'function') {
          oldObserver.call(vm, newVal, oldVal);
        }
      };
    }
  }

  return res
}

function normalizeProperties (vm) {
  var properties = vm.$options.properties;
  var vueProps = vm.$options.props;
  var res = {};

  normalizeProps$1(properties, res, vm);
  normalizeProps$1(vueProps, res, vm);

  return res
}

/**
 * 把 properties 中的属性 proxy 到 vm 上
 */
function initMpProps (vm) {
  var mpProps = vm._mpProps = {};
  var keys = Object.keys(vm.$options.properties || {});
  keys.forEach(function (key) {
    if (!(key in vm)) {
      proxy(vm, '_mpProps', key);
      mpProps[key] = undefined; // for observe
    }
  });
  observe(mpProps, true);
}

function initMP (mpType, next) {
  var rootVueVM = this.$root;
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {};
  }

  var mp = rootVueVM.$mp;

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    // 处理子组件的小程序生命周期
    if (mpType === 'app') {
      callHook$1(this, 'onLaunch', mp.appOptions);
    } else {
      callHook$1(this, 'onLoad', mp.query);
      callHook$1(this, 'onReady');
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType;
  mp.status = 'register';

  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch: function onLaunch (options) {
        if ( options === void 0 ) options = {};

        mp.app = this;
        mp.status = 'launch';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onLaunch', options);
        next();
      },

      // Do something when app show.
      onShow: function onShow (options) {
        if ( options === void 0 ) options = {};

        mp.status = 'show';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onShow', options);
      },

      // Do something when app hide.
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
      },

      onError: function onError (err) {
        callHook$1(rootVueVM, 'onError', err);
      },

      onPageNotFound: function onPageNotFound (err) {
        callHook$1(rootVueVM, 'onPageNotFound', err);
      }
    });
  } else if (mpType === 'component') {
    initMpProps(rootVueVM);

    global.Component({
      // 小程序原生的组件属性
      properties: normalizeProperties(rootVueVM),
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created: function created () {
        mp.status = 'created';
        mp.page = this;
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached: function attached () {
        mp.status = 'attached';
        callHook$1(rootVueVM, 'attached');
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready: function ready () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'ready');
        next();

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved: function moved () {
        callHook$1(rootVueVM, 'moved');
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached: function detached () {
        mp.status = 'detached';
        callHook$1(rootVueVM, 'detached');
      }
    });
  } else {
    var app = global.getApp();
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad: function onLoad (query) {
        mp.page = this;
        mp.query = query;
        mp.status = 'load';
        getGlobalData(app, rootVueVM);
        callHook$1(rootVueVM, 'onLoad', query);
      },

      // 生命周期函数--监听页面显示
      onShow: function onShow () {
        mp.page = this;
        mp.status = 'show';
        callHook$1(rootVueVM, 'onShow');

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function onReady () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'onReady');
        next();
      },

      // 生命周期函数--监听页面隐藏
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
        mp.page = null;
      },

      // 生命周期函数--监听页面卸载
      onUnload: function onUnload () {
        mp.status = 'unload';
        callHook$1(rootVueVM, 'onUnload');
        mp.page = null;
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function onPullDownRefresh () {
        callHook$1(rootVueVM, 'onPullDownRefresh');
      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function onReachBottom () {
        callHook$1(rootVueVM, 'onReachBottom');
      },

      // 用户点击右上角分享
      onShareAppMessage: rootVueVM.$options.onShareAppMessage
        ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,

      // Do something when page scroll
      onPageScroll: function onPageScroll (options) {
        callHook$1(rootVueVM, 'onPageScroll', options);
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap: function onTabItemTap (options) {
        callHook$1(rootVueVM, 'onTabItemTap', options);
      }
    });
  }
}

var updateDataTotal = 0; // 总共更新的数据量
function diffLog (updateData) {
  updateData = JSON.stringify(updateData);
  if (!Vue$3._mpvueTraceTimer) {
    Vue$3._mpvueTraceTimer = setTimeout(function () {
      clearTimeout(Vue$3._mpvueTraceTimer);
      updateDataTotal = (updateDataTotal / 1024).toFixed(1);
      console.log('这次操作引发500ms内数据更新量:' + updateDataTotal + 'kb');
      Vue$3._mpvueTraceTimer = 0;
      updateDataTotal = 0;
    }, 500);
  } else if (Vue$3._mpvueTraceTimer) {
    updateData = updateData.replace(/[^\u0000-\u00ff]/g, 'aa'); // 中文占2字节，中文替换成两个字母计算占用空间
    updateDataTotal += updateData.length;
  }
}

var KEY_SEP$1 = '_';

function getDeepData (keyList, viewData) {
  if (keyList.length > 1) {
    var _key = keyList.splice(0, 1);
    var _viewData = viewData[_key];
    if (_viewData) {
      return getDeepData(keyList, _viewData)
    } else {
      return null
    }
  } else {
    if (viewData[keyList[0]]) {
      return viewData[keyList[0]]
    } else {
      return null
    }
  }
}

function compareAndSetDeepData (key, newData, vm, data, forceUpdate) {
  // 比较引用类型数据
  try {
    var keyList = key.split('.');
    // page.__viewData__老版小程序不存在，使用mpvue里绑的data比对
    var oldData = getDeepData(keyList, vm.$root.$mp.page.data);
    if (oldData === null || JSON.stringify(oldData) !== JSON.stringify(newData) || forceUpdate) {
      data[key] = newData;
    } else {
      var keys = Object.keys(oldData);
      keys.forEach(function (_key) {
        var properties = Object.getOwnPropertyDescriptor(oldData, _key);
        if (!properties['get'] && !properties['set']) {
          data[key + '.' + _key] = newData[_key];
        }
      });
    }
  } catch (e) {
    console.log(e, key, newData, vm);
  }
}

function cleanKeyPath (vm) {
  if (vm.__mpKeyPath) {
    Object.keys(vm.__mpKeyPath).forEach(function (_key) {
      delete vm.__mpKeyPath[_key]['__keyPath'];
    });
  }
}

function minifyDeepData (rootKey, originKey, vmData, data, _mpValueSet, vm) {
  try {
    if (vmData instanceof Array) {
       // 数组
      compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data, true);
    } else {
      // Object
      var _keyPathOnThis = {}; // 存储这层对象的keyPath
      if (vmData.__keyPath && !vmData.__newReference) {
        // 有更新列表 ，按照更新列表更新
        _keyPathOnThis = vmData.__keyPath;
        Object.keys(vmData).forEach(function (_key) {
          if (vmData[_key] instanceof Object) {
            // 引用类型 递归
            if (_key === '__keyPath') {
              return
            }
            minifyDeepData(rootKey + '.' + originKey, _key, vmData[_key], data, null, vm);
          } else {
            // 更新列表中的 加入data
            if (_keyPathOnThis[_key] === true) {
              if (originKey) {
                data[rootKey + '.' + originKey + '.' + _key] = vmData[_key];
              } else {
                data[rootKey + '.' + _key] = vmData[_key];
              }
            }
          }
        });
         // 根节点可能有父子引用同一个引用类型数据，依赖树都遍历完后清理
        vm['__mpKeyPath'] = vm['__mpKeyPath'] || {};
        vm['__mpKeyPath'][vmData.__ob__.dep.id] = vmData;
      } else {
        // 没有更新列表
        compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data);
      }
      // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
      def(vmData, '__newReference', false, false);
    }
  } catch (e) {
    console.log(e, rootKey, originKey, vmData, data);
  }
}

function getRootKey (vm, rootKey) {
  if (!vm.$parent.$attrs) {
    rootKey = '$root.0' + KEY_SEP$1 + rootKey;
    return rootKey
  } else {
    rootKey = vm.$parent.$attrs.mpcomid + KEY_SEP$1 + rootKey;
    return getRootKey(vm.$parent, rootKey)
  }
}

function diffData (vm, data) {
  var vmData = vm._data || {};
  var vmProps = vm._props || {};
  var rootKey = '';
  if (!vm.$attrs) {
    rootKey = '$root.0';
  } else {
    rootKey = getRootKey(vm, vm.$attrs.mpcomid);
  }
  Vue$3.nextTick(function () {
    cleanKeyPath(vm);
  });
  // console.log(rootKey)

  // 值类型变量不考虑优化，还是直接更新
  var __keyPathOnThis = vmData.__keyPath || vm.__keyPath || {};
  delete vm.__keyPath;
  delete vmData.__keyPath;
  delete vmProps.__keyPath;
  if (vm._mpValueSet === 'done') {
    // 第二次赋值才进行缩减操作
    Object.keys(vmData).forEach(function (vmDataItemKey) {
      if (vmData[vmDataItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmDataItemKey, vmData[vmDataItemKey], data, vm._mpValueSet, vm);
      } else if (vmData[vmDataItemKey] !== undefined) {
        // _data上的值属性只有要更新的时候才赋值
        if (__keyPathOnThis[vmDataItemKey] === true) {
          data[rootKey + '.' + vmDataItemKey] = vmData[vmDataItemKey];
        }
      }
    });

    Object.keys(vmProps).forEach(function (vmPropsItemKey) {
      if (vmProps[vmPropsItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmPropsItemKey, vmProps[vmPropsItemKey], data, vm._mpValueSet, vm);
      } else if (vmProps[vmPropsItemKey] !== undefined) {
        data[rootKey + '.' + vmPropsItemKey] = vmProps[vmPropsItemKey];
      }
      // _props上的值属性只有要更新的时候才赋值
    });

    // 检查完data和props,最后补上_mpProps & _computedWatchers
    var vmMpProps = vm._mpProps || {};
    var vmComputedWatchers = vm._computedWatchers || {};
    Object.keys(vmMpProps).forEach(function (mpItemKey) {
      data[rootKey + '.' + mpItemKey] = vm[mpItemKey];
    });
    Object.keys(vmComputedWatchers).forEach(function (computedItemKey) {
      data[rootKey + '.' + computedItemKey] = vm[computedItemKey];
    });
    // 更新的时候要删除$root.0:{},否则会覆盖原正确数据
    delete data[rootKey];
  }
  if (vm._mpValueSet === undefined) {
    // 第一次设置数据成功后，标记位置true,再更新到这个节点如果没有keyPath数组认为不需要更新
    vm._mpValueSet = 'done';
  }
  if (Vue$3.config._mpTrace) {
    // console.log('更新VM节点', vm)
    // console.log('实际传到Page.setData数据', data)
    diffLog(data);
  }
}

// 节流方法，性能优化
// 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
// $c === $child
// $k === $comKey

// 新型的被拍平的数据结构
// {
//   $root: {
//     '1-1'{
//       // ... data
//     },
//     '1.2-1': {
//       // ... data1
//     },
//     '1.2-2': {
//       // ... data2
//     }
//   }
// }

var KEY_SEP = '_';

function getVmData (vm) {
  // 确保当前 vm 所有数据被同步
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._props || {}),
    Object.keys(vm._mpProps || {}),
    Object.keys(vm._computedWatchers || {})
  );
  return dataKeys.reduce(function (res, key) {
    res[key] = vm[key];
    return res
  }, {})
}

function getParentComKey (vm, res) {
  if ( res === void 0 ) res = [];

  var ref = vm || {};
  var $parent = ref.$parent;
  if (!$parent) { return res }
  res.unshift(getComKey($parent));
  if ($parent.$parent) {
    return getParentComKey($parent, res)
  }
  return res
}

function formatVmData (vm) {
  var $p = getParentComKey(vm).join(KEY_SEP);
  var $k = $p + ($p ? KEY_SEP : '') + getComKey(vm);

  // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
  // 改动 vue.runtime 所获的的核心能力
  var data = Object.assign(getVmData(vm), { $k: $k, $kk: ("" + $k + KEY_SEP), $p: $p });
  var key = '$root.' + $k;
  var res = {};
  res[key] = data;
  return res
}

function collectVmData (vm, res) {
  if ( res === void 0 ) res = {};

  var vms = vm.$children;
  if (vms && vms.length) {
    vms.forEach(function (v) { return collectVmData(v, res); });
  }
  return Object.assign(res, formatVmData(vm))
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 自动合并 data
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  function later () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  }
  return function (handle, data) {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = args ? [handle, Object.assign(args[1], data)] : [handle, data];
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

// 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
var throttleSetData = throttle(function (handle, data) {
  handle(data);
}, 50);

function getPage (vm) {
  var rootVueVM = vm.$root;
  var ref = rootVueVM.$mp || {};
  var mpType = ref.mpType; if ( mpType === void 0 ) mpType = '';
  var page = ref.page;

  // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
  if (mpType === 'app' || !page || typeof page.setData !== 'function') {
    return
  }
  return page
}

// 优化js变量动态变化时候引起全量更新
// 优化每次 setData 都传递大量新数据
function updateDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = formatVmData(this);
  diffData(this, data);
  throttleSetData(page.setData.bind(page), data);
}

function initDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = collectVmData(this.$root);
  page.setData(data);
}

// 虚拟dom的compid与真实dom的comkey匹配，多层嵌套的先补齐虚拟dom的compid直到完全匹配为止
function isVmKeyMatchedCompkey (k, comkey) {
  if (!k || !comkey) {
    return false
  }
  // 完全匹配 comkey = '1_0_1', k = '1_0_1'
  // 部分匹配 comkey = '1_0_10_1', k = '1_0_10'
  // k + KEY_SEP防止k = '1_0_1'误匹配comkey = '1_0_10_1'
  return comkey === k || comkey.indexOf(k + KEY_SEP$2) === 0
}

function getVM (vm, comkeys) {
  if ( comkeys === void 0 ) comkeys = [];

  var keys = comkeys.slice(1);
  if (!keys.length) { return vm }

  // bugfix #1375: 虚拟dom的compid和真实dom的comkey在组件嵌套时匹配出错，comid会丢失前缀，需要从父节点补充
  var comkey = keys.join(KEY_SEP$2);
  var comidPrefix = '';
  return keys.reduce(function (res, key) {
    var len = res.$children.length;
    for (var i = 0; i < len; i++) {
      var v = res.$children[i];
      var k = getComKey(v);
      if (comidPrefix) {
        k = comidPrefix + KEY_SEP$2 + k;
      }
      // 找到匹配的父节点
      if (isVmKeyMatchedCompkey(k, comkey)) {
        comidPrefix = k;
        res = v;
        return res
      }
    }
    return res
  }, vm)
}

function getHandle (vnode, eventid, eventTypes) {
  if ( eventTypes === void 0 ) eventTypes = [];

  var res = [];
  if (!vnode || !vnode.tag) {
    return res
  }

  var ref = vnode || {};
  var data = ref.data; if ( data === void 0 ) data = {};
  var children = ref.children; if ( children === void 0 ) children = [];
  var componentInstance = ref.componentInstance;
  if (componentInstance) {
    // 增加 slot 情况的处理
    // Object.values 会多增加几行编译后的代码
    Object.keys(componentInstance.$slots).forEach(function (slotKey) {
      var slot = componentInstance.$slots[slotKey];
      var slots = Array.isArray(slot) ? slot : [slot];
      slots.forEach(function (node) {
        res = res.concat(getHandle(node, eventid, eventTypes));
      });
    });
  } else {
    // 避免遍历超出当前组件的 vm
    children.forEach(function (node) {
      res = res.concat(getHandle(node, eventid, eventTypes));
    });
  }

  var attrs = data.attrs;
  var on = data.on;
  if (attrs && on && attrs['eventid'] === eventid) {
    eventTypes.forEach(function (et) {
      var h = on[et];
      if (typeof h === 'function') {
        res.push(h);
      } else if (Array.isArray(h)) {
        res = res.concat(h);
      }
    });
    return res
  }

  return res
}

function getWebEventByMP (e) {
  var type = e.type;
  var timeStamp = e.timeStamp;
  var touches = e.touches;
  var detail = e.detail; if ( detail === void 0 ) detail = {};
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget; if ( currentTarget === void 0 ) currentTarget = {};
  var x = detail.x;
  var y = detail.y;
  var event = {
    mp: e,
    type: type,
    timeStamp: timeStamp,
    x: x,
    y: y,
    target: Object.assign({}, target, detail),
    currentTarget: currentTarget,
    stopPropagation: noop,
    preventDefault: noop
  };

  if (touches && touches.length) {
    Object.assign(event, touches[0]);
    event.touches = touches;
  }
  return event
}

var KEY_SEP$2 = '_';
function handleProxyWithVue (e) {
  var rootVueVM = this.$root;
  var type = e.type;
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget;
  var ref = currentTarget || target;
  var dataset = ref.dataset; if ( dataset === void 0 ) dataset = {};
  var comkey = dataset.comkey; if ( comkey === void 0 ) comkey = '';
  var eventid = dataset.eventid;
  var vm = getVM(rootVueVM, comkey.split(KEY_SEP$2));

  if (!vm) {
    return
  }

  var webEventTypes = eventTypeMap[type] || [type];
  var handles = getHandle(vm._vnode, eventid, webEventTypes);

  // TODO, enevt 还需要处理更多
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
  if (handles.length) {
    var event = getWebEventByMP(e);
    if (handles.length === 1) {
      var result = handles[0](event);
      return result
    }
    handles.forEach(function (h) { return h(event); });
  }
}

// for platforms
// import config from 'core/config'
// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  var this$1 = this;

  // el = el && inBrowser ? query(el) : undefined
  // return mountComponent(this, el, hydrating)

  // 初始化小程序生命周期相关
  var options = this.$options;

  if (options && (options.render || options.mpType)) {
    var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
    return this._initMP(mpType, function () {
      return mountComponent(this$1, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
};

// for mp
Vue$3.prototype._initMP = initMP;

Vue$3.prototype.$updateDataToMP = updateDataToMP;
Vue$3.prototype._initDataToMP = initDataToMP;

Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue;

/*  */

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(42)('wks');
var uid = __webpack_require__(43);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loginService__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__otherService__ = __webpack_require__(112);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__loginService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__otherService__["a"]; });





/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(12);
var has = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(22)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(51);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return types; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex_persistedstate__ = __webpack_require__(68);


var _mutations;





__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */]);

var types = {
  SET_USER_INFO: 'userInfo/SET_USER_INFO',
  SET_LOGIN_INFO: 'userInfo/SET_LOGIN_INFO',
  SET_IS_LOGIN: 'userInfo/SET_IS_LOGIN',
  SET_AD: 'ad/SET_AD'
};
var store = new __WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */].Store({
  state: {
    userInfo: {},
    loginInfo: {},
    isLogin: false,
    ad: []
  },
  mutations: (_mutations = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.SET_USER_INFO, function (state, data) {
    state.userInfo = data;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.SET_LOGIN_INFO, function (state, data) {
    state.loginInfo = data;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.SET_IS_LOGIN, function (state, data) {
    state.isLogin = data;
  }), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_mutations, types.SET_AD, function (state, data) {
    state.ad = data;
  }), _mutations),
  plugins: [Object(__WEBPACK_IMPORTED_MODULE_3_vuex_persistedstate__["a" /* default */])({
    storage: {
      getItem: function getItem(key) {
        return wx.getStorageSync(key);
      },
      setItem: function setItem(key, val) {
        return wx.setStorageSync(key, val);
      },
      removeItem: function removeItem() {}
    }
  })]
});



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var createDesc = __webpack_require__(24);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(66);
var toPrimitive = __webpack_require__(67);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(17);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_70be81cb_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__ = __webpack_require__(106);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_70be81cb_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/card.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] card.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70be81cb", Component.options)
  } else {
    hotAPI.reload("data-v-70be81cb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export formatTime */
function formatNumber(n) {
  var str = n.toString();
  return str[1] ? str : '0' + str;
}

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var t1 = [year, month, day].map(formatNumber).join('/');
  var t2 = [hour, minute, second].map(formatNumber).join(':');

  return t1 + ' ' + t2;
}
//格式化时间搓
function formatDate(time) {
  var date = getDate(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
//截取字符串
function wordSubstring(val, length) {
  return val.length > length ? val.substring(0, length - 1) + "..." : val;
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 800,
    mask: true
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  formatNumber: formatNumber,
  formatTime: formatTime,
  formatDate: formatDate,
  wordSubstring: wordSubstring,
  showToast: showToast
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapState; });
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.1.2
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (true) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if (true) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ("development" !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if ("development" !== 'production' && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if ("development" !== 'production' && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if ("development" !== 'production' && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if ("development" !== 'production' && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(37)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(73);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(41);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys');
var uid = __webpack_require__(43);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(13).f;
var has = __webpack_require__(18);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(17);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_scroll_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_57494a48_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_scroll_vue__ = __webpack_require__(109);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(107)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_scroll_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_57494a48_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_scroll_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/scroll.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] scroll.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57494a48", Component.options)
  } else {
    hotAPI.reload("data-v-57494a48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return typeof global !== 'undefined' ? global : this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(75)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(39)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(76);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(33);
var getPrototypeOf = __webpack_require__(83);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(80);
var enumBugKeys = __webpack_require__(44);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(29) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(49);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(17);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var invoke = __webpack_require__(97);
var html = __webpack_require__(45);
var cel = __webpack_require__(23);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(35);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

var apiPath = 'https://user.sy365.cn';

module.exports = {
  //获取验证码 get {phone}
  getCaptcha: apiPath + "/staff/getCaptcha",

  //登录 post {phone,captcha}
  login: apiPath + "/staff/login",

  //获取订单列表(懒加载) get {lastId,pageNumber}
  getOrderList: apiPath + "/staff/order/getOrderList",

  //获取单个订单信息 get {id}
  getOrder: apiPath + "/staff/order/getOrder",

  //获取视频列表(懒加载) get {lastId,pageNumber}
  getVideoList: apiPath + "/staff/common/getVideoList",

  //获取单个视频 get {id}
  getVideo: apiPath + "/staff/common/getVideo",

  //广告位
  getAdPosition: apiPath + "/staff/common/getAdPosition"
};

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

var Fly = __webpack_require__(111);
var fly = new Fly();

fly.interceptors.request.use(function (request) {
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    request.headers = {
        "X-Tag": "flyio",
        'Content-Type': 'application/json'
    };

    return request;
});

fly.interceptors.response.use(function (response) {
    if (response.data.code == 1) {
        wx.hideLoading();

        wx.showToast({
            title: response.data.message,
            icon: "none",
            duration: 800,
            mask: true
        });
    } else {
        wx.hideLoading();
        return response.data.data;
    }
}, function (err) {
    wx.hideLoading();
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(err);
});

/* harmony default export */ __webpack_exports__["a"] = (fly);

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(13).f });


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(22)(function () {
  return Object.defineProperty(__webpack_require__(23)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var r=function(r){return function(r){return!!r&&"object"==typeof r}(r)&&!function(r){var t=Object.prototype.toString.call(r);return"[object RegExp]"===t||"[object Date]"===t||function(r){return r.$$typeof===e}(r)}(r)},e="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function t(r,e){return!1!==e.clone&&e.isMergeableObject(r)?c(Array.isArray(r)?[]:{},r,e):r}function n(r,e,n){return r.concat(e).map(function(r){return t(r,n)})}function o(r){return Object.keys(r).concat(function(r){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(r).filter(function(e){return r.propertyIsEnumerable(e)}):[]}(r))}function u(r,e){try{return e in r}catch(r){return!1}}function c(e,i,a){(a=a||{}).arrayMerge=a.arrayMerge||n,a.isMergeableObject=a.isMergeableObject||r,a.cloneUnlessOtherwiseSpecified=t;var f=Array.isArray(i);return f===Array.isArray(e)?f?a.arrayMerge(e,i,a):function(r,e,n){var i={};return n.isMergeableObject(r)&&o(r).forEach(function(e){i[e]=t(r[e],n)}),o(e).forEach(function(o){(function(r,e){return u(r,e)&&!(Object.hasOwnProperty.call(r,e)&&Object.propertyIsEnumerable.call(r,e))})(r,o)||(i[o]=u(r,o)&&n.isMergeableObject(e[o])?function(r,e){if(!e.customMerge)return c;var t=e.customMerge(r);return"function"==typeof t?t:c}(o,n)(r[o],e[o],n):t(e[o],n))}),i}(e,i,a):t(i,a)}c.all=function(r,e){if(!Array.isArray(r))throw new Error("first argument should be an array");return r.reduce(function(r,t){return c(r,t,e)},{})};var i=c;function a(r,e,t){return void 0===(r=(e.split?e.split("."):e).reduce(function(r,e){return r&&r[e]},r))?t:r}/* harmony default export */ __webpack_exports__["a"] = (function(r,e,t){function n(r,e,t){try{return(t=e.getItem(r))&&void 0!==t?JSON.parse(t):void 0}catch(r){}}if(e=(r=r||{}).storage||window&&window.localStorage,t=r.key||"vuex",!function(r){try{return r.setItem("@@",1),r.removeItem("@@"),!0}catch(r){}return!1}(e))throw new Error("Invalid storage instance given");var o,u=function(){return a(r,"getState",n)(t,e)};return r.fetchBeforeUse&&(o=u()),function(n){r.fetchBeforeUse||(o=u()),"object"==typeof o&&null!==o&&(n.replaceState(i(n.state,o,{arrayMerge:r.arrayMerger||function(r,e){return e},clone:!1})),(r.rehydrated||function(){})(n)),(r.subscriber||function(r){return function(e){return r.subscribe(e)}})(n)(function(n,o){(r.filter||function(){return!0})(n)&&(r.setState||function(r,e,t){return t.setItem(r,JSON.stringify(e))})(t,(r.reducer||function(r,e){return 0===e.length?r:e.reduce(function(e,t){return function(r,e,t,n){return(e=e.split?e.split("."):e).slice(0,-1).reduce(function(r,e){return r[e]=r[e]||{}},r)[e.pop()]=t,r}(e,t,a(r,t))},{})})(o,r.paths||[]),e)})}});
//# sourceMappingURL=vuex-persistedstate.es.js.map


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(84);
module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(78);
var descriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(33);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(79);
var enumBugKeys = __webpack_require__(44);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(23)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(45).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(40);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);
var toIObject = __webpack_require__(30);
var arrayIndexOf = __webpack_require__(81)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(30);
var toLength = __webpack_require__(31);
var toAbsoluteIndex = __webpack_require__(82);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(18);
var toObject = __webpack_require__(34);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(14);
var $export = __webpack_require__(6);
var toObject = __webpack_require__(34);
var call = __webpack_require__(46);
var isArrayIter = __webpack_require__(47);
var toLength = __webpack_require__(31);
var createProperty = __webpack_require__(85);
var getIterFn = __webpack_require__(48);

$export($export.S + $export.F * !__webpack_require__(50)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(13);
var createDesc = __webpack_require__(24);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(87);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
__webpack_require__(38);
__webpack_require__(90);
__webpack_require__(94);
__webpack_require__(102);
__webpack_require__(103);
module.exports = __webpack_require__(4).Promise;


/***/ }),
/* 89 */
/***/ (function(module, exports) {



/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
var global = __webpack_require__(0);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(92);
var step = __webpack_require__(93);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(30);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(39)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var global = __webpack_require__(0);
var ctx = __webpack_require__(14);
var classof = __webpack_require__(49);
var $export = __webpack_require__(6);
var isObject = __webpack_require__(15);
var aFunction = __webpack_require__(17);
var anInstance = __webpack_require__(95);
var forOf = __webpack_require__(96);
var speciesConstructor = __webpack_require__(52);
var task = __webpack_require__(53).set;
var microtask = __webpack_require__(98)();
var newPromiseCapabilityModule = __webpack_require__(35);
var perform = __webpack_require__(54);
var userAgent = __webpack_require__(99);
var promiseResolve = __webpack_require__(55);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(100)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(33)($Promise, PROMISE);
__webpack_require__(101)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(50)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(46);
var isArrayIter = __webpack_require__(47);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(31);
var getIterFn = __webpack_require__(48);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(53).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var dP = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(6);
var core = __webpack_require__(4);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(52);
var promiseResolve = __webpack_require__(55);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(35);
var perform = __webpack_require__(54);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 104 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card"
  }, [_c('div', {
    staticClass: "card-item"
  }, [_vm._t("default", null, {
    mpcomid: '0'
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-70be81cb", esExports)
  }
}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      height: 0
    };
  },

  methods: {
    loadingMore: function loadingMore() {
      this.$emit("loadingMore");
    }
  },
  mounted: function mounted() {
    var _this = this;

    wx.getSystemInfo({
      success: function success(res) {
        _this.height = res.windowHeight;
      }
    });
  }
});

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroll-view', {
    style: ({
      height: _vm.height + 'px'
    }),
    attrs: {
      "scroll-y": "true",
      "eventid": '0'
    },
    on: {
      "scrolltolower": _vm.loadingMore
    }
  }, [_vm._t("default", null, {
    mpcomid: '0'
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57494a48", esExports)
  }
}

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiPath__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiPath___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__apiPath__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(21);





//用户授权获取微信信息
function getUserInfo(data) {
    __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_LOGIN_INFO, {
        encryptedData: data.encryptedData,
        iv: data.iv,
        rawData: data.rawData,
        signature: data.signature
    });
}
//登录
function login(phone, captcha) {
    wx.login({
        success: function success(loginRes) {
            if (loginRes.code) {
                /**
                 * 服务器登录接口
                 * phone 手机号
                 * captcha 验证码
                 * code 临时登录凭证
                 * rawData 用户非敏感信息
                 * signature 签名
                 * encryptedData 用户敏感信息
                 * iv 解密算法的向量
                 */
                __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.login, {
                    phone: phone,
                    captcha: captcha,
                    code: loginRes.code,
                    rawData: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].state.loginInfo.rawData,
                    signature: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].state.loginInfo.signature,
                    encryptedData: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].state.loginInfo.encryptedData,
                    iv: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].state.loginInfo.iv
                }).then(function (res) {
                    if (res.id) {
                        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_USER_INFO, {
                            name: res.name,
                            phone: res.phone,
                            icon: res.icon,
                            id: res.id
                        });
                        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_IS_LOGIN, true);
                    }
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].showToast('登录失败2');
            }
        },
        fail: function fail(err) {
            __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].showToast('登录失败3');
        }
    });
}

function logout() {
    __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_USER_INFO, {});
    __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_IS_LOGIN, false);
    __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_LOGIN_INFO, {});
}

//获取验证码
function getCaptcha(phone, fn) {
    __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getCaptcha, {
        phone: phone
    }).then(function (res) {
        fn();
    });
}

/* harmony default export */ __webpack_exports__["a"] = ({
    getUserInfo: getUserInfo,
    getCaptcha: getCaptcha,
    login: login,
    logout: logout
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + ('%5B' + i + '%5D'));
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    var AjaxEngine = function () {
        function AjaxEngine() {
            _classCallCheck(this, AjaxEngine);

            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0; // 0 stands for no timeout
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _createClass(AjaxEngine, [{
            key: "_call",
            value: function _call(name) {
                this[name] && this[name].apply(this, [].splice.call(arguments, 1));
            }
        }, {
            key: "_changeReadyState",
            value: function _changeReadyState(state) {
                this.readyState = state;
                this._call("onreadystatechange");
            }
        }, {
            key: "open",
            value: function open(method, url) {
                this.method = method;
                if (!url) {
                    url = location.href;
                } else {
                    url = util.trim(url);
                    if (url.indexOf("http") !== 0) {
                        // Normalize the request url
                        if (isBrowser) {
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }
                }
                this.responseURL = url;
                this._changeReadyState(1);
            }
        }, {
            key: "send",
            value: function send(arg) {
                var _this = this;

                arg = arg || null;
                var self = this;
                if (adapter) {
                    var request = {
                        method: self.method,
                        url: self.responseURL,
                        headers: self.requestHeaders || {},
                        body: arg
                    };
                    util.merge(request, self._options || {});
                    if (request.method === "GET") {
                        request.body = null;
                    }
                    self._changeReadyState(3);
                    var timer = void 0;
                    self.timeout = self.timeout || 0;
                    if (self.timeout > 0) {
                        timer = setTimeout(function () {
                            if (self.readyState === 3) {
                                _this._call("onloadend");
                                self._changeReadyState(0);
                                self._call("ontimeout");
                            }
                        }, self.timeout);
                    }
                    request.timeout = self.timeout;
                    adapter(request, function (response) {

                        function getAndDelete(key) {
                            var t = response[key];
                            delete response[key];
                            return t;
                        }

                        // If the request has already timeout, return
                        if (self.readyState !== 3) return;
                        clearTimeout(timer);

                        // Make sure the type of status is integer
                        self.status = getAndDelete("statusCode") - 0;

                        var responseText = getAndDelete("responseText");
                        var statusMessage = getAndDelete("statusMessage");

                        // Network error, set the status code 0
                        if (!self.status) {
                            self.statusText = responseText;
                            self._call("onerror", { msg: statusMessage });
                        } else {
                            // Parsing the response headers to array in a object,  because
                            // there may be multiple values with the same header name
                            var responseHeaders = getAndDelete("headers");
                            var headers = {};
                            for (var field in responseHeaders) {
                                var value = responseHeaders[field];
                                var key = field.toLowerCase();
                                // Is array
                                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                    headers[key] = value;
                                } else {
                                    headers[key] = headers[key] || [];
                                    headers[key].push(value);
                                }
                            }
                            var cookies = headers["set-cookie"];
                            if (isBrowser && cookies) {
                                cookies.forEach(function (e) {
                                    // Remove the http-Only property of the  cookie
                                    // so that JavaScript can operate it.
                                    document.cookie = e.replace(/;\s*httpOnly/ig, "");
                                });
                            }
                            self.responseHeaders = headers;
                            // Set the fields of engine from response
                            self.statusText = statusMessage || "";
                            self.response = self.responseText = responseText;
                            self._response = response;
                            self._changeReadyState(4);
                            self._call("onload");
                        }
                        self._call("onloadend");
                    });
                } else {
                    console.error("Ajax require adapter");
                }
            }
        }, {
            key: "setRequestHeader",
            value: function setRequestHeader(key, value) {
                this.requestHeaders[util.trim(key)] = value;
            }
        }, {
            key: "getResponseHeader",
            value: function getResponseHeader(key) {
                return (this.responseHeaders[key.toLowerCase()] || "").toString() || null;
            }
        }, {
            key: "getAllResponseHeaders",
            value: function getAllResponseHeaders() {
                var str = "";
                for (var key in this.responseHeaders) {
                    str += key + ":" + this.getResponseHeader(key) + "\r\n";
                }
                return str || null;
            }
        }, {
            key: "abort",
            value: function abort(msg) {
                this._changeReadyState(0);
                this._call("onerror", { msg: msg });
                this._call("onloadend");
            }
        }], [{
            key: "setAdapter",
            value: function setAdapter(requestAdapter) {
                adapter = requestAdapter;
            }
        }]);

        return AjaxEngine;
    }();

    return AjaxEngine;
}

// learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = EngineWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve = void 0;
            var reject = void 0;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (needQuery && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (needQuery && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || needQuery)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        try {
                            // The xhr of IE9 has not response field
                            var response = engine.response || engine.responseText;
                            if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                                response = JSON.parse(response);
                            }

                            var headers = engine.responseHeaders;
                            // In browser
                            if (!headers) {
                                headers = {};
                                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                                items.pop();
                                items.forEach(function (e) {
                                    if (!e) return;
                                    var key = e.split(":")[0];
                                    headers[key] = engine.getResponseHeader(key);
                                });
                            }
                            var status = engine.status;
                            var statusText = engine.statusText;
                            var _data = { data: response, headers: headers, status: status, statusText: statusText };
                            // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                            utils.merge(_data, engine._response);
                            if (status >= 200 && status < 300 || status === 304) {
                                _data.engine = engine;
                                _data.request = options;
                                onresult(responseInterceptor.handler, _data, 0);
                            } else {
                                var e = new Err(statusText, status);
                                e.response = _data;
                                onerror(e);
                            }
                        } catch (e) {
                            onerror(new Err(e.msg, engine.status));
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(needQuery ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, JSON.parse(JSON.stringify(_this.config)));
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
["lock", "unlock", "clear"].forEach(function (e) {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    };
});
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序适配器
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType || undefined,
        header: request.headers,
        data: request.body || {},
        responseType: request.responseType || 'text',
        success: function success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            });
        },
        fail: function fail(res) {
            responseCallback({
                statusCode: res.statusCode || 0,
                statusMessage: res.errMsg
            });
        }
    };
    wx.request(con);
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序入口
var _Fly = __webpack_require__(2);
var EngineWrapper = __webpack_require__(1);
var adapter = __webpack_require__(7);
var wxEngine = EngineWrapper(adapter);
module.exports = function (engine) {
    return new _Fly(engine || wxEngine);
};

/***/ })
/******/ ]);
});

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiPath__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiPath___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__apiPath__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__static_json_area__ = __webpack_require__(114);







//获取视频列表
function getVideoList(lastId, pageNumber) {
    return __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getVideoList, {
        lastId: lastId,
        pageNumber: pageNumber
    });
}

//获取单个视频
function getVideo(id) {
    return __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getVideo, {
        id: id
    });
}
//获取订单列表
function getOrderList(lastId, pageNumber) {
    return __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getOrderList, {
        lastId: lastId,
        pageNumber: pageNumber
    });
}

//获取单个订单信息 
function getOrder(id) {
    return __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getOrder, {
        id: id
    });
}

//广告位
function getAdPosition() {
    return __WEBPACK_IMPORTED_MODULE_2__request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__apiPath___default.a.getAdPosition).then(function (res) {
        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* store */].commit(__WEBPACK_IMPORTED_MODULE_0__store__["b" /* types */].SET_AD, res);
        return res;
    });
}
//电话
function makePhoneCall(phone) {
    wx.makePhoneCall({
        phoneNumber: phone || __WEBPACK_IMPORTED_MODULE_4__config___default.a.phone
    });
}

/* harmony default export */ __webpack_exports__["a"] = ({
    getVideoList: getVideoList,
    getVideo: getVideo,
    getOrderList: getOrderList,
    getOrder: getOrder,
    getAdPosition: getAdPosition,
    makePhoneCall: makePhoneCall
});

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = {
  version: "0.0.0",
  apiPath: '',
  appid: "",
  requireBindMobile: true, // 是否强制绑定手机号码才能使用
  phone: "4006625365" //客服电话
};

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ({
    province_list: {
        110000: '北京市',
        120000: '天津市',
        130000: '河北省',
        140000: '山西省',
        150000: '内蒙古自治区',
        210000: '辽宁省',
        220000: '吉林省',
        230000: '黑龙江省',
        310000: '上海市',
        320000: '江苏省',
        330000: '浙江省',
        340000: '安徽省',
        350000: '福建省',
        360000: '江西省',
        370000: '山东省',
        410000: '河南省',
        420000: '湖北省',
        430000: '湖南省',
        440000: '广东省',
        450000: '广西壮族自治区',
        460000: '海南省',
        500000: '重庆市',
        510000: '四川省',
        520000: '贵州省',
        530000: '云南省',
        540000: '西藏自治区',
        610000: '陕西省',
        620000: '甘肃省',
        630000: '青海省',
        640000: '宁夏回族自治区',
        650000: '新疆维吾尔自治区',
        710000: '台湾省',
        810000: '香港特别行政区',
        820000: '澳门特别行政区',
        900000: '海外',
    },
    city_list: {
        110100: '北京市',
        120100: '天津市',
        130100: '石家庄市',
        130200: '唐山市',
        130300: '秦皇岛市',
        130400: '邯郸市',
        130500: '邢台市',
        130600: '保定市',
        130700: '张家口市',
        130800: '承德市',
        130900: '沧州市',
        131000: '廊坊市',
        131100: '衡水市',
        140100: '太原市',
        140200: '大同市',
        140300: '阳泉市',
        140400: '长治市',
        140500: '晋城市',
        140600: '朔州市',
        140700: '晋中市',
        140800: '运城市',
        140900: '忻州市',
        141000: '临汾市',
        141100: '吕梁市',
        150100: '呼和浩特市',
        150200: '包头市',
        150300: '乌海市',
        150400: '赤峰市',
        150500: '通辽市',
        150600: '鄂尔多斯市',
        150700: '呼伦贝尔市',
        150800: '巴彦淖尔市',
        150900: '乌兰察布市',
        152200: '兴安盟',
        152500: '锡林郭勒盟',
        152900: '阿拉善盟',
        210100: '沈阳市',
        210200: '大连市',
        210300: '鞍山市',
        210400: '抚顺市',
        210500: '本溪市',
        210600: '丹东市',
        210700: '锦州市',
        210800: '营口市',
        210900: '阜新市',
        211000: '辽阳市',
        211100: '盘锦市',
        211200: '铁岭市',
        211300: '朝阳市',
        211400: '葫芦岛市',
        220100: '长春市',
        220200: '吉林市',
        220300: '四平市',
        220400: '辽源市',
        220500: '通化市',
        220600: '白山市',
        220700: '松原市',
        220800: '白城市',
        222400: '延边朝鲜族自治州',
        230100: '哈尔滨市',
        230200: '齐齐哈尔市',
        230300: '鸡西市',
        230400: '鹤岗市',
        230500: '双鸭山市',
        230600: '大庆市',
        230700: '伊春市',
        230800: '佳木斯市',
        230900: '七台河市',
        231000: '牡丹江市',
        231100: '黑河市',
        231200: '绥化市',
        232700: '大兴安岭地区',
        310100: '上海市',
        320100: '南京市',
        320200: '无锡市',
        320300: '徐州市',
        320400: '常州市',
        320500: '苏州市',
        320600: '南通市',
        320700: '连云港市',
        320800: '淮安市',
        320900: '盐城市',
        321000: '扬州市',
        321100: '镇江市',
        321200: '泰州市',
        321300: '宿迁市',
        330100: '杭州市',
        330200: '宁波市',
        330300: '温州市',
        330400: '嘉兴市',
        330500: '湖州市',
        330600: '绍兴市',
        330700: '金华市',
        330800: '衢州市',
        330900: '舟山市',
        331000: '台州市',
        331100: '丽水市',
        340100: '合肥市',
        340200: '芜湖市',
        340300: '蚌埠市',
        340400: '淮南市',
        340500: '马鞍山市',
        340600: '淮北市',
        340700: '铜陵市',
        340800: '安庆市',
        341000: '黄山市',
        341100: '滁州市',
        341200: '阜阳市',
        341300: '宿州市',
        341500: '六安市',
        341600: '亳州市',
        341700: '池州市',
        341800: '宣城市',
        350100: '福州市',
        350200: '厦门市',
        350300: '莆田市',
        350400: '三明市',
        350500: '泉州市',
        350600: '漳州市',
        350700: '南平市',
        350800: '龙岩市',
        350900: '宁德市',
        360100: '南昌市',
        360200: '景德镇市',
        360300: '萍乡市',
        360400: '九江市',
        360500: '新余市',
        360600: '鹰潭市',
        360700: '赣州市',
        360800: '吉安市',
        360900: '宜春市',
        361000: '抚州市',
        361100: '上饶市',
        370100: '济南市',
        370200: '青岛市',
        370300: '淄博市',
        370400: '枣庄市',
        370500: '东营市',
        370600: '烟台市',
        370700: '潍坊市',
        370800: '济宁市',
        370900: '泰安市',
        371000: '威海市',
        371100: '日照市',
        371300: '临沂市',
        371400: '德州市',
        371500: '聊城市',
        371600: '滨州市',
        371700: '菏泽市',
        410100: '郑州市',
        410200: '开封市',
        410300: '洛阳市',
        410400: '平顶山市',
        410500: '安阳市',
        410600: '鹤壁市',
        410700: '新乡市',
        410800: '焦作市',
        410900: '濮阳市',
        411000: '许昌市',
        411100: '漯河市',
        411200: '三门峡市',
        411300: '南阳市',
        411400: '商丘市',
        411500: '信阳市',
        411600: '周口市',
        411700: '驻马店市',
        419000: '省直辖县',
        420100: '武汉市',
        420200: '黄石市',
        420300: '十堰市',
        420500: '宜昌市',
        420600: '襄阳市',
        420700: '鄂州市',
        420800: '荆门市',
        420900: '孝感市',
        421000: '荆州市',
        421100: '黄冈市',
        421200: '咸宁市',
        421300: '随州市',
        422800: '恩施土家族苗族自治州',
        429000: '省直辖县',
        430100: '长沙市',
        430200: '株洲市',
        430300: '湘潭市',
        430400: '衡阳市',
        430500: '邵阳市',
        430600: '岳阳市',
        430700: '常德市',
        430800: '张家界市',
        430900: '益阳市',
        431000: '郴州市',
        431100: '永州市',
        431200: '怀化市',
        431300: '娄底市',
        433100: '湘西土家族苗族自治州',
        440100: '广州市',
        440200: '韶关市',
        440300: '深圳市',
        440400: '珠海市',
        440500: '汕头市',
        440600: '佛山市',
        440700: '江门市',
        440800: '湛江市',
        440900: '茂名市',
        441200: '肇庆市',
        441300: '惠州市',
        441400: '梅州市',
        441500: '汕尾市',
        441600: '河源市',
        441700: '阳江市',
        441800: '清远市',
        441900: '东莞市',
        442000: '中山市',
        445100: '潮州市',
        445200: '揭阳市',
        445300: '云浮市',
        450100: '南宁市',
        450200: '柳州市',
        450300: '桂林市',
        450400: '梧州市',
        450500: '北海市',
        450600: '防城港市',
        450700: '钦州市',
        450800: '贵港市',
        450900: '玉林市',
        451000: '百色市',
        451100: '贺州市',
        451200: '河池市',
        451300: '来宾市',
        451400: '崇左市',
        460100: '海口市',
        460200: '三亚市',
        460300: '三沙市',
        460400: '儋州市',
        469000: '省直辖县',
        500100: '重庆市',
        500200: '县',
        510100: '成都市',
        510300: '自贡市',
        510400: '攀枝花市',
        510500: '泸州市',
        510600: '德阳市',
        510700: '绵阳市',
        510800: '广元市',
        510900: '遂宁市',
        511000: '内江市',
        511100: '乐山市',
        511300: '南充市',
        511400: '眉山市',
        511500: '宜宾市',
        511600: '广安市',
        511700: '达州市',
        511800: '雅安市',
        511900: '巴中市',
        512000: '资阳市',
        513200: '阿坝藏族羌族自治州',
        513300: '甘孜藏族自治州',
        513400: '凉山彝族自治州',
        520100: '贵阳市',
        520200: '六盘水市',
        520300: '遵义市',
        520400: '安顺市',
        520500: '毕节市',
        520600: '铜仁市',
        522300: '黔西南布依族苗族自治州',
        522600: '黔东南苗族侗族自治州',
        522700: '黔南布依族苗族自治州',
        530100: '昆明市',
        530300: '曲靖市',
        530400: '玉溪市',
        530500: '保山市',
        530600: '昭通市',
        530700: '丽江市',
        530800: '普洱市',
        530900: '临沧市',
        532300: '楚雄彝族自治州',
        532500: '红河哈尼族彝族自治州',
        532600: '文山壮族苗族自治州',
        532800: '西双版纳傣族自治州',
        532900: '大理白族自治州',
        533100: '德宏傣族景颇族自治州',
        533300: '怒江傈僳族自治州',
        533400: '迪庆藏族自治州',
        540100: '拉萨市',
        540200: '日喀则市',
        540300: '昌都市',
        540400: '林芝市',
        540500: '山南市',
        540600: '那曲市',
        542500: '阿里地区',
        610100: '西安市',
        610200: '铜川市',
        610300: '宝鸡市',
        610400: '咸阳市',
        610500: '渭南市',
        610600: '延安市',
        610700: '汉中市',
        610800: '榆林市',
        610900: '安康市',
        611000: '商洛市',
        620100: '兰州市',
        620200: '嘉峪关市',
        620300: '金昌市',
        620400: '白银市',
        620500: '天水市',
        620600: '武威市',
        620700: '张掖市',
        620800: '平凉市',
        620900: '酒泉市',
        621000: '庆阳市',
        621100: '定西市',
        621200: '陇南市',
        622900: '临夏回族自治州',
        623000: '甘南藏族自治州',
        630100: '西宁市',
        630200: '海东市',
        632200: '海北藏族自治州',
        632300: '黄南藏族自治州',
        632500: '海南藏族自治州',
        632600: '果洛藏族自治州',
        632700: '玉树藏族自治州',
        632800: '海西蒙古族藏族自治州',
        640100: '银川市',
        640200: '石嘴山市',
        640300: '吴忠市',
        640400: '固原市',
        640500: '中卫市',
        650100: '乌鲁木齐市',
        650200: '克拉玛依市',
        650400: '吐鲁番市',
        650500: '哈密市',
        652300: '昌吉回族自治州',
        652700: '博尔塔拉蒙古自治州',
        652800: '巴音郭楞蒙古自治州',
        652900: '阿克苏地区',
        653000: '克孜勒苏柯尔克孜自治州',
        653100: '喀什地区',
        653200: '和田地区',
        654000: '伊犁哈萨克自治州',
        654200: '塔城地区',
        654300: '阿勒泰地区',
        659000: '自治区直辖县级行政区划',
        710100: '台北市',
        710200: '高雄市',
        710300: '台南市',
        710400: '台中市',
        710500: '金门县',
        710600: '南投县',
        710700: '基隆市',
        710800: '新竹市',
        710900: '嘉义市',
        711100: '新北市',
        711200: '宜兰县',
        711300: '新竹县',
        711400: '桃园县',
        711500: '苗栗县',
        711700: '彰化县',
        711900: '嘉义县',
        712100: '云林县',
        712400: '屏东县',
        712500: '台东县',
        712600: '花莲县',
        712700: '澎湖县',
        712800: '连江县',
        810100: '香港岛',
        810200: '九龙',
        810300: '新界',
        820100: '澳门半岛',
        820200: '离岛',
        900400: '阿富汗',
        900800: '阿尔巴尼亚',
        901000: '南极洲',
        901200: '阿尔及利亚',
        901600: '美属萨摩亚',
        902000: '安道尔',
        902400: '安哥拉',
        902800: '安提瓜和巴布达',
        903100: '阿塞拜疆',
        903200: '阿根廷',
        903600: '澳大利亚',
        904000: '奥地利',
        904400: '巴哈马',
        904800: '巴林',
        905000: '孟加拉',
        905100: '亚美尼亚',
        905200: '巴巴多斯',
        905600: '比利时',
        906000: '百慕大',
        906400: '不丹',
        906800: '玻利维亚',
        907000: '波黑',
        907200: '博茨瓦纳',
        907400: '布韦岛',
        907600: '巴西',
        908400: '伯利兹',
        908600: '英属印度洋领地',
        909000: '所罗门群岛',
        909200: '英属维尔京群岛',
        909600: '文莱',
        910000: '保加利亚',
        910400: '缅甸',
        910800: '布隆迪',
        911200: '白俄罗斯',
        911600: '柬埔寨',
        912000: '喀麦隆',
        912400: '加拿大',
        913200: '佛得角',
        913600: '开曼群岛',
        914000: '中非',
        914400: '斯里兰卡',
        914800: '乍得',
        915200: '智利',
        916200: '圣诞岛',
        916600: '科科斯群岛',
        917000: '哥伦比亚',
        917400: '科摩罗',
        917500: '马约特',
        917800: '刚果（布）',
        918000: '刚果（金）',
        918400: '库克群岛',
        918800: '哥斯达黎加',
        919100: '克罗地亚',
        919200: '古巴',
        919600: '塞浦路斯',
        920300: '捷克',
        920400: '贝宁',
        920800: '丹麦',
        921200: '多米尼克',
        921400: '多米尼加',
        921800: '厄瓜多尔',
        922200: '萨尔瓦多',
        922600: '赤道几内亚',
        923100: '埃塞俄比亚',
        923200: '厄立特里亚',
        923300: '爱沙尼亚',
        923400: '法罗群岛',
        923800: '马尔维纳斯群岛（ 福克兰）',
        923900: '南乔治亚岛和南桑威奇群岛',
        924200: '斐济群岛',
        924600: '芬兰',
        924800: '奥兰群岛',
        925000: '法国',
        925400: '法属圭亚那',
        925800: '法属波利尼西亚',
        926000: '法属南部领地',
        926200: '吉布提',
        926600: '加蓬',
        926800: '格鲁吉亚',
        927000: '冈比亚',
        927500: '巴勒斯坦',
        927600: '德国',
        928800: '加纳',
        929200: '直布罗陀',
        929600: '基里巴斯',
        930000: '希腊',
        930400: '格陵兰',
        930800: '格林纳达',
        931200: '瓜德罗普',
        931600: '关岛',
        932000: '危地马拉',
        932400: '几内亚',
        932800: '圭亚那',
        933200: '海地',
        933400: '赫德岛和麦克唐纳群岛',
        933600: '梵蒂冈',
        934000: '洪都拉斯',
        934800: '匈牙利',
        935200: '冰岛',
        935600: '印度',
        936000: '印尼',
        936400: '伊朗',
        936800: '伊拉克',
        937200: '爱尔兰',
        937600: '以色列',
        938000: '意大利',
        938400: '科特迪瓦',
        938800: '牙买加',
        939200: '日本',
        939800: '哈萨克斯坦',
        940000: '约旦',
        940400: '肯尼亚',
        940800: '朝鲜 北朝鲜',
        941000: '韩国',
        941400: '科威特',
        941700: '吉尔吉斯斯坦',
        941800: '老挝',
        942200: '黎巴嫩',
        942600: '莱索托',
        942800: '拉脱维亚',
        943000: '利比里亚',
        943400: '利比亚',
        943800: '列支敦士登',
        944000: '立陶宛',
        944200: '卢森堡',
        945000: '马达加斯加',
        945400: '马拉维',
        945800: '马来西亚',
        946200: '马尔代夫',
        946600: '马里',
        947000: '马耳他',
        947400: '马提尼克',
        947800: '毛里塔尼亚',
        948000: '毛里求斯',
        948400: '墨西哥',
        949200: '摩纳哥',
        949600: '蒙古国',
        949800: '摩尔多瓦',
        949900: '黑山',
        950000: '蒙塞拉特岛',
        950400: '摩洛哥',
        950800: '莫桑比克',
        951200: '阿曼',
        951600: '纳米比亚',
        952000: '瑙鲁',
        952400: '尼泊尔',
        952800: '荷兰',
        953300: '阿鲁巴',
        953500: '荷兰加勒比区',
        954000: '新喀里多尼亚',
        954800: '瓦努阿图',
        955400: '新西兰',
        955800: '尼加拉瓜',
        956200: '尼日尔',
        956600: '尼日利亚',
        957000: '纽埃',
        957400: '诺福克岛',
        957800: '挪威',
        958000: '北马里亚纳群岛',
        958100: '美国本土外小岛屿',
        958300: '密克罗尼西亚联邦',
        958400: '马绍尔群岛',
        958500: '帕劳',
        958600: '巴基斯坦',
        959100: '巴拿马',
        959800: '巴布亚新几内亚',
        960000: '巴拉圭',
        960400: '秘鲁',
        960800: '菲律宾',
        961200: '皮特凯恩群岛',
        961600: '波兰',
        962000: '葡萄牙',
        962400: '几内亚比绍',
        962600: '东帝汶',
        963000: '波多黎各',
        963400: '卡塔尔',
        963800: '留尼汪',
        964200: '罗马尼亚',
        964300: '俄罗斯',
        964600: '卢旺达',
        965200: '圣巴泰勒米岛',
        965400: '圣赫勒拿',
        965900: '圣基茨和尼维斯',
        966000: '安圭拉',
        966200: '圣卢西亚',
        966300: '法属圣马丁',
        966600: '圣皮埃尔和密克隆',
        967000: '圣文森特和格林纳丁斯',
        967400: '圣马力诺',
        967800: '圣多美和普林西比',
        968200: '沙特阿拉伯',
        968600: '塞内加尔',
        968800: '塞尔维亚',
        969000: '塞舌尔',
        969400: '塞拉利昂',
        970200: '新加坡',
        970300: '斯洛伐克',
        970400: '越南',
        970500: '斯洛文尼亚',
        970600: '索马里',
        971000: '南非',
        971600: '津巴布韦',
        972400: '西班牙',
        972800: '南苏丹',
        972900: '苏丹',
        973200: '西撒哈拉',
        974000: '苏里南',
        974400: '斯瓦尔巴群岛和 扬马延岛',
        974800: '斯威士兰',
        975200: '瑞典',
        975600: '瑞士',
        976000: '叙利亚',
        976200: '塔吉克斯坦',
        976400: '泰国',
        976800: '多哥',
        977200: '托克劳',
        977600: '汤加',
        978000: '特立尼达和多巴哥',
        978400: '阿联酋',
        978800: '突尼斯',
        979200: '土耳其',
        979500: '土库曼斯坦',
        979600: '特克斯和凯科斯群岛',
        979800: '图瓦卢',
        980000: '乌干达',
        980400: '乌克兰',
        980700: '马其顿',
        981800: '埃及',
        982600: '英国',
        983100: '根西岛',
        983200: '泽西岛',
        983300: '马恩岛',
        983400: '坦桑尼亚',
        984000: '美国',
        985000: '美属维尔京群岛',
        985400: '布基纳法索',
        985800: '乌拉圭',
        986000: '乌兹别克斯坦',
        986200: '委内瑞拉',
        987600: '瓦利斯和富图纳',
        988200: '萨摩亚',
        988700: '也门',
        989400: '赞比亚',
    },
    county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        110107: '石景山区',
        110108: '海淀区',
        110109: '门头沟区',
        110111: '房山区',
        110112: '通州区',
        110113: '顺义区',
        110114: '昌平区',
        110115: '大兴区',
        110116: '怀柔区',
        110117: '平谷区',
        110118: '密云区',
        110119: '延庆区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
        120106: '红桥区',
        120110: '东丽区',
        120111: '西青区',
        120112: '津南区',
        120113: '北辰区',
        120114: '武清区',
        120115: '宝坻区',
        120116: '滨海新区',
        120117: '宁河区',
        120118: '静海区',
        120119: '蓟州区',
        130102: '长安区',
        130104: '桥西区',
        130105: '新华区',
        130107: '井陉矿区',
        130108: '裕华区',
        130109: '藁城区',
        130110: '鹿泉区',
        130111: '栾城区',
        130121: '井陉县',
        130123: '正定县',
        130125: '行唐县',
        130126: '灵寿县',
        130127: '高邑县',
        130128: '深泽县',
        130129: '赞皇县',
        130130: '无极县',
        130131: '平山县',
        130132: '元氏县',
        130133: '赵县',
        130181: '辛集市',
        130183: '晋州市',
        130184: '新乐市',
        130202: '路南区',
        130203: '路北区',
        130204: '古冶区',
        130205: '开平区',
        130207: '丰南区',
        130208: '丰润区',
        130209: '曹妃甸区',
        130224: '滦南县',
        130225: '乐亭县',
        130227: '迁西县',
        130229: '玉田县',
        130281: '遵化市',
        130283: '迁安市',
        130284: '滦州市',
        130302: '海港区',
        130303: '山海关区',
        130304: '北戴河区',
        130306: '抚宁区',
        130321: '青龙满族自治县',
        130322: '昌黎县',
        130324: '卢龙县',
        130390: '经济技术开发区',
        130402: '邯山区',
        130403: '丛台区',
        130404: '复兴区',
        130406: '峰峰矿区',
        130407: '肥乡区',
        130408: '永年区',
        130423: '临漳县',
        130424: '成安县',
        130425: '大名县',
        130426: '涉县',
        130427: '磁县',
        130430: '邱县',
        130431: '鸡泽县',
        130432: '广平县',
        130433: '馆陶县',
        130434: '魏县',
        130435: '曲周县',
        130481: '武安市',
        130502: '桥东区',
        130503: '桥西区',
        130521: '邢台县',
        130522: '临城县',
        130523: '内丘县',
        130524: '柏乡县',
        130525: '隆尧县',
        130526: '任县',
        130527: '南和县',
        130528: '宁晋县',
        130529: '巨鹿县',
        130530: '新河县',
        130531: '广宗县',
        130532: '平乡县',
        130533: '威县',
        130534: '清河县',
        130535: '临西县',
        130581: '南宫市',
        130582: '沙河市',
        130602: '竞秀区',
        130606: '莲池区',
        130607: '满城区',
        130608: '清苑区',
        130609: '徐水区',
        130623: '涞水县',
        130624: '阜平县',
        130626: '定兴县',
        130627: '唐县',
        130628: '高阳县',
        130629: '容城县',
        130630: '涞源县',
        130631: '望都县',
        130632: '安新县',
        130633: '易县',
        130634: '曲阳县',
        130635: '蠡县',
        130636: '顺平县',
        130637: '博野县',
        130638: '雄县',
        130681: '涿州市',
        130682: '定州市',
        130683: '安国市',
        130684: '高碑店市',
        130702: '桥东区',
        130703: '桥西区',
        130705: '宣化区',
        130706: '下花园区',
        130708: '万全区',
        130709: '崇礼区',
        130722: '张北县',
        130723: '康保县',
        130724: '沽源县',
        130725: '尚义县',
        130726: '蔚县',
        130727: '阳原县',
        130728: '怀安县',
        130730: '怀来县',
        130731: '涿鹿县',
        130732: '赤城县',
        130802: '双桥区',
        130803: '双滦区',
        130804: '鹰手营子矿区',
        130821: '承德县',
        130822: '兴隆县',
        130824: '滦平县',
        130825: '隆化县',
        130826: '丰宁满族自治县',
        130827: '宽城满族自治县',
        130828: '围场满族蒙古族自治县',
        130881: '平泉市',
        130902: '新华区',
        130903: '运河区',
        130921: '沧县',
        130922: '青县',
        130923: '东光县',
        130924: '海兴县',
        130925: '盐山县',
        130926: '肃宁县',
        130927: '南皮县',
        130928: '吴桥县',
        130929: '献县',
        130930: '孟村回族自治县',
        130981: '泊头市',
        130982: '任丘市',
        130983: '黄骅市',
        130984: '河间市',
        131002: '安次区',
        131003: '广阳区',
        131022: '固安县',
        131023: '永清县',
        131024: '香河县',
        131025: '大城县',
        131026: '文安县',
        131028: '大厂回族自治县',
        131081: '霸州市',
        131082: '三河市',
        131090: '开发区',
        131102: '桃城区',
        131103: '冀州区',
        131121: '枣强县',
        131122: '武邑县',
        131123: '武强县',
        131124: '饶阳县',
        131125: '安平县',
        131126: '故城县',
        131127: '景县',
        131128: '阜城县',
        131182: '深州市',
        140105: '小店区',
        140106: '迎泽区',
        140107: '杏花岭区',
        140108: '尖草坪区',
        140109: '万柏林区',
        140110: '晋源区',
        140121: '清徐县',
        140122: '阳曲县',
        140123: '娄烦县',
        140181: '古交市',
        140212: '新荣区',
        140213: '平城区',
        140214: '云冈区',
        140215: '云州区',
        140221: '阳高县',
        140222: '天镇县',
        140223: '广灵县',
        140224: '灵丘县',
        140225: '浑源县',
        140226: '左云县',
        140302: '城区',
        140303: '矿区',
        140311: '郊区',
        140321: '平定县',
        140322: '盂县',
        140403: '潞州区',
        140404: '上党区',
        140405: '屯留区',
        140406: '潞城区',
        140423: '襄垣县',
        140425: '平顺县',
        140426: '黎城县',
        140427: '壶关县',
        140428: '长子县',
        140429: '武乡县',
        140430: '沁县',
        140431: '沁源县',
        140502: '城区',
        140521: '沁水县',
        140522: '阳城县',
        140524: '陵川县',
        140525: '泽州县',
        140581: '高平市',
        140602: '朔城区',
        140603: '平鲁区',
        140621: '山阴县',
        140622: '应县',
        140623: '右玉县',
        140681: '怀仁市',
        140702: '榆次区',
        140721: '榆社县',
        140722: '左权县',
        140723: '和顺县',
        140724: '昔阳县',
        140725: '寿阳县',
        140726: '太谷县',
        140727: '祁县',
        140728: '平遥县',
        140729: '灵石县',
        140781: '介休市',
        140802: '盐湖区',
        140821: '临猗县',
        140822: '万荣县',
        140823: '闻喜县',
        140824: '稷山县',
        140825: '新绛县',
        140826: '绛县',
        140827: '垣曲县',
        140828: '夏县',
        140829: '平陆县',
        140830: '芮城县',
        140881: '永济市',
        140882: '河津市',
        140902: '忻府区',
        140921: '定襄县',
        140922: '五台县',
        140923: '代县',
        140924: '繁峙县',
        140925: '宁武县',
        140926: '静乐县',
        140927: '神池县',
        140928: '五寨县',
        140929: '岢岚县',
        140930: '河曲县',
        140931: '保德县',
        140932: '偏关县',
        140981: '原平市',
        141002: '尧都区',
        141021: '曲沃县',
        141022: '翼城县',
        141023: '襄汾县',
        141024: '洪洞县',
        141025: '古县',
        141026: '安泽县',
        141027: '浮山县',
        141028: '吉县',
        141029: '乡宁县',
        141030: '大宁县',
        141031: '隰县',
        141032: '永和县',
        141033: '蒲县',
        141034: '汾西县',
        141081: '侯马市',
        141082: '霍州市',
        141102: '离石区',
        141121: '文水县',
        141122: '交城县',
        141123: '兴县',
        141124: '临县',
        141125: '柳林县',
        141126: '石楼县',
        141127: '岚县',
        141128: '方山县',
        141129: '中阳县',
        141130: '交口县',
        141181: '孝义市',
        141182: '汾阳市',
        150102: '新城区',
        150103: '回民区',
        150104: '玉泉区',
        150105: '赛罕区',
        150121: '土默特左旗',
        150122: '托克托县',
        150123: '和林格尔县',
        150124: '清水河县',
        150125: '武川县',
        150202: '东河区',
        150203: '昆都仑区',
        150204: '青山区',
        150205: '石拐区',
        150206: '白云鄂博矿区',
        150207: '九原区',
        150221: '土默特右旗',
        150222: '固阳县',
        150223: '达尔罕茂明安联合旗',
        150302: '海勃湾区',
        150303: '海南区',
        150304: '乌达区',
        150402: '红山区',
        150403: '元宝山区',
        150404: '松山区',
        150421: '阿鲁科尔沁旗',
        150422: '巴林左旗',
        150423: '巴林右旗',
        150424: '林西县',
        150425: '克什克腾旗',
        150426: '翁牛特旗',
        150428: '喀喇沁旗',
        150429: '宁城县',
        150430: '敖汉旗',
        150502: '科尔沁区',
        150521: '科尔沁左翼中旗',
        150522: '科尔沁左翼后旗',
        150523: '开鲁县',
        150524: '库伦旗',
        150525: '奈曼旗',
        150526: '扎鲁特旗',
        150581: '霍林郭勒市',
        150602: '东胜区',
        150603: '康巴什区',
        150621: '达拉特旗',
        150622: '准格尔旗',
        150623: '鄂托克前旗',
        150624: '鄂托克旗',
        150625: '杭锦旗',
        150626: '乌审旗',
        150627: '伊金霍洛旗',
        150702: '海拉尔区',
        150703: '扎赉诺尔区',
        150721: '阿荣旗',
        150722: '莫力达瓦达斡尔族自治旗',
        150723: '鄂伦春自治旗',
        150724: '鄂温克族自治旗',
        150725: '陈巴尔虎旗',
        150726: '新巴尔虎左旗',
        150727: '新巴尔虎右旗',
        150781: '满洲里市',
        150782: '牙克石市',
        150783: '扎兰屯市',
        150784: '额尔古纳市',
        150785: '根河市',
        150802: '临河区',
        150821: '五原县',
        150822: '磴口县',
        150823: '乌拉特前旗',
        150824: '乌拉特中旗',
        150825: '乌拉特后旗',
        150826: '杭锦后旗',
        150902: '集宁区',
        150921: '卓资县',
        150922: '化德县',
        150923: '商都县',
        150924: '兴和县',
        150925: '凉城县',
        150926: '察哈尔右翼前旗',
        150927: '察哈尔右翼中旗',
        150928: '察哈尔右翼后旗',
        150929: '四子王旗',
        150981: '丰镇市',
        152201: '乌兰浩特市',
        152202: '阿尔山市',
        152221: '科尔沁右翼前旗',
        152222: '科尔沁右翼中旗',
        152223: '扎赉特旗',
        152224: '突泉县',
        152501: '二连浩特市',
        152502: '锡林浩特市',
        152522: '阿巴嘎旗',
        152523: '苏尼特左旗',
        152524: '苏尼特右旗',
        152525: '东乌珠穆沁旗',
        152526: '西乌珠穆沁旗',
        152527: '太仆寺旗',
        152528: '镶黄旗',
        152529: '正镶白旗',
        152530: '正蓝旗',
        152531: '多伦县',
        152921: '阿拉善左旗',
        152922: '阿拉善右旗',
        152923: '额济纳旗',
        210102: '和平区',
        210103: '沈河区',
        210104: '大东区',
        210105: '皇姑区',
        210106: '铁西区',
        210111: '苏家屯区',
        210112: '浑南区',
        210113: '沈北新区',
        210114: '于洪区',
        210115: '辽中区',
        210123: '康平县',
        210124: '法库县',
        210181: '新民市',
        210190: '经济技术开发区',
        210202: '中山区',
        210203: '西岗区',
        210204: '沙河口区',
        210211: '甘井子区',
        210212: '旅顺口区',
        210213: '金州区',
        210214: '普兰店区',
        210224: '长海县',
        210281: '瓦房店市',
        210283: '庄河市',
        210302: '铁东区',
        210303: '铁西区',
        210304: '立山区',
        210311: '千山区',
        210321: '台安县',
        210323: '岫岩满族自治县',
        210381: '海城市',
        210390: '高新区',
        210402: '新抚区',
        210403: '东洲区',
        210404: '望花区',
        210411: '顺城区',
        210421: '抚顺县',
        210422: '新宾满族自治县',
        210423: '清原满族自治县',
        210502: '平山区',
        210503: '溪湖区',
        210504: '明山区',
        210505: '南芬区',
        210521: '本溪满族自治县',
        210522: '桓仁满族自治县',
        210602: '元宝区',
        210603: '振兴区',
        210604: '振安区',
        210624: '宽甸满族自治县',
        210681: '东港市',
        210682: '凤城市',
        210702: '古塔区',
        210703: '凌河区',
        210711: '太和区',
        210726: '黑山县',
        210727: '义县',
        210781: '凌海市',
        210782: '北镇市',
        210793: '经济技术开发区',
        210802: '站前区',
        210803: '西市区',
        210804: '鲅鱼圈区',
        210811: '老边区',
        210881: '盖州市',
        210882: '大石桥市',
        210902: '海州区',
        210903: '新邱区',
        210904: '太平区',
        210905: '清河门区',
        210911: '细河区',
        210921: '阜新蒙古族自治县',
        210922: '彰武县',
        211002: '白塔区',
        211003: '文圣区',
        211004: '宏伟区',
        211005: '弓长岭区',
        211011: '太子河区',
        211021: '辽阳县',
        211081: '灯塔市',
        211102: '双台子区',
        211103: '兴隆台区',
        211104: '大洼区',
        211122: '盘山县',
        211202: '银州区',
        211204: '清河区',
        211221: '铁岭县',
        211223: '西丰县',
        211224: '昌图县',
        211281: '调兵山市',
        211282: '开原市',
        211302: '双塔区',
        211303: '龙城区',
        211321: '朝阳县',
        211322: '建平县',
        211324: '喀喇沁左翼蒙古族自治县',
        211381: '北票市',
        211382: '凌源市',
        211402: '连山区',
        211403: '龙港区',
        211404: '南票区',
        211421: '绥中县',
        211422: '建昌县',
        211481: '兴城市',
        220102: '南关区',
        220103: '宽城区',
        220104: '朝阳区',
        220105: '二道区',
        220106: '绿园区',
        220112: '双阳区',
        220113: '九台区',
        220122: '农安县',
        220182: '榆树市',
        220183: '德惠市',
        220192: '经济技术开发区',
        220202: '昌邑区',
        220203: '龙潭区',
        220204: '船营区',
        220211: '丰满区',
        220221: '永吉县',
        220281: '蛟河市',
        220282: '桦甸市',
        220283: '舒兰市',
        220284: '磐石市',
        220302: '铁西区',
        220303: '铁东区',
        220322: '梨树县',
        220323: '伊通满族自治县',
        220381: '公主岭市',
        220382: '双辽市',
        220402: '龙山区',
        220403: '西安区',
        220421: '东丰县',
        220422: '东辽县',
        220502: '东昌区',
        220503: '二道江区',
        220521: '通化县',
        220523: '辉南县',
        220524: '柳河县',
        220581: '梅河口市',
        220582: '集安市',
        220602: '浑江区',
        220605: '江源区',
        220621: '抚松县',
        220622: '靖宇县',
        220623: '长白朝鲜族自治县',
        220681: '临江市',
        220702: '宁江区',
        220721: '前郭尔罗斯蒙古族自治县',
        220722: '长岭县',
        220723: '乾安县',
        220781: '扶余市',
        220802: '洮北区',
        220821: '镇赉县',
        220822: '通榆县',
        220881: '洮南市',
        220882: '大安市',
        222401: '延吉市',
        222402: '图们市',
        222403: '敦化市',
        222404: '珲春市',
        222405: '龙井市',
        222406: '和龙市',
        222424: '汪清县',
        222426: '安图县',
        230102: '道里区',
        230103: '南岗区',
        230104: '道外区',
        230108: '平房区',
        230109: '松北区',
        230110: '香坊区',
        230111: '呼兰区',
        230112: '阿城区',
        230113: '双城区',
        230123: '依兰县',
        230124: '方正县',
        230125: '宾县',
        230126: '巴彦县',
        230127: '木兰县',
        230128: '通河县',
        230129: '延寿县',
        230183: '尚志市',
        230184: '五常市',
        230202: '龙沙区',
        230203: '建华区',
        230204: '铁锋区',
        230205: '昂昂溪区',
        230206: '富拉尔基区',
        230207: '碾子山区',
        230208: '梅里斯达斡尔族区',
        230221: '龙江县',
        230223: '依安县',
        230224: '泰来县',
        230225: '甘南县',
        230227: '富裕县',
        230229: '克山县',
        230230: '克东县',
        230231: '拜泉县',
        230281: '讷河市',
        230302: '鸡冠区',
        230303: '恒山区',
        230304: '滴道区',
        230305: '梨树区',
        230306: '城子河区',
        230307: '麻山区',
        230321: '鸡东县',
        230381: '虎林市',
        230382: '密山市',
        230402: '向阳区',
        230403: '工农区',
        230404: '南山区',
        230405: '兴安区',
        230406: '东山区',
        230407: '兴山区',
        230421: '萝北县',
        230422: '绥滨县',
        230502: '尖山区',
        230503: '岭东区',
        230505: '四方台区',
        230506: '宝山区',
        230521: '集贤县',
        230522: '友谊县',
        230523: '宝清县',
        230524: '饶河县',
        230602: '萨尔图区',
        230603: '龙凤区',
        230604: '让胡路区',
        230605: '红岗区',
        230606: '大同区',
        230621: '肇州县',
        230622: '肇源县',
        230623: '林甸县',
        230624: '杜尔伯特蒙古族自治县',
        230702: '伊春区',
        230703: '南岔区',
        230704: '友好区',
        230705: '西林区',
        230706: '翠峦区',
        230707: '新青区',
        230708: '美溪区',
        230709: '金山屯区',
        230710: '五营区',
        230711: '乌马河区',
        230712: '汤旺河区',
        230713: '带岭区',
        230714: '乌伊岭区',
        230715: '红星区',
        230716: '上甘岭区',
        230722: '嘉荫县',
        230781: '铁力市',
        230803: '向阳区',
        230804: '前进区',
        230805: '东风区',
        230811: '郊区',
        230822: '桦南县',
        230826: '桦川县',
        230828: '汤原县',
        230881: '同江市',
        230882: '富锦市',
        230883: '抚远市',
        230902: '新兴区',
        230903: '桃山区',
        230904: '茄子河区',
        230921: '勃利县',
        231002: '东安区',
        231003: '阳明区',
        231004: '爱民区',
        231005: '西安区',
        231025: '林口县',
        231081: '绥芬河市',
        231083: '海林市',
        231084: '宁安市',
        231085: '穆棱市',
        231086: '东宁市',
        231102: '爱辉区',
        231121: '嫩江县',
        231123: '逊克县',
        231124: '孙吴县',
        231181: '北安市',
        231182: '五大连池市',
        231202: '北林区',
        231221: '望奎县',
        231222: '兰西县',
        231223: '青冈县',
        231224: '庆安县',
        231225: '明水县',
        231226: '绥棱县',
        231281: '安达市',
        231282: '肇东市',
        231283: '海伦市',
        232701: '漠河市',
        232721: '呼玛县',
        232722: '塔河县',
        232790: '松岭区',
        232791: '呼中区',
        232792: '加格达奇区',
        232793: '新林区',
        310101: '黄浦区',
        310104: '徐汇区',
        310105: '长宁区',
        310106: '静安区',
        310107: '普陀区',
        310109: '虹口区',
        310110: '杨浦区',
        310112: '闵行区',
        310113: '宝山区',
        310114: '嘉定区',
        310115: '浦东新区',
        310116: '金山区',
        310117: '松江区',
        310118: '青浦区',
        310120: '奉贤区',
        310151: '崇明区',
        320102: '玄武区',
        320104: '秦淮区',
        320105: '建邺区',
        320106: '鼓楼区',
        320111: '浦口区',
        320113: '栖霞区',
        320114: '雨花台区',
        320115: '江宁区',
        320116: '六合区',
        320117: '溧水区',
        320118: '高淳区',
        320205: '锡山区',
        320206: '惠山区',
        320211: '滨湖区',
        320213: '梁溪区',
        320214: '新吴区',
        320281: '江阴市',
        320282: '宜兴市',
        320302: '鼓楼区',
        320303: '云龙区',
        320305: '贾汪区',
        320311: '泉山区',
        320312: '铜山区',
        320321: '丰县',
        320322: '沛县',
        320324: '睢宁县',
        320381: '新沂市',
        320382: '邳州市',
        320391: '工业园区',
        320402: '天宁区',
        320404: '钟楼区',
        320411: '新北区',
        320412: '武进区',
        320413: '金坛区',
        320481: '溧阳市',
        320505: '虎丘区',
        320506: '吴中区',
        320507: '相城区',
        320508: '姑苏区',
        320509: '吴江区',
        320581: '常熟市',
        320582: '张家港市',
        320583: '昆山市',
        320585: '太仓市',
        320590: '工业园区',
        320591: '高新区',
        320602: '崇川区',
        320611: '港闸区',
        320612: '通州区',
        320623: '如东县',
        320681: '启东市',
        320682: '如皋市',
        320684: '海门市',
        320685: '海安市',
        320691: '高新区',
        320703: '连云区',
        320706: '海州区',
        320707: '赣榆区',
        320722: '东海县',
        320723: '灌云县',
        320724: '灌南县',
        320803: '淮安区',
        320804: '淮阴区',
        320812: '清江浦区',
        320813: '洪泽区',
        320826: '涟水县',
        320830: '盱眙县',
        320831: '金湖县',
        320890: '经济开发区',
        320902: '亭湖区',
        320903: '盐都区',
        320904: '大丰区',
        320921: '响水县',
        320922: '滨海县',
        320923: '阜宁县',
        320924: '射阳县',
        320925: '建湖县',
        320981: '东台市',
        321002: '广陵区',
        321003: '邗江区',
        321012: '江都区',
        321023: '宝应县',
        321081: '仪征市',
        321084: '高邮市',
        321090: '经济开发区',
        321102: '京口区',
        321111: '润州区',
        321112: '丹徒区',
        321181: '丹阳市',
        321182: '扬中市',
        321183: '句容市',
        321202: '海陵区',
        321203: '高港区',
        321204: '姜堰区',
        321281: '兴化市',
        321282: '靖江市',
        321283: '泰兴市',
        321302: '宿城区',
        321311: '宿豫区',
        321322: '沭阳县',
        321323: '泗阳县',
        321324: '泗洪县',
        330102: '上城区',
        330103: '下城区',
        330104: '江干区',
        330105: '拱墅区',
        330106: '西湖区',
        330108: '滨江区',
        330109: '萧山区',
        330110: '余杭区',
        330111: '富阳区',
        330112: '临安区',
        330122: '桐庐县',
        330127: '淳安县',
        330182: '建德市',
        330203: '海曙区',
        330205: '江北区',
        330206: '北仑区',
        330211: '镇海区',
        330212: '鄞州区',
        330213: '奉化区',
        330225: '象山县',
        330226: '宁海县',
        330281: '余姚市',
        330282: '慈溪市',
        330302: '鹿城区',
        330303: '龙湾区',
        330304: '瓯海区',
        330305: '洞头区',
        330324: '永嘉县',
        330326: '平阳县',
        330327: '苍南县',
        330328: '文成县',
        330329: '泰顺县',
        330381: '瑞安市',
        330382: '乐清市',
        330402: '南湖区',
        330411: '秀洲区',
        330421: '嘉善县',
        330424: '海盐县',
        330481: '海宁市',
        330482: '平湖市',
        330483: '桐乡市',
        330502: '吴兴区',
        330503: '南浔区',
        330521: '德清县',
        330522: '长兴县',
        330523: '安吉县',
        330602: '越城区',
        330603: '柯桥区',
        330604: '上虞区',
        330624: '新昌县',
        330681: '诸暨市',
        330683: '嵊州市',
        330702: '婺城区',
        330703: '金东区',
        330723: '武义县',
        330726: '浦江县',
        330727: '磐安县',
        330781: '兰溪市',
        330782: '义乌市',
        330783: '东阳市',
        330784: '永康市',
        330802: '柯城区',
        330803: '衢江区',
        330822: '常山县',
        330824: '开化县',
        330825: '龙游县',
        330881: '江山市',
        330902: '定海区',
        330903: '普陀区',
        330921: '岱山县',
        330922: '嵊泗县',
        331002: '椒江区',
        331003: '黄岩区',
        331004: '路桥区',
        331022: '三门县',
        331023: '天台县',
        331024: '仙居县',
        331081: '温岭市',
        331082: '临海市',
        331083: '玉环市',
        331102: '莲都区',
        331121: '青田县',
        331122: '缙云县',
        331123: '遂昌县',
        331124: '松阳县',
        331125: '云和县',
        331126: '庆元县',
        331127: '景宁畲族自治县',
        331181: '龙泉市',
        340102: '瑶海区',
        340103: '庐阳区',
        340104: '蜀山区',
        340111: '包河区',
        340121: '长丰县',
        340122: '肥东县',
        340123: '肥西县',
        340124: '庐江县',
        340181: '巢湖市',
        340190: '高新技术开发区',
        340191: '经济技术开发区',
        340202: '镜湖区',
        340203: '弋江区',
        340207: '鸠江区',
        340208: '三山区',
        340221: '芜湖县',
        340222: '繁昌县',
        340223: '南陵县',
        340225: '无为县',
        340302: '龙子湖区',
        340303: '蚌山区',
        340304: '禹会区',
        340311: '淮上区',
        340321: '怀远县',
        340322: '五河县',
        340323: '固镇县',
        340402: '大通区',
        340403: '田家庵区',
        340404: '谢家集区',
        340405: '八公山区',
        340406: '潘集区',
        340421: '凤台县',
        340422: '寿县',
        340503: '花山区',
        340504: '雨山区',
        340506: '博望区',
        340521: '当涂县',
        340522: '含山县',
        340523: '和县',
        340602: '杜集区',
        340603: '相山区',
        340604: '烈山区',
        340621: '濉溪县',
        340705: '铜官区',
        340706: '义安区',
        340711: '郊区',
        340722: '枞阳县',
        340802: '迎江区',
        340803: '大观区',
        340811: '宜秀区',
        340822: '怀宁县',
        340824: '潜山县',
        340825: '太湖县',
        340826: '宿松县',
        340827: '望江县',
        340828: '岳西县',
        340881: '桐城市',
        341002: '屯溪区',
        341003: '黄山区',
        341004: '徽州区',
        341021: '歙县',
        341022: '休宁县',
        341023: '黟县',
        341024: '祁门县',
        341102: '琅琊区',
        341103: '南谯区',
        341122: '来安县',
        341124: '全椒县',
        341125: '定远县',
        341126: '凤阳县',
        341181: '天长市',
        341182: '明光市',
        341202: '颍州区',
        341203: '颍东区',
        341204: '颍泉区',
        341221: '临泉县',
        341222: '太和县',
        341225: '阜南县',
        341226: '颍上县',
        341282: '界首市',
        341302: '埇桥区',
        341321: '砀山县',
        341322: '萧县',
        341323: '灵璧县',
        341324: '泗县',
        341390: '经济开发区',
        341502: '金安区',
        341503: '裕安区',
        341504: '叶集区',
        341522: '霍邱县',
        341523: '舒城县',
        341524: '金寨县',
        341525: '霍山县',
        341602: '谯城区',
        341621: '涡阳县',
        341622: '蒙城县',
        341623: '利辛县',
        341702: '贵池区',
        341721: '东至县',
        341722: '石台县',
        341723: '青阳县',
        341802: '宣州区',
        341821: '郎溪县',
        341822: '广德县',
        341823: '泾县',
        341824: '绩溪县',
        341825: '旌德县',
        341881: '宁国市',
        350102: '鼓楼区',
        350103: '台江区',
        350104: '仓山区',
        350105: '马尾区',
        350111: '晋安区',
        350112: '长乐区',
        350121: '闽侯县',
        350122: '连江县',
        350123: '罗源县',
        350124: '闽清县',
        350125: '永泰县',
        350128: '平潭县',
        350181: '福清市',
        350203: '思明区',
        350205: '海沧区',
        350206: '湖里区',
        350211: '集美区',
        350212: '同安区',
        350213: '翔安区',
        350302: '城厢区',
        350303: '涵江区',
        350304: '荔城区',
        350305: '秀屿区',
        350322: '仙游县',
        350402: '梅列区',
        350403: '三元区',
        350421: '明溪县',
        350423: '清流县',
        350424: '宁化县',
        350425: '大田县',
        350426: '尤溪县',
        350427: '沙县',
        350428: '将乐县',
        350429: '泰宁县',
        350430: '建宁县',
        350481: '永安市',
        350502: '鲤城区',
        350503: '丰泽区',
        350504: '洛江区',
        350505: '泉港区',
        350521: '惠安县',
        350524: '安溪县',
        350525: '永春县',
        350526: '德化县',
        350527: '金门县',
        350581: '石狮市',
        350582: '晋江市',
        350583: '南安市',
        350602: '芗城区',
        350603: '龙文区',
        350622: '云霄县',
        350623: '漳浦县',
        350624: '诏安县',
        350625: '长泰县',
        350626: '东山县',
        350627: '南靖县',
        350628: '平和县',
        350629: '华安县',
        350681: '龙海市',
        350702: '延平区',
        350703: '建阳区',
        350721: '顺昌县',
        350722: '浦城县',
        350723: '光泽县',
        350724: '松溪县',
        350725: '政和县',
        350781: '邵武市',
        350782: '武夷山市',
        350783: '建瓯市',
        350802: '新罗区',
        350803: '永定区',
        350821: '长汀县',
        350823: '上杭县',
        350824: '武平县',
        350825: '连城县',
        350881: '漳平市',
        350902: '蕉城区',
        350921: '霞浦县',
        350922: '古田县',
        350923: '屏南县',
        350924: '寿宁县',
        350925: '周宁县',
        350926: '柘荣县',
        350981: '福安市',
        350982: '福鼎市',
        360102: '东湖区',
        360103: '西湖区',
        360104: '青云谱区',
        360105: '湾里区',
        360111: '青山湖区',
        360112: '新建区',
        360121: '南昌县',
        360123: '安义县',
        360124: '进贤县',
        360190: '经济技术开发区',
        360192: '高新区',
        360202: '昌江区',
        360203: '珠山区',
        360222: '浮梁县',
        360281: '乐平市',
        360302: '安源区',
        360313: '湘东区',
        360321: '莲花县',
        360322: '上栗县',
        360323: '芦溪县',
        360402: '濂溪区',
        360403: '浔阳区',
        360404: '柴桑区',
        360423: '武宁县',
        360424: '修水县',
        360425: '永修县',
        360426: '德安县',
        360428: '都昌县',
        360429: '湖口县',
        360430: '彭泽县',
        360481: '瑞昌市',
        360482: '共青城市',
        360483: '庐山市',
        360490: '经济技术开发区',
        360502: '渝水区',
        360521: '分宜县',
        360602: '月湖区',
        360603: '余江区',
        360681: '贵溪市',
        360702: '章贡区',
        360703: '南康区',
        360704: '赣县区',
        360722: '信丰县',
        360723: '大余县',
        360724: '上犹县',
        360725: '崇义县',
        360726: '安远县',
        360727: '龙南县',
        360728: '定南县',
        360729: '全南县',
        360730: '宁都县',
        360731: '于都县',
        360732: '兴国县',
        360733: '会昌县',
        360734: '寻乌县',
        360735: '石城县',
        360781: '瑞金市',
        360802: '吉州区',
        360803: '青原区',
        360821: '吉安县',
        360822: '吉水县',
        360823: '峡江县',
        360824: '新干县',
        360825: '永丰县',
        360826: '泰和县',
        360827: '遂川县',
        360828: '万安县',
        360829: '安福县',
        360830: '永新县',
        360881: '井冈山市',
        360902: '袁州区',
        360921: '奉新县',
        360922: '万载县',
        360923: '上高县',
        360924: '宜丰县',
        360925: '靖安县',
        360926: '铜鼓县',
        360981: '丰城市',
        360982: '樟树市',
        360983: '高安市',
        361002: '临川区',
        361003: '东乡区',
        361021: '南城县',
        361022: '黎川县',
        361023: '南丰县',
        361024: '崇仁县',
        361025: '乐安县',
        361026: '宜黄县',
        361027: '金溪县',
        361028: '资溪县',
        361030: '广昌县',
        361102: '信州区',
        361103: '广丰区',
        361121: '上饶县',
        361123: '玉山县',
        361124: '铅山县',
        361125: '横峰县',
        361126: '弋阳县',
        361127: '余干县',
        361128: '鄱阳县',
        361129: '万年县',
        361130: '婺源县',
        361181: '德兴市',
        370102: '历下区',
        370103: '市中区',
        370104: '槐荫区',
        370105: '天桥区',
        370112: '历城区',
        370113: '长清区',
        370114: '章丘区',
        370115: '济阳区',
        370116: '莱芜区',
        370117: '钢城区',
        370124: '平阴县',
        370126: '商河县',
        370190: '高新区',
        370202: '市南区',
        370203: '市北区',
        370211: '黄岛区',
        370212: '崂山区',
        370213: '李沧区',
        370214: '城阳区',
        370215: '即墨区',
        370281: '胶州市',
        370283: '平度市',
        370285: '莱西市',
        370290: '开发区',
        370302: '淄川区',
        370303: '张店区',
        370304: '博山区',
        370305: '临淄区',
        370306: '周村区',
        370321: '桓台县',
        370322: '高青县',
        370323: '沂源县',
        370402: '市中区',
        370403: '薛城区',
        370404: '峄城区',
        370405: '台儿庄区',
        370406: '山亭区',
        370481: '滕州市',
        370502: '东营区',
        370503: '河口区',
        370505: '垦利区',
        370522: '利津县',
        370523: '广饶县',
        370602: '芝罘区',
        370611: '福山区',
        370612: '牟平区',
        370613: '莱山区',
        370634: '长岛县',
        370681: '龙口市',
        370682: '莱阳市',
        370683: '莱州市',
        370684: '蓬莱市',
        370685: '招远市',
        370686: '栖霞市',
        370687: '海阳市',
        370690: '开发区',
        370702: '潍城区',
        370703: '寒亭区',
        370704: '坊子区',
        370705: '奎文区',
        370724: '临朐县',
        370725: '昌乐县',
        370781: '青州市',
        370782: '诸城市',
        370783: '寿光市',
        370784: '安丘市',
        370785: '高密市',
        370786: '昌邑市',
        370790: '开发区',
        370791: '高新区',
        370811: '任城区',
        370812: '兖州区',
        370826: '微山县',
        370827: '鱼台县',
        370828: '金乡县',
        370829: '嘉祥县',
        370830: '汶上县',
        370831: '泗水县',
        370832: '梁山县',
        370881: '曲阜市',
        370883: '邹城市',
        370890: '高新区',
        370902: '泰山区',
        370911: '岱岳区',
        370921: '宁阳县',
        370923: '东平县',
        370982: '新泰市',
        370983: '肥城市',
        371002: '环翠区',
        371003: '文登区',
        371082: '荣成市',
        371083: '乳山市',
        371091: '经济技术开发区',
        371102: '东港区',
        371103: '岚山区',
        371121: '五莲县',
        371122: '莒县',
        371302: '兰山区',
        371311: '罗庄区',
        371312: '河东区',
        371321: '沂南县',
        371322: '郯城县',
        371323: '沂水县',
        371324: '兰陵县',
        371325: '费县',
        371326: '平邑县',
        371327: '莒南县',
        371328: '蒙阴县',
        371329: '临沭县',
        371402: '德城区',
        371403: '陵城区',
        371422: '宁津县',
        371423: '庆云县',
        371424: '临邑县',
        371425: '齐河县',
        371426: '平原县',
        371427: '夏津县',
        371428: '武城县',
        371481: '乐陵市',
        371482: '禹城市',
        371502: '东昌府区',
        371521: '阳谷县',
        371522: '莘县',
        371523: '茌平县',
        371524: '东阿县',
        371525: '冠县',
        371526: '高唐县',
        371581: '临清市',
        371602: '滨城区',
        371603: '沾化区',
        371621: '惠民县',
        371622: '阳信县',
        371623: '无棣县',
        371625: '博兴县',
        371681: '邹平市',
        371702: '牡丹区',
        371703: '定陶区',
        371721: '曹县',
        371722: '单县',
        371723: '成武县',
        371724: '巨野县',
        371725: '郓城县',
        371726: '鄄城县',
        371728: '东明县',
        410102: '中原区',
        410103: '二七区',
        410104: '管城回族区',
        410105: '金水区',
        410106: '上街区',
        410108: '惠济区',
        410122: '中牟县',
        410181: '巩义市',
        410182: '荥阳市',
        410183: '新密市',
        410184: '新郑市',
        410185: '登封市',
        410190: '高新技术开发区',
        410191: '经济技术开发区',
        410202: '龙亭区',
        410203: '顺河回族区',
        410204: '鼓楼区',
        410205: '禹王台区',
        410212: '祥符区',
        410221: '杞县',
        410222: '通许县',
        410223: '尉氏县',
        410225: '兰考县',
        410302: '老城区',
        410303: '西工区',
        410304: '瀍河回族区',
        410305: '涧西区',
        410306: '吉利区',
        410311: '洛龙区',
        410322: '孟津县',
        410323: '新安县',
        410324: '栾川县',
        410325: '嵩县',
        410326: '汝阳县',
        410327: '宜阳县',
        410328: '洛宁县',
        410329: '伊川县',
        410381: '偃师市',
        410402: '新华区',
        410403: '卫东区',
        410404: '石龙区',
        410411: '湛河区',
        410421: '宝丰县',
        410422: '叶县',
        410423: '鲁山县',
        410425: '郏县',
        410481: '舞钢市',
        410482: '汝州市',
        410502: '文峰区',
        410503: '北关区',
        410505: '殷都区',
        410506: '龙安区',
        410522: '安阳县',
        410523: '汤阴县',
        410526: '滑县',
        410527: '内黄县',
        410581: '林州市',
        410590: '开发区',
        410602: '鹤山区',
        410603: '山城区',
        410611: '淇滨区',
        410621: '浚县',
        410622: '淇县',
        410702: '红旗区',
        410703: '卫滨区',
        410704: '凤泉区',
        410711: '牧野区',
        410721: '新乡县',
        410724: '获嘉县',
        410725: '原阳县',
        410726: '延津县',
        410727: '封丘县',
        410728: '长垣县',
        410781: '卫辉市',
        410782: '辉县市',
        410802: '解放区',
        410803: '中站区',
        410804: '马村区',
        410811: '山阳区',
        410821: '修武县',
        410822: '博爱县',
        410823: '武陟县',
        410825: '温县',
        410882: '沁阳市',
        410883: '孟州市',
        410902: '华龙区',
        410922: '清丰县',
        410923: '南乐县',
        410926: '范县',
        410927: '台前县',
        410928: '濮阳县',
        411002: '魏都区',
        411003: '建安区',
        411024: '鄢陵县',
        411025: '襄城县',
        411081: '禹州市',
        411082: '长葛市',
        411102: '源汇区',
        411103: '郾城区',
        411104: '召陵区',
        411121: '舞阳县',
        411122: '临颍县',
        411202: '湖滨区',
        411203: '陕州区',
        411221: '渑池县',
        411224: '卢氏县',
        411281: '义马市',
        411282: '灵宝市',
        411302: '宛城区',
        411303: '卧龙区',
        411321: '南召县',
        411322: '方城县',
        411323: '西峡县',
        411324: '镇平县',
        411325: '内乡县',
        411326: '淅川县',
        411327: '社旗县',
        411328: '唐河县',
        411329: '新野县',
        411330: '桐柏县',
        411381: '邓州市',
        411402: '梁园区',
        411403: '睢阳区',
        411421: '民权县',
        411422: '睢县',
        411423: '宁陵县',
        411424: '柘城县',
        411425: '虞城县',
        411426: '夏邑县',
        411481: '永城市',
        411502: '浉河区',
        411503: '平桥区',
        411521: '罗山县',
        411522: '光山县',
        411523: '新县',
        411524: '商城县',
        411525: '固始县',
        411526: '潢川县',
        411527: '淮滨县',
        411528: '息县',
        411602: '川汇区',
        411621: '扶沟县',
        411622: '西华县',
        411623: '商水县',
        411624: '沈丘县',
        411625: '郸城县',
        411626: '淮阳县',
        411627: '太康县',
        411628: '鹿邑县',
        411681: '项城市',
        411690: '经济开发区',
        411702: '驿城区',
        411721: '西平县',
        411722: '上蔡县',
        411723: '平舆县',
        411724: '正阳县',
        411725: '确山县',
        411726: '泌阳县',
        411727: '汝南县',
        411728: '遂平县',
        411729: '新蔡县',
        419001: '济源市',
        420102: '江岸区',
        420103: '江汉区',
        420104: '硚口区',
        420105: '汉阳区',
        420106: '武昌区',
        420107: '青山区',
        420111: '洪山区',
        420112: '东西湖区',
        420113: '汉南区',
        420114: '蔡甸区',
        420115: '江夏区',
        420116: '黄陂区',
        420117: '新洲区',
        420202: '黄石港区',
        420203: '西塞山区',
        420204: '下陆区',
        420205: '铁山区',
        420222: '阳新县',
        420281: '大冶市',
        420302: '茅箭区',
        420303: '张湾区',
        420304: '郧阳区',
        420322: '郧西县',
        420323: '竹山县',
        420324: '竹溪县',
        420325: '房县',
        420381: '丹江口市',
        420502: '西陵区',
        420503: '伍家岗区',
        420504: '点军区',
        420505: '猇亭区',
        420506: '夷陵区',
        420525: '远安县',
        420526: '兴山县',
        420527: '秭归县',
        420528: '长阳土家族自治县',
        420529: '五峰土家族自治县',
        420581: '宜都市',
        420582: '当阳市',
        420583: '枝江市',
        420590: '经济开发区',
        420602: '襄城区',
        420606: '樊城区',
        420607: '襄州区',
        420624: '南漳县',
        420625: '谷城县',
        420626: '保康县',
        420682: '老河口市',
        420683: '枣阳市',
        420684: '宜城市',
        420702: '梁子湖区',
        420703: '华容区',
        420704: '鄂城区',
        420802: '东宝区',
        420804: '掇刀区',
        420822: '沙洋县',
        420881: '钟祥市',
        420882: '京山市',
        420902: '孝南区',
        420921: '孝昌县',
        420922: '大悟县',
        420923: '云梦县',
        420981: '应城市',
        420982: '安陆市',
        420984: '汉川市',
        421002: '沙市区',
        421003: '荆州区',
        421022: '公安县',
        421023: '监利县',
        421024: '江陵县',
        421081: '石首市',
        421083: '洪湖市',
        421087: '松滋市',
        421102: '黄州区',
        421121: '团风县',
        421122: '红安县',
        421123: '罗田县',
        421124: '英山县',
        421125: '浠水县',
        421126: '蕲春县',
        421127: '黄梅县',
        421181: '麻城市',
        421182: '武穴市',
        421202: '咸安区',
        421221: '嘉鱼县',
        421222: '通城县',
        421223: '崇阳县',
        421224: '通山县',
        421281: '赤壁市',
        421303: '曾都区',
        421321: '随县',
        421381: '广水市',
        422801: '恩施市',
        422802: '利川市',
        422822: '建始县',
        422823: '巴东县',
        422825: '宣恩县',
        422826: '咸丰县',
        422827: '来凤县',
        422828: '鹤峰县',
        429004: '仙桃市',
        429005: '潜江市',
        429006: '天门市',
        429021: '神农架林区',
        430102: '芙蓉区',
        430103: '天心区',
        430104: '岳麓区',
        430105: '开福区',
        430111: '雨花区',
        430112: '望城区',
        430121: '长沙县',
        430181: '浏阳市',
        430182: '宁乡市',
        430202: '荷塘区',
        430203: '芦淞区',
        430204: '石峰区',
        430211: '天元区',
        430212: '渌口区',
        430223: '攸县',
        430224: '茶陵县',
        430225: '炎陵县',
        430281: '醴陵市',
        430302: '雨湖区',
        430304: '岳塘区',
        430321: '湘潭县',
        430381: '湘乡市',
        430382: '韶山市',
        430405: '珠晖区',
        430406: '雁峰区',
        430407: '石鼓区',
        430408: '蒸湘区',
        430412: '南岳区',
        430421: '衡阳县',
        430422: '衡南县',
        430423: '衡山县',
        430424: '衡东县',
        430426: '祁东县',
        430481: '耒阳市',
        430482: '常宁市',
        430502: '双清区',
        430503: '大祥区',
        430511: '北塔区',
        430521: '邵东县',
        430522: '新邵县',
        430523: '邵阳县',
        430524: '隆回县',
        430525: '洞口县',
        430527: '绥宁县',
        430528: '新宁县',
        430529: '城步苗族自治县',
        430581: '武冈市',
        430602: '岳阳楼区',
        430603: '云溪区',
        430611: '君山区',
        430621: '岳阳县',
        430623: '华容县',
        430624: '湘阴县',
        430626: '平江县',
        430681: '汨罗市',
        430682: '临湘市',
        430702: '武陵区',
        430703: '鼎城区',
        430721: '安乡县',
        430722: '汉寿县',
        430723: '澧县',
        430724: '临澧县',
        430725: '桃源县',
        430726: '石门县',
        430781: '津市市',
        430802: '永定区',
        430811: '武陵源区',
        430821: '慈利县',
        430822: '桑植县',
        430902: '资阳区',
        430903: '赫山区',
        430921: '南县',
        430922: '桃江县',
        430923: '安化县',
        430981: '沅江市',
        431002: '北湖区',
        431003: '苏仙区',
        431021: '桂阳县',
        431022: '宜章县',
        431023: '永兴县',
        431024: '嘉禾县',
        431025: '临武县',
        431026: '汝城县',
        431027: '桂东县',
        431028: '安仁县',
        431081: '资兴市',
        431102: '零陵区',
        431103: '冷水滩区',
        431121: '祁阳县',
        431122: '东安县',
        431123: '双牌县',
        431124: '道县',
        431125: '江永县',
        431126: '宁远县',
        431127: '蓝山县',
        431128: '新田县',
        431129: '江华瑶族自治县',
        431202: '鹤城区',
        431221: '中方县',
        431222: '沅陵县',
        431223: '辰溪县',
        431224: '溆浦县',
        431225: '会同县',
        431226: '麻阳苗族自治县',
        431227: '新晃侗族自治县',
        431228: '芷江侗族自治县',
        431229: '靖州苗族侗族自治县',
        431230: '通道侗族自治县',
        431281: '洪江市',
        431302: '娄星区',
        431321: '双峰县',
        431322: '新化县',
        431381: '冷水江市',
        431382: '涟源市',
        433101: '吉首市',
        433122: '泸溪县',
        433123: '凤凰县',
        433124: '花垣县',
        433125: '保靖县',
        433126: '古丈县',
        433127: '永顺县',
        433130: '龙山县',
        440103: '荔湾区',
        440104: '越秀区',
        440105: '海珠区',
        440106: '天河区',
        440111: '白云区',
        440112: '黄埔区',
        440113: '番禺区',
        440114: '花都区',
        440115: '南沙区',
        440117: '从化区',
        440118: '增城区',
        440203: '武江区',
        440204: '浈江区',
        440205: '曲江区',
        440222: '始兴县',
        440224: '仁化县',
        440229: '翁源县',
        440232: '乳源瑶族自治县',
        440233: '新丰县',
        440281: '乐昌市',
        440282: '南雄市',
        440303: '罗湖区',
        440304: '福田区',
        440305: '南山区',
        440306: '宝安区',
        440307: '龙岗区',
        440308: '盐田区',
        440309: '龙华区',
        440310: '坪山区',
        440311: '光明区',
        440402: '香洲区',
        440403: '斗门区',
        440404: '金湾区',
        440507: '龙湖区',
        440511: '金平区',
        440512: '濠江区',
        440513: '潮阳区',
        440514: '潮南区',
        440515: '澄海区',
        440523: '南澳县',
        440604: '禅城区',
        440605: '南海区',
        440606: '顺德区',
        440607: '三水区',
        440608: '高明区',
        440703: '蓬江区',
        440704: '江海区',
        440705: '新会区',
        440781: '台山市',
        440783: '开平市',
        440784: '鹤山市',
        440785: '恩平市',
        440802: '赤坎区',
        440803: '霞山区',
        440804: '坡头区',
        440811: '麻章区',
        440823: '遂溪县',
        440825: '徐闻县',
        440881: '廉江市',
        440882: '雷州市',
        440883: '吴川市',
        440890: '经济技术开发区',
        440902: '茂南区',
        440904: '电白区',
        440981: '高州市',
        440982: '化州市',
        440983: '信宜市',
        441202: '端州区',
        441203: '鼎湖区',
        441204: '高要区',
        441223: '广宁县',
        441224: '怀集县',
        441225: '封开县',
        441226: '德庆县',
        441284: '四会市',
        441302: '惠城区',
        441303: '惠阳区',
        441322: '博罗县',
        441323: '惠东县',
        441324: '龙门县',
        441402: '梅江区',
        441403: '梅县区',
        441422: '大埔县',
        441423: '丰顺县',
        441424: '五华县',
        441426: '平远县',
        441427: '蕉岭县',
        441481: '兴宁市',
        441502: '城区',
        441521: '海丰县',
        441523: '陆河县',
        441581: '陆丰市',
        441602: '源城区',
        441621: '紫金县',
        441622: '龙川县',
        441623: '连平县',
        441624: '和平县',
        441625: '东源县',
        441702: '江城区',
        441704: '阳东区',
        441721: '阳西县',
        441781: '阳春市',
        441802: '清城区',
        441803: '清新区',
        441821: '佛冈县',
        441823: '阳山县',
        441825: '连山壮族瑶族自治县',
        441826: '连南瑶族自治县',
        441881: '英德市',
        441882: '连州市',
        441901: '中堂镇',
        441903: '南城街道办事处',
        441904: '长安镇',
        441905: '东坑镇',
        441906: '樟木头镇',
        441907: '莞城街道办事处',
        441908: '石龙镇',
        441909: '桥头镇',
        441910: '万江街道办事处',
        441911: '麻涌镇',
        441912: '虎门镇',
        441913: '谢岗镇',
        441914: '石碣镇',
        441915: '茶山镇',
        441916: '东城街道办事处',
        441917: '洪梅镇',
        441918: '道滘镇',
        441919: '高埗镇',
        441920: '企石镇',
        441921: '凤岗镇',
        441922: '大岭山镇',
        441923: '松山湖管委会',
        441924: '清溪镇',
        441925: '望牛墩镇',
        441926: '厚街镇',
        441927: '常平镇',
        441928: '寮步镇',
        441929: '石排镇',
        441930: '横沥镇',
        441931: '塘厦镇',
        441932: '黄江镇',
        441933: '大朗镇',
        441934: '东莞港',
        441935: '东莞生态园',
        441990: '沙田镇',
        442001: '南头镇',
        442002: '神湾镇',
        442003: '东凤镇',
        442004: '五桂山街道办事处',
        442005: '黄圃镇',
        442006: '小榄镇',
        442007: '石岐区街道办事处',
        442008: '横栏镇',
        442009: '三角镇',
        442010: '三乡镇',
        442011: '港口镇',
        442012: '沙溪镇',
        442013: '板芙镇',
        442015: '东升镇',
        442016: '阜沙镇',
        442017: '民众镇',
        442018: '东区街道办事处',
        442019: '火炬开发区街道办事处',
        442020: '西区街道办事处',
        442021: '南区街道办事处',
        442022: '古镇镇',
        442023: '坦洲镇',
        442024: '大涌镇',
        442025: '南朗镇',
        445102: '湘桥区',
        445103: '潮安区',
        445122: '饶平县',
        445202: '榕城区',
        445203: '揭东区',
        445222: '揭西县',
        445224: '惠来县',
        445281: '普宁市',
        445302: '云城区',
        445303: '云安区',
        445321: '新兴县',
        445322: '郁南县',
        445381: '罗定市',
        450102: '兴宁区',
        450103: '青秀区',
        450105: '江南区',
        450107: '西乡塘区',
        450108: '良庆区',
        450109: '邕宁区',
        450110: '武鸣区',
        450123: '隆安县',
        450124: '马山县',
        450125: '上林县',
        450126: '宾阳县',
        450127: '横县',
        450202: '城中区',
        450203: '鱼峰区',
        450204: '柳南区',
        450205: '柳北区',
        450206: '柳江区',
        450222: '柳城县',
        450223: '鹿寨县',
        450224: '融安县',
        450225: '融水苗族自治县',
        450226: '三江侗族自治县',
        450302: '秀峰区',
        450303: '叠彩区',
        450304: '象山区',
        450305: '七星区',
        450311: '雁山区',
        450312: '临桂区',
        450321: '阳朔县',
        450323: '灵川县',
        450324: '全州县',
        450325: '兴安县',
        450326: '永福县',
        450327: '灌阳县',
        450328: '龙胜各族自治县',
        450329: '资源县',
        450330: '平乐县',
        450332: '恭城瑶族自治县',
        450381: '荔浦市',
        450403: '万秀区',
        450405: '长洲区',
        450406: '龙圩区',
        450421: '苍梧县',
        450422: '藤县',
        450423: '蒙山县',
        450481: '岑溪市',
        450502: '海城区',
        450503: '银海区',
        450512: '铁山港区',
        450521: '合浦县',
        450602: '港口区',
        450603: '防城区',
        450621: '上思县',
        450681: '东兴市',
        450702: '钦南区',
        450703: '钦北区',
        450721: '灵山县',
        450722: '浦北县',
        450802: '港北区',
        450803: '港南区',
        450804: '覃塘区',
        450821: '平南县',
        450881: '桂平市',
        450902: '玉州区',
        450903: '福绵区',
        450921: '容县',
        450922: '陆川县',
        450923: '博白县',
        450924: '兴业县',
        450981: '北流市',
        451002: '右江区',
        451021: '田阳县',
        451022: '田东县',
        451023: '平果县',
        451024: '德保县',
        451026: '那坡县',
        451027: '凌云县',
        451028: '乐业县',
        451029: '田林县',
        451030: '西林县',
        451031: '隆林各族自治县',
        451081: '靖西市',
        451102: '八步区',
        451103: '平桂区',
        451121: '昭平县',
        451122: '钟山县',
        451123: '富川瑶族自治县',
        451202: '金城江区',
        451203: '宜州区',
        451221: '南丹县',
        451222: '天峨县',
        451223: '凤山县',
        451224: '东兰县',
        451225: '罗城仫佬族自治县',
        451226: '环江毛南族自治县',
        451227: '巴马瑶族自治县',
        451228: '都安瑶族自治县',
        451229: '大化瑶族自治县',
        451302: '兴宾区',
        451321: '忻城县',
        451322: '象州县',
        451323: '武宣县',
        451324: '金秀瑶族自治县',
        451381: '合山市',
        451402: '江州区',
        451421: '扶绥县',
        451422: '宁明县',
        451423: '龙州县',
        451424: '大新县',
        451425: '天等县',
        451481: '凭祥市',
        460105: '秀英区',
        460106: '龙华区',
        460107: '琼山区',
        460108: '美兰区',
        460202: '海棠区',
        460203: '吉阳区',
        460204: '天涯区',
        460205: '崖州区',
        460321: '西沙群岛',
        460322: '南沙群岛',
        460323: '中沙群岛的岛礁及其海域',
        460401: '那大镇',
        460402: '和庆镇',
        460403: '南丰镇',
        460404: '大成镇',
        460405: '雅星镇',
        460406: '兰洋镇',
        460407: '光村镇',
        460408: '木棠镇',
        460409: '海头镇',
        460410: '峨蔓镇',
        460411: '王五镇',
        460412: '白马井镇',
        460413: '中和镇',
        460414: '排浦镇',
        460415: '东成镇',
        460416: '新州镇',
        460417: '洋浦经济开发区',
        460418: '华南热作学院',
        469001: '五指山市',
        469002: '琼海市',
        469005: '文昌市',
        469006: '万宁市',
        469007: '东方市',
        469021: '定安县',
        469022: '屯昌县',
        469023: '澄迈县',
        469024: '临高县',
        469025: '白沙黎族自治县',
        469026: '昌江黎族自治县',
        469027: '乐东黎族自治县',
        469028: '陵水黎族自治县',
        469029: '保亭黎族苗族自治县',
        469030: '琼中黎族苗族自治县',
        500101: '万州区',
        500102: '涪陵区',
        500103: '渝中区',
        500104: '大渡口区',
        500105: '江北区',
        500106: '沙坪坝区',
        500107: '九龙坡区',
        500108: '南岸区',
        500109: '北碚区',
        500110: '綦江区',
        500111: '大足区',
        500112: '渝北区',
        500113: '巴南区',
        500114: '黔江区',
        500115: '长寿区',
        500116: '江津区',
        500117: '合川区',
        500118: '永川区',
        500119: '南川区',
        500120: '璧山区',
        500151: '铜梁区',
        500152: '潼南区',
        500153: '荣昌区',
        500154: '开州区',
        500155: '梁平区',
        500156: '武隆区',
        500229: '城口县',
        500230: '丰都县',
        500231: '垫江县',
        500233: '忠县',
        500235: '云阳县',
        500236: '奉节县',
        500237: '巫山县',
        500238: '巫溪县',
        500240: '石柱土家族自治县',
        500241: '秀山土家族苗族自治县',
        500242: '酉阳土家族苗族自治县',
        500243: '彭水苗族土家族自治县',
        510104: '锦江区',
        510105: '青羊区',
        510106: '金牛区',
        510107: '武侯区',
        510108: '成华区',
        510112: '龙泉驿区',
        510113: '青白江区',
        510114: '新都区',
        510115: '温江区',
        510116: '双流区',
        510117: '郫都区',
        510121: '金堂县',
        510129: '大邑县',
        510131: '蒲江县',
        510132: '新津县',
        510181: '都江堰市',
        510182: '彭州市',
        510183: '邛崃市',
        510184: '崇州市',
        510185: '简阳市',
        510191: '高新区',
        510302: '自流井区',
        510303: '贡井区',
        510304: '大安区',
        510311: '沿滩区',
        510321: '荣县',
        510322: '富顺县',
        510402: '东区',
        510403: '西区',
        510411: '仁和区',
        510421: '米易县',
        510422: '盐边县',
        510502: '江阳区',
        510503: '纳溪区',
        510504: '龙马潭区',
        510521: '泸县',
        510522: '合江县',
        510524: '叙永县',
        510525: '古蔺县',
        510603: '旌阳区',
        510604: '罗江区',
        510623: '中江县',
        510681: '广汉市',
        510682: '什邡市',
        510683: '绵竹市',
        510703: '涪城区',
        510704: '游仙区',
        510705: '安州区',
        510722: '三台县',
        510723: '盐亭县',
        510725: '梓潼县',
        510726: '北川羌族自治县',
        510727: '平武县',
        510781: '江油市',
        510791: '高新区',
        510802: '利州区',
        510811: '昭化区',
        510812: '朝天区',
        510821: '旺苍县',
        510822: '青川县',
        510823: '剑阁县',
        510824: '苍溪县',
        510903: '船山区',
        510904: '安居区',
        510921: '蓬溪县',
        510922: '射洪县',
        510923: '大英县',
        511002: '市中区',
        511011: '东兴区',
        511024: '威远县',
        511025: '资中县',
        511083: '隆昌市',
        511102: '市中区',
        511111: '沙湾区',
        511112: '五通桥区',
        511113: '金口河区',
        511123: '犍为县',
        511124: '井研县',
        511126: '夹江县',
        511129: '沐川县',
        511132: '峨边彝族自治县',
        511133: '马边彝族自治县',
        511181: '峨眉山市',
        511302: '顺庆区',
        511303: '高坪区',
        511304: '嘉陵区',
        511321: '南部县',
        511322: '营山县',
        511323: '蓬安县',
        511324: '仪陇县',
        511325: '西充县',
        511381: '阆中市',
        511402: '东坡区',
        511403: '彭山区',
        511421: '仁寿县',
        511423: '洪雅县',
        511424: '丹棱县',
        511425: '青神县',
        511502: '翠屏区',
        511503: '南溪区',
        511504: '叙州区',
        511523: '江安县',
        511524: '长宁县',
        511525: '高县',
        511526: '珙县',
        511527: '筠连县',
        511528: '兴文县',
        511529: '屏山县',
        511602: '广安区',
        511603: '前锋区',
        511621: '岳池县',
        511622: '武胜县',
        511623: '邻水县',
        511681: '华蓥市',
        511702: '通川区',
        511703: '达川区',
        511722: '宣汉县',
        511723: '开江县',
        511724: '大竹县',
        511725: '渠县',
        511781: '万源市',
        511802: '雨城区',
        511803: '名山区',
        511822: '荥经县',
        511823: '汉源县',
        511824: '石棉县',
        511825: '天全县',
        511826: '芦山县',
        511827: '宝兴县',
        511902: '巴州区',
        511903: '恩阳区',
        511921: '通江县',
        511922: '南江县',
        511923: '平昌县',
        512002: '雁江区',
        512021: '安岳县',
        512022: '乐至县',
        513201: '马尔康市',
        513221: '汶川县',
        513222: '理县',
        513223: '茂县',
        513224: '松潘县',
        513225: '九寨沟县',
        513226: '金川县',
        513227: '小金县',
        513228: '黑水县',
        513230: '壤塘县',
        513231: '阿坝县',
        513232: '若尔盖县',
        513233: '红原县',
        513301: '康定市',
        513322: '泸定县',
        513323: '丹巴县',
        513324: '九龙县',
        513325: '雅江县',
        513326: '道孚县',
        513327: '炉霍县',
        513328: '甘孜县',
        513329: '新龙县',
        513330: '德格县',
        513331: '白玉县',
        513332: '石渠县',
        513333: '色达县',
        513334: '理塘县',
        513335: '巴塘县',
        513336: '乡城县',
        513337: '稻城县',
        513338: '得荣县',
        513401: '西昌市',
        513422: '木里藏族自治县',
        513423: '盐源县',
        513424: '德昌县',
        513425: '会理县',
        513426: '会东县',
        513427: '宁南县',
        513428: '普格县',
        513429: '布拖县',
        513430: '金阳县',
        513431: '昭觉县',
        513432: '喜德县',
        513433: '冕宁县',
        513434: '越西县',
        513435: '甘洛县',
        513436: '美姑县',
        513437: '雷波县',
        520102: '南明区',
        520103: '云岩区',
        520111: '花溪区',
        520112: '乌当区',
        520113: '白云区',
        520115: '观山湖区',
        520121: '开阳县',
        520122: '息烽县',
        520123: '修文县',
        520181: '清镇市',
        520201: '钟山区',
        520203: '六枝特区',
        520221: '水城县',
        520281: '盘州市',
        520302: '红花岗区',
        520303: '汇川区',
        520304: '播州区',
        520322: '桐梓县',
        520323: '绥阳县',
        520324: '正安县',
        520325: '道真仡佬族苗族自治县',
        520326: '务川仡佬族苗族自治县',
        520327: '凤冈县',
        520328: '湄潭县',
        520329: '余庆县',
        520330: '习水县',
        520381: '赤水市',
        520382: '仁怀市',
        520402: '西秀区',
        520403: '平坝区',
        520422: '普定县',
        520423: '镇宁布依族苗族自治县',
        520424: '关岭布依族苗族自治县',
        520425: '紫云苗族布依族自治县',
        520502: '七星关区',
        520521: '大方县',
        520522: '黔西县',
        520523: '金沙县',
        520524: '织金县',
        520525: '纳雍县',
        520526: '威宁彝族回族苗族自治县',
        520527: '赫章县',
        520602: '碧江区',
        520603: '万山区',
        520621: '江口县',
        520622: '玉屏侗族自治县',
        520623: '石阡县',
        520624: '思南县',
        520625: '印江土家族苗族自治县',
        520626: '德江县',
        520627: '沿河土家族自治县',
        520628: '松桃苗族自治县',
        522301: '兴义市',
        522302: '兴仁市',
        522323: '普安县',
        522324: '晴隆县',
        522325: '贞丰县',
        522326: '望谟县',
        522327: '册亨县',
        522328: '安龙县',
        522601: '凯里市',
        522622: '黄平县',
        522623: '施秉县',
        522624: '三穗县',
        522625: '镇远县',
        522626: '岑巩县',
        522627: '天柱县',
        522628: '锦屏县',
        522629: '剑河县',
        522630: '台江县',
        522631: '黎平县',
        522632: '榕江县',
        522633: '从江县',
        522634: '雷山县',
        522635: '麻江县',
        522636: '丹寨县',
        522701: '都匀市',
        522702: '福泉市',
        522722: '荔波县',
        522723: '贵定县',
        522725: '瓮安县',
        522726: '独山县',
        522727: '平塘县',
        522728: '罗甸县',
        522729: '长顺县',
        522730: '龙里县',
        522731: '惠水县',
        522732: '三都水族自治县',
        530102: '五华区',
        530103: '盘龙区',
        530111: '官渡区',
        530112: '西山区',
        530113: '东川区',
        530114: '呈贡区',
        530115: '晋宁区',
        530124: '富民县',
        530125: '宜良县',
        530126: '石林彝族自治县',
        530127: '嵩明县',
        530128: '禄劝彝族苗族自治县',
        530129: '寻甸回族彝族自治县',
        530181: '安宁市',
        530302: '麒麟区',
        530303: '沾益区',
        530304: '马龙区',
        530322: '陆良县',
        530323: '师宗县',
        530324: '罗平县',
        530325: '富源县',
        530326: '会泽县',
        530381: '宣威市',
        530402: '红塔区',
        530403: '江川区',
        530422: '澄江县',
        530423: '通海县',
        530424: '华宁县',
        530425: '易门县',
        530426: '峨山彝族自治县',
        530427: '新平彝族傣族自治县',
        530428: '元江哈尼族彝族傣族自治县',
        530502: '隆阳区',
        530521: '施甸县',
        530523: '龙陵县',
        530524: '昌宁县',
        530581: '腾冲市',
        530602: '昭阳区',
        530621: '鲁甸县',
        530622: '巧家县',
        530623: '盐津县',
        530624: '大关县',
        530625: '永善县',
        530626: '绥江县',
        530627: '镇雄县',
        530628: '彝良县',
        530629: '威信县',
        530681: '水富市',
        530702: '古城区',
        530721: '玉龙纳西族自治县',
        530722: '永胜县',
        530723: '华坪县',
        530724: '宁蒗彝族自治县',
        530802: '思茅区',
        530821: '宁洱哈尼族彝族自治县',
        530822: '墨江哈尼族自治县',
        530823: '景东彝族自治县',
        530824: '景谷傣族彝族自治县',
        530825: '镇沅彝族哈尼族拉祜族自治县',
        530826: '江城哈尼族彝族自治县',
        530827: '孟连傣族拉祜族佤族自治县',
        530828: '澜沧拉祜族自治县',
        530829: '西盟佤族自治县',
        530902: '临翔区',
        530921: '凤庆县',
        530922: '云县',
        530923: '永德县',
        530924: '镇康县',
        530925: '双江拉祜族佤族布朗族傣族自治县',
        530926: '耿马傣族佤族自治县',
        530927: '沧源佤族自治县',
        532301: '楚雄市',
        532322: '双柏县',
        532323: '牟定县',
        532324: '南华县',
        532325: '姚安县',
        532326: '大姚县',
        532327: '永仁县',
        532328: '元谋县',
        532329: '武定县',
        532331: '禄丰县',
        532501: '个旧市',
        532502: '开远市',
        532503: '蒙自市',
        532504: '弥勒市',
        532523: '屏边苗族自治县',
        532524: '建水县',
        532525: '石屏县',
        532527: '泸西县',
        532528: '元阳县',
        532529: '红河县',
        532530: '金平苗族瑶族傣族自治县',
        532531: '绿春县',
        532532: '河口瑶族自治县',
        532601: '文山市',
        532622: '砚山县',
        532623: '西畴县',
        532624: '麻栗坡县',
        532625: '马关县',
        532626: '丘北县',
        532627: '广南县',
        532628: '富宁县',
        532801: '景洪市',
        532822: '勐海县',
        532823: '勐腊县',
        532901: '大理市',
        532922: '漾濞彝族自治县',
        532923: '祥云县',
        532924: '宾川县',
        532925: '弥渡县',
        532926: '南涧彝族自治县',
        532927: '巍山彝族回族自治县',
        532928: '永平县',
        532929: '云龙县',
        532930: '洱源县',
        532931: '剑川县',
        532932: '鹤庆县',
        533102: '瑞丽市',
        533103: '芒市',
        533122: '梁河县',
        533123: '盈江县',
        533124: '陇川县',
        533301: '泸水市',
        533323: '福贡县',
        533324: '贡山独龙族怒族自治县',
        533325: '兰坪白族普米族自治县',
        533401: '香格里拉市',
        533422: '德钦县',
        533423: '维西傈僳族自治县',
        540102: '城关区',
        540103: '堆龙德庆区',
        540104: '达孜区',
        540121: '林周县',
        540122: '当雄县',
        540123: '尼木县',
        540124: '曲水县',
        540127: '墨竹工卡县',
        540202: '桑珠孜区',
        540221: '南木林县',
        540222: '江孜县',
        540223: '定日县',
        540224: '萨迦县',
        540225: '拉孜县',
        540226: '昂仁县',
        540227: '谢通门县',
        540228: '白朗县',
        540229: '仁布县',
        540230: '康马县',
        540231: '定结县',
        540232: '仲巴县',
        540233: '亚东县',
        540234: '吉隆县',
        540235: '聂拉木县',
        540236: '萨嘎县',
        540237: '岗巴县',
        540302: '卡若区',
        540321: '江达县',
        540322: '贡觉县',
        540323: '类乌齐县',
        540324: '丁青县',
        540325: '察雅县',
        540326: '八宿县',
        540327: '左贡县',
        540328: '芒康县',
        540329: '洛隆县',
        540330: '边坝县',
        540402: '巴宜区',
        540421: '工布江达县',
        540422: '米林县',
        540423: '墨脱县',
        540424: '波密县',
        540425: '察隅县',
        540426: '朗县',
        540502: '乃东区',
        540521: '扎囊县',
        540522: '贡嘎县',
        540523: '桑日县',
        540524: '琼结县',
        540525: '曲松县',
        540526: '措美县',
        540527: '洛扎县',
        540528: '加查县',
        540529: '隆子县',
        540530: '错那县',
        540531: '浪卡子县',
        540602: '色尼区',
        540621: '嘉黎县',
        540622: '比如县',
        540623: '聂荣县',
        540624: '安多县',
        540625: '申扎县',
        540626: '索县',
        540627: '班戈县',
        540628: '巴青县',
        540629: '尼玛县',
        540630: '双湖县',
        542521: '普兰县',
        542522: '札达县',
        542523: '噶尔县',
        542524: '日土县',
        542525: '革吉县',
        542526: '改则县',
        542527: '措勤县',
        610102: '新城区',
        610103: '碑林区',
        610104: '莲湖区',
        610111: '灞桥区',
        610112: '未央区',
        610113: '雁塔区',
        610114: '阎良区',
        610115: '临潼区',
        610116: '长安区',
        610117: '高陵区',
        610118: '鄠邑区',
        610122: '蓝田县',
        610124: '周至县',
        610202: '王益区',
        610203: '印台区',
        610204: '耀州区',
        610222: '宜君县',
        610302: '渭滨区',
        610303: '金台区',
        610304: '陈仓区',
        610322: '凤翔县',
        610323: '岐山县',
        610324: '扶风县',
        610326: '眉县',
        610327: '陇县',
        610328: '千阳县',
        610329: '麟游县',
        610330: '凤县',
        610331: '太白县',
        610402: '秦都区',
        610403: '杨陵区',
        610404: '渭城区',
        610422: '三原县',
        610423: '泾阳县',
        610424: '乾县',
        610425: '礼泉县',
        610426: '永寿县',
        610428: '长武县',
        610429: '旬邑县',
        610430: '淳化县',
        610431: '武功县',
        610481: '兴平市',
        610482: '彬州市',
        610502: '临渭区',
        610503: '华州区',
        610522: '潼关县',
        610523: '大荔县',
        610524: '合阳县',
        610525: '澄城县',
        610526: '蒲城县',
        610527: '白水县',
        610528: '富平县',
        610581: '韩城市',
        610582: '华阴市',
        610602: '宝塔区',
        610603: '安塞区',
        610621: '延长县',
        610622: '延川县',
        610623: '子长县',
        610625: '志丹县',
        610626: '吴起县',
        610627: '甘泉县',
        610628: '富县',
        610629: '洛川县',
        610630: '宜川县',
        610631: '黄龙县',
        610632: '黄陵县',
        610702: '汉台区',
        610703: '南郑区',
        610722: '城固县',
        610723: '洋县',
        610724: '西乡县',
        610725: '勉县',
        610726: '宁强县',
        610727: '略阳县',
        610728: '镇巴县',
        610729: '留坝县',
        610730: '佛坪县',
        610802: '榆阳区',
        610803: '横山区',
        610822: '府谷县',
        610824: '靖边县',
        610825: '定边县',
        610826: '绥德县',
        610827: '米脂县',
        610828: '佳县',
        610829: '吴堡县',
        610830: '清涧县',
        610831: '子洲县',
        610881: '神木市',
        610902: '汉滨区',
        610921: '汉阴县',
        610922: '石泉县',
        610923: '宁陕县',
        610924: '紫阳县',
        610925: '岚皋县',
        610926: '平利县',
        610927: '镇坪县',
        610928: '旬阳县',
        610929: '白河县',
        611002: '商州区',
        611021: '洛南县',
        611022: '丹凤县',
        611023: '商南县',
        611024: '山阳县',
        611025: '镇安县',
        611026: '柞水县',
        620102: '城关区',
        620103: '七里河区',
        620104: '西固区',
        620105: '安宁区',
        620111: '红古区',
        620121: '永登县',
        620122: '皋兰县',
        620123: '榆中县',
        620201: '市辖区',
        620290: '雄关区',
        620291: '长城区',
        620292: '镜铁区',
        620293: '新城镇',
        620294: '峪泉镇',
        620295: '文殊镇',
        620302: '金川区',
        620321: '永昌县',
        620402: '白银区',
        620403: '平川区',
        620421: '靖远县',
        620422: '会宁县',
        620423: '景泰县',
        620502: '秦州区',
        620503: '麦积区',
        620521: '清水县',
        620522: '秦安县',
        620523: '甘谷县',
        620524: '武山县',
        620525: '张家川回族自治县',
        620602: '凉州区',
        620621: '民勤县',
        620622: '古浪县',
        620623: '天祝藏族自治县',
        620702: '甘州区',
        620721: '肃南裕固族自治县',
        620722: '民乐县',
        620723: '临泽县',
        620724: '高台县',
        620725: '山丹县',
        620802: '崆峒区',
        620821: '泾川县',
        620822: '灵台县',
        620823: '崇信县',
        620825: '庄浪县',
        620826: '静宁县',
        620881: '华亭市',
        620902: '肃州区',
        620921: '金塔县',
        620922: '瓜州县',
        620923: '肃北蒙古族自治县',
        620924: '阿克塞哈萨克族自治县',
        620981: '玉门市',
        620982: '敦煌市',
        621002: '西峰区',
        621021: '庆城县',
        621022: '环县',
        621023: '华池县',
        621024: '合水县',
        621025: '正宁县',
        621026: '宁县',
        621027: '镇原县',
        621102: '安定区',
        621121: '通渭县',
        621122: '陇西县',
        621123: '渭源县',
        621124: '临洮县',
        621125: '漳县',
        621126: '岷县',
        621202: '武都区',
        621221: '成县',
        621222: '文县',
        621223: '宕昌县',
        621224: '康县',
        621225: '西和县',
        621226: '礼县',
        621227: '徽县',
        621228: '两当县',
        622901: '临夏市',
        622921: '临夏县',
        622922: '康乐县',
        622923: '永靖县',
        622924: '广河县',
        622925: '和政县',
        622926: '东乡族自治县',
        622927: '积石山保安族东乡族撒拉族自治县',
        623001: '合作市',
        623021: '临潭县',
        623022: '卓尼县',
        623023: '舟曲县',
        623024: '迭部县',
        623025: '玛曲县',
        623026: '碌曲县',
        623027: '夏河县',
        630102: '城东区',
        630103: '城中区',
        630104: '城西区',
        630105: '城北区',
        630121: '大通回族土族自治县',
        630122: '湟中县',
        630123: '湟源县',
        630202: '乐都区',
        630203: '平安区',
        630222: '民和回族土族自治县',
        630223: '互助土族自治县',
        630224: '化隆回族自治县',
        630225: '循化撒拉族自治县',
        632221: '门源回族自治县',
        632222: '祁连县',
        632223: '海晏县',
        632224: '刚察县',
        632321: '同仁县',
        632322: '尖扎县',
        632323: '泽库县',
        632324: '河南蒙古族自治县',
        632521: '共和县',
        632522: '同德县',
        632523: '贵德县',
        632524: '兴海县',
        632525: '贵南县',
        632621: '玛沁县',
        632622: '班玛县',
        632623: '甘德县',
        632624: '达日县',
        632625: '久治县',
        632626: '玛多县',
        632701: '玉树市',
        632722: '杂多县',
        632723: '称多县',
        632724: '治多县',
        632725: '囊谦县',
        632726: '曲麻莱县',
        632801: '格尔木市',
        632802: '德令哈市',
        632803: '茫崖市',
        632821: '乌兰县',
        632822: '都兰县',
        632823: '天峻县',
        640104: '兴庆区',
        640105: '西夏区',
        640106: '金凤区',
        640121: '永宁县',
        640122: '贺兰县',
        640181: '灵武市',
        640202: '大武口区',
        640205: '惠农区',
        640221: '平罗县',
        640302: '利通区',
        640303: '红寺堡区',
        640323: '盐池县',
        640324: '同心县',
        640381: '青铜峡市',
        640402: '原州区',
        640422: '西吉县',
        640423: '隆德县',
        640424: '泾源县',
        640425: '彭阳县',
        640502: '沙坡头区',
        640521: '中宁县',
        640522: '海原县',
        650102: '天山区',
        650103: '沙依巴克区',
        650104: '新市区',
        650105: '水磨沟区',
        650106: '头屯河区',
        650107: '达坂城区',
        650109: '米东区',
        650121: '乌鲁木齐县',
        650202: '独山子区',
        650203: '克拉玛依区',
        650204: '白碱滩区',
        650205: '乌尔禾区',
        650402: '高昌区',
        650421: '鄯善县',
        650422: '托克逊县',
        650502: '伊州区',
        650521: '巴里坤哈萨克自治县',
        650522: '伊吾县',
        652301: '昌吉市',
        652302: '阜康市',
        652323: '呼图壁县',
        652324: '玛纳斯县',
        652325: '奇台县',
        652327: '吉木萨尔县',
        652328: '木垒哈萨克自治县',
        652701: '博乐市',
        652702: '阿拉山口市',
        652722: '精河县',
        652723: '温泉县',
        652801: '库尔勒市',
        652822: '轮台县',
        652823: '尉犁县',
        652824: '若羌县',
        652825: '且末县',
        652826: '焉耆回族自治县',
        652827: '和静县',
        652828: '和硕县',
        652829: '博湖县',
        652901: '阿克苏市',
        652922: '温宿县',
        652923: '库车县',
        652924: '沙雅县',
        652925: '新和县',
        652926: '拜城县',
        652927: '乌什县',
        652928: '阿瓦提县',
        652929: '柯坪县',
        653001: '阿图什市',
        653022: '阿克陶县',
        653023: '阿合奇县',
        653024: '乌恰县',
        653101: '喀什市',
        653121: '疏附县',
        653122: '疏勒县',
        653123: '英吉沙县',
        653124: '泽普县',
        653125: '莎车县',
        653126: '叶城县',
        653127: '麦盖提县',
        653128: '岳普湖县',
        653129: '伽师县',
        653130: '巴楚县',
        653131: '塔什库尔干塔吉克自治县',
        653201: '和田市',
        653221: '和田县',
        653222: '墨玉县',
        653223: '皮山县',
        653224: '洛浦县',
        653225: '策勒县',
        653226: '于田县',
        653227: '民丰县',
        654002: '伊宁市',
        654003: '奎屯市',
        654004: '霍尔果斯市',
        654021: '伊宁县',
        654022: '察布查尔锡伯自治县',
        654023: '霍城县',
        654024: '巩留县',
        654025: '新源县',
        654026: '昭苏县',
        654027: '特克斯县',
        654028: '尼勒克县',
        654201: '塔城市',
        654202: '乌苏市',
        654221: '额敏县',
        654223: '沙湾县',
        654224: '托里县',
        654225: '裕民县',
        654226: '和布克赛尔蒙古自治县',
        654301: '阿勒泰市',
        654321: '布尔津县',
        654322: '富蕴县',
        654323: '福海县',
        654324: '哈巴河县',
        654325: '青河县',
        654326: '吉木乃县',
        659001: '石河子市',
        659002: '阿拉尔市',
        659003: '图木舒克市',
        659004: '五家渠市',
        659005: '北屯市',
        659006: '铁门关市',
        659007: '双河市',
        659008: '可克达拉市',
        659009: '昆玉市',
        710101: '中正区',
        710102: '大同区',
        710103: '中山区',
        710104: '松山区',
        710105: '大安区',
        710106: '万华区',
        710107: '信义区',
        710108: '士林区',
        710109: '北投区',
        710110: '内湖区',
        710111: '南港区',
        710112: '文山区',
        710199: '其它区',
        710201: '新兴区',
        710202: '前金区',
        710203: '芩雅区',
        710204: '盐埕区',
        710205: '鼓山区',
        710206: '旗津区',
        710207: '前镇区',
        710208: '三民区',
        710209: '左营区',
        710210: '楠梓区',
        710211: '小港区',
        710241: '苓雅区',
        710242: '仁武区',
        710243: '大社区',
        710244: '冈山区',
        710245: '路竹区',
        710246: '阿莲区',
        710247: '田寮区',
        710248: '燕巢区',
        710249: '桥头区',
        710250: '梓官区',
        710251: '弥陀区',
        710252: '永安区',
        710253: '湖内区',
        710254: '凤山区',
        710255: '大寮区',
        710256: '林园区',
        710257: '鸟松区',
        710258: '大树区',
        710259: '旗山区',
        710260: '美浓区',
        710261: '六龟区',
        710262: '内门区',
        710263: '杉林区',
        710264: '甲仙区',
        710265: '桃源区',
        710266: '那玛夏区',
        710267: '茂林区',
        710268: '茄萣区',
        710299: '其它区',
        710301: '中西区',
        710302: '东区',
        710303: '南区',
        710304: '北区',
        710305: '安平区',
        710306: '安南区',
        710339: '永康区',
        710340: '归仁区',
        710341: '新化区',
        710342: '左镇区',
        710343: '玉井区',
        710344: '楠西区',
        710345: '南化区',
        710346: '仁德区',
        710347: '关庙区',
        710348: '龙崎区',
        710349: '官田区',
        710350: '麻豆区',
        710351: '佳里区',
        710352: '西港区',
        710353: '七股区',
        710354: '将军区',
        710355: '学甲区',
        710356: '北门区',
        710357: '新营区',
        710358: '后壁区',
        710359: '白河区',
        710360: '东山区',
        710361: '六甲区',
        710362: '下营区',
        710363: '柳营区',
        710364: '盐水区',
        710365: '善化区',
        710366: '大内区',
        710367: '山上区',
        710368: '新市区',
        710369: '安定区',
        710399: '其它区',
        710401: '中区',
        710402: '东区',
        710403: '南区',
        710404: '西区',
        710405: '北区',
        710406: '北屯区',
        710407: '西屯区',
        710408: '南屯区',
        710431: '太平区',
        710432: '大里区',
        710433: '雾峰区',
        710434: '乌日区',
        710435: '丰原区',
        710436: '后里区',
        710437: '石冈区',
        710438: '东势区',
        710439: '和平区',
        710440: '新社区',
        710441: '潭子区',
        710442: '大雅区',
        710443: '神冈区',
        710444: '大肚区',
        710445: '沙鹿区',
        710446: '龙井区',
        710447: '梧栖区',
        710448: '清水区',
        710449: '大甲区',
        710450: '外埔区',
        710451: '大安区',
        710499: '其它区',
        710507: '金沙镇',
        710508: '金湖镇',
        710509: '金宁乡',
        710510: '金城镇',
        710511: '烈屿乡',
        710512: '乌坵乡',
        710614: '南投市',
        710615: '中寮乡',
        710616: '草屯镇',
        710617: '国姓乡',
        710618: '埔里镇',
        710619: '仁爱乡',
        710620: '名间乡',
        710621: '集集镇',
        710622: '水里乡',
        710623: '鱼池乡',
        710624: '信义乡',
        710625: '竹山镇',
        710626: '鹿谷乡',
        710701: '仁爱区',
        710702: '信义区',
        710703: '中正区',
        710704: '中山区',
        710705: '安乐区',
        710706: '暖暖区',
        710707: '七堵区',
        710799: '其它区',
        710801: '东区',
        710802: '北区',
        710803: '香山区',
        710899: '其它区',
        710901: '东区',
        710902: '西区',
        710999: '其它区',
        711130: '万里区',
        711132: '板桥区',
        711133: '汐止区',
        711134: '深坑区',
        711135: '石碇区',
        711136: '瑞芳区',
        711137: '平溪区',
        711138: '双溪区',
        711139: '贡寮区',
        711140: '新店区',
        711141: '坪林区',
        711142: '乌来区',
        711143: '永和区',
        711144: '中和区',
        711145: '土城区',
        711146: '三峡区',
        711147: '树林区',
        711148: '莺歌区',
        711149: '三重区',
        711150: '新庄区',
        711151: '泰山区',
        711152: '林口区',
        711153: '芦洲区',
        711154: '五股区',
        711155: '八里区',
        711156: '淡水区',
        711157: '三芝区',
        711158: '石门区',
        711287: '宜兰市',
        711288: '头城镇',
        711289: '礁溪乡',
        711290: '壮围乡',
        711291: '员山乡',
        711292: '罗东镇',
        711293: '三星乡',
        711294: '大同乡',
        711295: '五结乡',
        711296: '冬山乡',
        711297: '苏澳镇',
        711298: '南澳乡',
        711299: '钓鱼台',
        711387: '竹北市',
        711388: '湖口乡',
        711389: '新丰乡',
        711390: '新埔镇',
        711391: '关西镇',
        711392: '芎林乡',
        711393: '宝山乡',
        711394: '竹东镇',
        711395: '五峰乡',
        711396: '横山乡',
        711397: '尖石乡',
        711398: '北埔乡',
        711399: '峨眉乡',
        711414: '中坜区',
        711415: '平镇区',
        711417: '杨梅区',
        711418: '新屋区',
        711419: '观音区',
        711420: '桃园区',
        711421: '龟山区',
        711422: '八德区',
        711423: '大溪区',
        711425: '大园区',
        711426: '芦竹区',
        711487: '中坜市',
        711488: '平镇市',
        711489: '龙潭乡',
        711490: '杨梅市',
        711491: '新屋乡',
        711492: '观音乡',
        711493: '桃园市',
        711494: '龟山乡',
        711495: '八德市',
        711496: '大溪镇',
        711497: '复兴乡',
        711498: '大园乡',
        711499: '芦竹乡',
        711520: '头份市',
        711582: '竹南镇',
        711583: '头份镇',
        711584: '三湾乡',
        711585: '南庄乡',
        711586: '狮潭乡',
        711587: '后龙镇',
        711588: '通霄镇',
        711589: '苑里镇',
        711590: '苗栗市',
        711591: '造桥乡',
        711592: '头屋乡',
        711593: '公馆乡',
        711594: '大湖乡',
        711595: '泰安乡',
        711596: '铜锣乡',
        711597: '三义乡',
        711598: '西湖乡',
        711599: '卓兰镇',
        711736: '员林市',
        711774: '彰化市',
        711775: '芬园乡',
        711776: '花坛乡',
        711777: '秀水乡',
        711778: '鹿港镇',
        711779: '福兴乡',
        711780: '线西乡',
        711781: '和美镇',
        711782: '伸港乡',
        711783: '员林镇',
        711784: '社头乡',
        711785: '永靖乡',
        711786: '埔心乡',
        711787: '溪湖镇',
        711788: '大村乡',
        711789: '埔盐乡',
        711790: '田中镇',
        711791: '北斗镇',
        711792: '田尾乡',
        711793: '埤头乡',
        711794: '溪州乡',
        711795: '竹塘乡',
        711796: '二林镇',
        711797: '大城乡',
        711798: '芳苑乡',
        711799: '二水乡',
        711982: '番路乡',
        711983: '梅山乡',
        711984: '竹崎乡',
        711985: '阿里山乡',
        711986: '中埔乡',
        711987: '大埔乡',
        711988: '水上乡',
        711989: '鹿草乡',
        711990: '太保市',
        711991: '朴子市',
        711992: '东石乡',
        711993: '六脚乡',
        711994: '新港乡',
        711995: '民雄乡',
        711996: '大林镇',
        711997: '溪口乡',
        711998: '义竹乡',
        711999: '布袋镇',
        712180: '斗南镇',
        712181: '大埤乡',
        712182: '虎尾镇',
        712183: '土库镇',
        712184: '褒忠乡',
        712185: '东势乡',
        712186: '台西乡',
        712187: '仑背乡',
        712188: '麦寮乡',
        712189: '斗六市',
        712190: '林内乡',
        712191: '古坑乡',
        712192: '莿桐乡',
        712193: '西螺镇',
        712194: '二仑乡',
        712195: '北港镇',
        712196: '水林乡',
        712197: '口湖乡',
        712198: '四湖乡',
        712199: '元长乡',
        712451: '崁顶乡',
        712467: '屏东市',
        712468: '三地门乡',
        712469: '雾台乡',
        712470: '玛家乡',
        712471: '九如乡',
        712472: '里港乡',
        712473: '高树乡',
        712474: '盐埔乡',
        712475: '长治乡',
        712476: '麟洛乡',
        712477: '竹田乡',
        712478: '内埔乡',
        712479: '万丹乡',
        712480: '潮州镇',
        712481: '泰武乡',
        712482: '来义乡',
        712483: '万峦乡',
        712484: '莰顶乡',
        712485: '新埤乡',
        712486: '南州乡',
        712487: '林边乡',
        712488: '东港镇',
        712489: '琉球乡',
        712490: '佳冬乡',
        712491: '新园乡',
        712492: '枋寮乡',
        712493: '枋山乡',
        712494: '春日乡',
        712495: '狮子乡',
        712496: '车城乡',
        712497: '牡丹乡',
        712498: '恒春镇',
        712499: '满州乡',
        712584: '台东市',
        712585: '绿岛乡',
        712586: '兰屿乡',
        712587: '延平乡',
        712588: '卑南乡',
        712589: '鹿野乡',
        712590: '关山镇',
        712591: '海端乡',
        712592: '池上乡',
        712593: '东河乡',
        712594: '成功镇',
        712595: '长滨乡',
        712596: '金峰乡',
        712597: '大武乡',
        712598: '达仁乡',
        712599: '太麻里乡',
        712686: '花莲市',
        712687: '新城乡',
        712688: '太鲁阁',
        712689: '秀林乡',
        712690: '吉安乡',
        712691: '寿丰乡',
        712692: '凤林镇',
        712693: '光复乡',
        712694: '丰滨乡',
        712695: '瑞穗乡',
        712696: '万荣乡',
        712697: '玉里镇',
        712698: '卓溪乡',
        712699: '富里乡',
        712794: '马公市',
        712795: '西屿乡',
        712796: '望安乡',
        712797: '七美乡',
        712798: '白沙乡',
        712799: '湖西乡',
        712896: '南竿乡',
        712897: '北竿乡',
        712898: '东引乡',
        712899: '莒光乡',
        810101: '中西区',
        810102: '湾仔区',
        810103: '东区',
        810104: '南区',
        810201: '九龙城区',
        810202: '油尖旺区',
        810203: '深水埗区',
        810204: '黄大仙区',
        810205: '观塘区',
        810301: '北区',
        810302: '大埔区',
        810303: '沙田区',
        810304: '西贡区',
        810305: '元朗区',
        810306: '屯门区',
        810307: '荃湾区',
        810308: '葵青区',
        810309: '离岛区',
        820101: '澳门半岛',
        820201: '离岛',
    },
});


/***/ }),
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(126);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(129) });


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(8);
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(130);
var pIE = __webpack_require__(131);
var toObject = __webpack_require__(34);
var IObject = __webpack_require__(41);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(22)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 131 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(161);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
]);