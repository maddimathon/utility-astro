// node_modules/@maddimathon/utility-typescript/dist/functions/objects/objectKeySort.js
function objectKeySort(obj, recursive = false, sortMaker) {
  let entries = Object.entries(obj);
  if (recursive) {
    entries = entries.map(([key, value]) => {
      if (typeof value !== "object" || value === null) {
        return [key, value];
      }
      if (Array.isArray(value)) {
        return [key, value];
      }
      return [key, objectKeySort(value, recursive, sortMaker)];
    });
  }
  let sortFn = sortMaker ? (a, b) => {
    const sort_a = sortMaker(a[0]);
    const sort_b = sortMaker(b[0]);
    if (sort_a > sort_b) {
      return 1;
    }
    if (sort_a < sort_b) {
      return -1;
    }
    return 0;
  } : (a, b) => {
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    return 0;
  };
  return Object.fromEntries(entries.sort(sortFn));
}

// node_modules/@maddimathon/utility-typescript/dist/functions/arrays/arrayUnique.js
function arrayUnique(arr, args = {}) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  const { compareViaJson = false } = args;
  if (!compareViaJson) {
    return [...arr].filter((v, i, a) => a.indexOf(v) === i);
  }
  const stringify = (value) => JSON.stringify(typeof value === "object" ? Array.isArray(value) ? value.sort() : objectKeySort(JSON.parse(JSON.stringify(value))) : value);
  const jsonArr = [...arr].map(stringify);
  return [...arr].filter((v, i) => jsonArr.indexOf(stringify(v)) === i);
}

// node_modules/@maddimathon/utility-typescript/dist/functions/arrays/hasIterator.js
function hasIterator(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  if (typeof obj[Symbol.iterator] === "function") {
    const result = obj[Symbol.iterator]();
    if (typeof result === "object" && typeof result.next === "function") {
      return true;
    }
    return false;
  }
  return false;
}

// node_modules/@maddimathon/utility-typescript/dist/functions/objects/deleteUndefinedProps.js
function deleteUndefinedProps(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "undefined") {
      delete obj[key];
    }
  }
  return obj;
}

// node_modules/@maddimathon/utility-typescript/dist/functions/maps/mapFlatten.js
function mapFlatten(map, args = {}) {
  if (!(map instanceof Map) || !map) {
    return map;
  }
  const {
    // prefix,
    separator = "-",
    suffix,
    key_addSuffix,
    key_validate_addPrefix
  } = mapFlatten.parseArgs(args);
  const entries = [];
  for (const [t_key, value] of map.entries()) {
    const key = key_validate_addPrefix(t_key);
    if (typeof value === "undefined") {
      continue;
    }
    if (!(value instanceof Map)) {
      entries.push([key_addSuffix(key), value]);
      continue;
    }
    entries.push(...mapFlatten(value, deleteUndefinedProps({
      ...args,
      prefix: key,
      separator,
      suffix
    })).entries());
  }
  return new Map(entries);
}
(function(mapFlatten2) {
  function parseArgs(args = {}) {
    const { prefix, separator = "-", suffix } = args;
    return {
      prefix,
      separator,
      suffix,
      key_addSuffix: (key) => {
        key = String(key);
        const _includeSuffix = !!suffix?.length;
        if (key.length < 1) {
          return _includeSuffix ? suffix : "";
        }
        return _includeSuffix ? `${key}${separator}${suffix}` : key;
      },
      key_validate_addPrefix: (key) => [
        prefix,
        key === "$" ? "" : String(key)
      ].filter((v) => v?.length).join(separator)
    };
  }
  mapFlatten2.parseArgs = parseArgs;
})(mapFlatten || (mapFlatten = {}));

// node_modules/@maddimathon/utility-typescript/dist/functions/objects/mergeArgs.js
function mergeArgs(defaults, inputs, recursive = false, mergeArrays = false) {
  if (typeof defaults !== "object" || !defaults) {
    defaults = {};
  }
  if (typeof inputs === "undefined" || typeof inputs !== "object" || !inputs) {
    return { ...defaults };
  }
  const result = {
    ...defaults,
    ...inputs
  };
  if (!recursive) {
    return result;
  }
  const defaultKeys = Object.keys(defaults);
  for (const key of defaultKeys) {
    if (!(key in inputs) || inputs[key] === void 0) {
      continue;
    }
    const defaultValue = defaults[key];
    const inputValue = inputs[key];
    if (defaultValue === null || inputValue === null || typeof defaultValue === "undefined" || typeof defaultValue !== "object" || typeof inputValue === "undefined" || typeof inputValue !== "object") {
      continue;
    }
    if (Array.isArray(defaultValue) || Array.isArray(inputValue)) {
      if (mergeArrays && Array.isArray(defaultValue) && Array.isArray(inputValue)) {
        result[key] = arrayUnique(defaultValue.concat(inputValue));
      }
      continue;
    }
    if (typeof defaultValue.prototype !== "undefined" || typeof inputValue.prototype !== "undefined") {
      continue;
    }
    result[key] = mergeArgs(defaultValue, inputValue, recursive, mergeArrays);
  }
  return result;
}

// node_modules/@maddimathon/utility-typescript/dist/functions/objects/objectFlatten.js
function objectFlatten(obj, args = {}) {
  if (typeof obj !== "object" || !obj) {
    return obj;
  }
  const {
    // prefix,
    separator = "-",
    suffix,
    key_addSuffix,
    key_validate_addPrefix
  } = objectFlatten.parseArgs(args);
  const entries = [];
  for (const t_key of Object.keys(obj)) {
    const value = obj[t_key];
    const key = key_validate_addPrefix(t_key);
    if (typeof value === "undefined") {
      continue;
    }
    if (typeof value !== "object" || !value || Array.isArray(value)) {
      entries.push([key_addSuffix(key), value]);
      continue;
    }
    entries.push(...Object.entries(objectFlatten(value, {
      ...args,
      prefix: key,
      separator,
      suffix
    })));
  }
  return Object.fromEntries(entries);
}
(function(objectFlatten2) {
  function parseArgs(args = {}) {
    const { prefix, separator = "-", suffix } = args;
    return {
      prefix,
      separator,
      suffix,
      key_addSuffix: (key) => {
        key = String(key);
        const _includeSuffix = !!suffix?.length;
        if (key.length < 1) {
          return _includeSuffix ? suffix : "";
        }
        return _includeSuffix ? `${key}${separator}${suffix}` : key;
      },
      key_validate_addPrefix: (key) => [
        prefix,
        key === "$" ? "" : String(key)
      ].filter((v) => v?.length).join(separator)
    };
  }
  objectFlatten2.parseArgs = parseArgs;
})(objectFlatten || (objectFlatten = {}));

// node_modules/@maddimathon/utility-typescript/dist/functions/strings/softWrapText.js
function softWrapText(text, maxWidth) {
  if (!maxWidth) {
    maxWidth = 80;
  }
  const splits = text.split(/\n/g).map((line) => {
    return line.replace(new RegExp(`(?![^\\n]{1,${maxWidth}}$)([^\\n]{1,${maxWidth}})\\s`, "g"), "$1\n");
  });
  return splits.flat().join("\n");
}

// node_modules/@maddimathon/utility-typescript/dist/functions/strings/timestamp.js
function timestamp(date = null, _args = {}) {
  const _inputTimeFormat = typeof _args.time === "object" ? _args.time : {};
  const formats = {
    date: typeof _args.date === "object" ? {
      ...timestamp.Args.Format.DEFAULTS.date,
      ..._args.date
    } : timestamp.Args.Format.DEFAULTS.date,
    time: {
      ...timestamp.Args.Format.DEFAULTS.time,
      ..._inputTimeFormat,
      hour12: !_inputTimeFormat.hour12 ? false : typeof _inputTimeFormat.hour12 === "object" ? {
        ...timestamp.Args.Format.DEFAULTS.time.hour12,
        ..._inputTimeFormat.hour12
      } : timestamp.Args.Format.DEFAULTS.time.hour12,
      second: _inputTimeFormat.second ?? _inputTimeFormat.millisecond ?? false
    }
  };
  const args = {
    separator: " @ ",
    ..._args,
    date: !!_args.date,
    time: _args.time ? !!_args.time : !_args.date
  };
  if (args.debug) {
    console.log("timestamp() args =", args);
    console.log("timestamp() formats =", formats);
  }
  if (!(date instanceof Date)) {
    date = /* @__PURE__ */ new Date();
  }
  const formatted = [];
  if (args.date) {
    const _dateParts = [];
    if (formats.date.year) {
      _dateParts.push(date.getFullYear().toFixed().padStart(4, "0"));
    }
    if (formats.date.month) {
      _dateParts.push((date.getMonth() + 1).toFixed().padStart(2, "0"));
    }
    if (formats.date.day) {
      _dateParts.push(date.getDate().toFixed().padStart(2, "0"));
    }
    if (_dateParts.length) {
      formatted.push(_dateParts.join("-"));
    }
  }
  if (args.time) {
    const _timeParts_colon = [];
    if (formats.time.hour) {
      let _hr = date.getHours();
      if (formats.time.hour12) {
        _hr = _hr % 12 || 12;
      }
      _timeParts_colon.push(_hr.toFixed().padStart(2, "0"));
    }
    if (formats.time.minute) {
      _timeParts_colon.push(date.getMinutes().toFixed().padStart(2, "0"));
    }
    if (formats.time.second) {
      _timeParts_colon.push(date.getSeconds().toFixed().padStart(2, "0"));
    }
    const _timeParts_dot = _timeParts_colon.length ? [_timeParts_colon.join(":")] : [];
    if (formats.time.millisecond) {
      _timeParts_dot.push(date.getMilliseconds().toFixed().padEnd(3, "0"));
    }
    if (_timeParts_dot.length) {
      let suffix = "";
      if (formats.time.hour && formats.time.hour12) {
        suffix = date.getHours() < 12 ? formats.time.hour12.am : formats.time.hour12.pm;
      }
      formatted.push(_timeParts_dot.join(".") + suffix);
    }
  }
  if (args.debug) {
    console.log("timestamp() formatted =", formatted);
  }
  return formatted.join(args.separator);
}
(function(timestamp2) {
  let Args;
  (function(Args2) {
    let Format;
    (function(Format2) {
      Format2.DEFAULTS = {
        date: {
          year: true,
          month: true,
          day: true
        },
        time: {
          hour12: {
            am: " am",
            pm: " pm"
          },
          hour: true,
          minute: true,
          second: false,
          millisecond: false
        }
      };
    })(Format = Args2.Format || (Args2.Format = {}));
  })(Args = timestamp2.Args || (timestamp2.Args = {}));
})(timestamp || (timestamp = {}));

// node_modules/@maddimathon/utility-typescript/dist/functions/typeOf.js
function typeOf(variable) {
  if (variable === null) {
    return "null";
  }
  if (variable === void 0) {
    return "undefined";
  }
  const typeOf2 = typeof variable;
  switch (typeOf2) {
    case "function":
      return typeof variable.prototype === "undefined" ? "function" : "class";
    case "number":
      if (Number.isNaN(variable)) {
        return "NaN";
      }
      return "number";
    case "object":
      if (Array.isArray(variable)) {
        return "array";
      }
      return "object";
  }
  return typeOf2;
}

// node_modules/@maddimathon/utility-typescript/dist/classes/MessageMaker.js
var MessageMaker = class _MessageMaker {
  /* STATIC
   * ====================================================================== */
  /**
   * Returns the default painter callback function for the given format.
   *
   * `'html'` and `'markdown'` default painters currently do not apply any
   * colours.
   *
   * Used only by {@link MessageMaker.buildArgs}.
   *
   * @param classArgs  A complete arguments object.  Requires complete to
   *                   avoid building complete arguments multiple times.
   */
  static defaultPainter(classArgs) {
    switch (classArgs.paintFormat) {
      case "html":
        return (line, args = {}) => {
          if (!args.bold && !args.clr && !args.flag && !args.italic) {
            return line;
          }
          if (args.italic) {
            line = "<em>" + line + "</em>";
          }
          if (args.bold) {
            line = "<strong>" + line + "</strong>";
          }
          return line;
        };
      case "markdown":
        return (line, args = {}) => {
          if (!args.bold && !args.clr && !args.flag && !args.italic) {
            return line;
          }
          if (args.italic) {
            line = "_" + line + "_";
          }
          if (args.bold) {
            line = "**" + line + "**";
          }
          return line;
        };
      case "node":
        return (line, args = {}) => {
          if (!args.bold && !args.clr && !args.flag && !args.italic) {
            return line;
          }
          const ansi = [];
          if (args.clr || args.flag) {
            const clrDepth = typeof process.stdout.getColorDepth === "function" ? process.stdout.getColorDepth() : 1;
            let bg = null;
            let fg = args.clr ?? "black";
            if (args.flag) {
              if (args.flag == "reverse" && clrDepth > 4) {
                switch (fg) {
                  case "grey":
                    bg = "light-grey";
                    fg = "black";
                    break;
                  default:
                    bg = "light-grey";
                    break;
                }
                if (clrDepth === 8) {
                  switch (fg) {
                    case "orange":
                    case "pink":
                      bg = "grey";
                      break;
                  }
                }
              } else {
                bg = args.clr ?? "black";
                fg = clrDepth > 4 ? "white" : null;
              }
            }
            switch (clrDepth) {
              case 4:
                if (bg || fg !== "black") {
                  ansi.push([
                    fg ? classArgs.ansiColours[4].fg[fg] : "",
                    bg ? classArgs.ansiColours[4].bg[bg] : ""
                  ].filter((s) => s).join(";"));
                }
                break;
              case 8:
              case 24:
                if (bg && args.flag !== "reverse") {
                  if (clrDepth == 8) {
                    switch (bg) {
                      case "light-grey":
                      case "orange":
                      case "yellow":
                        fg = "black";
                        break;
                      default:
                        fg = "white";
                        break;
                    }
                  } else {
                    switch (bg) {
                      case "grey":
                      case "yellow":
                        fg = "black";
                        break;
                      default:
                        fg = "white";
                        break;
                    }
                  }
                }
                if (bg || fg !== "black") {
                  if (fg) {
                    ansi.push(`38;${classArgs.ansiColours[clrDepth][fg]}`);
                  }
                  if (bg) {
                    ansi.push(`48;${classArgs.ansiColours[clrDepth][bg]}`);
                  }
                }
                break;
            }
          }
          if (args.bold) {
            ansi.push("1");
          }
          if (args.italic) {
            ansi.push("3");
          }
          return "\x1B[" + ansi.join(";") + "m" + line + "\x1B[0m";
        };
    }
    return null;
  }
  /* LOCAL PROPERTIES
   * ====================================================================== */
  /**
   * A completed args object.
   */
  args;
  /**
   * Default arguments.
   */
  get ARGS_DEFAULT() {
    const DEFAULT = {
      ansiColours: {
        4: {
          fg: {
            black: "30",
            grey: "30",
            "light-grey": "37",
            white: "37",
            red: "31",
            orange: "33",
            yellow: "33",
            green: "32",
            turquoise: "36",
            blue: "34",
            purple: "35",
            pink: "35"
          },
          bg: {
            black: "40",
            grey: "40",
            "light-grey": "47",
            white: "47",
            red: "41",
            orange: "43",
            yellow: "43",
            green: "42",
            turquoise: "46",
            blue: "44",
            purple: "45",
            pink: "45"
          }
        },
        8: {
          black: "5;232",
          grey: "5;241",
          "light-grey": "5;247",
          white: "5;255",
          red: "5;124",
          orange: "5;166",
          yellow: "5;208",
          green: "5;28",
          turquoise: "5;30",
          blue: "5;20",
          purple: "5;55",
          pink: "5;162"
        },
        24: {
          black: "2;26;26;26",
          grey: "2;108;108;108",
          "light-grey": "2;208;208;208",
          white: "2;248;248;248",
          red: "2;168;36;36",
          orange: "2;174;84;4",
          yellow: "2;204;182;0",
          green: "2;24;118;10",
          turquoise: "2;0;128;98",
          blue: "2;60;84;157",
          purple: "2;129;75;155",
          pink: "2;179;77;145"
        }
      },
      msg: {
        bold: false,
        clr: null,
        depth: 0,
        flag: false,
        fullWidth: false,
        hangingIndent: "",
        indent: "",
        italic: false,
        linesIn: 0,
        linesOut: 1,
        minWidth: 20,
        maxWidth: null,
        tab: "    "
      },
      painter: null,
      paintFormat: null,
      paintIfEmpty: false
    };
    return DEFAULT;
  }
  /**
   * Build a complete args object.
   */
  buildArgs(args) {
    const mergedDefault = this.ARGS_DEFAULT;
    const built = mergeArgs(mergedDefault, args, true);
    if (args?.msg && typeof args.msg !== "function") {
      if (typeof mergedDefault.msg !== "function") {
        built.msg = mergeArgs(mergedDefault.msg, args.msg, true);
      }
      if (args.msg.minWidth) {
        built.msg.minWidth = Math.max(10, args.msg.minWidth);
      }
    }
    if (!built.painter && built.paintFormat) {
      built.painter = _MessageMaker.defaultPainter(built);
    }
    return built;
  }
  /**
   * Build a complete {@link MessageMaker.MsgArgs} object.
   */
  msgArgs(args) {
    const merged = mergeArgs(this.args.msg, args, false);
    if (merged.maxWidth !== null) {
      const indentWidth = merged.maxWidth - (args?.tab?.length ?? 0) * (args?.depth ?? 0);
      merged.maxWidth = Math.max(10, merged.minWidth, indentWidth);
      if (merged.flag) {
        merged.maxWidth = merged.maxWidth - 2;
      }
    }
    return merged;
  }
  /* CONSTRUCTOR
   * ====================================================================== */
  constructor(args = {}) {
    this.args = this.buildArgs(args);
  }
  /* METHODS
   * ====================================================================== */
  /**
   * Joins string arrays with a single new line and adds an indent to the
   * beginning of every line, and adds next level of indent for child arrays.
   *
   * @param lines   String to implode. Arrays are joined with `'\n'`.
   * @param indent  Optional. Default `this.args.msg.tab`.
   *
   * @return  The same text, but with an indent added after every new line.
   */
  implodeWithIndent(lines, indent = this.args.msg.tab) {
    return lines.map((line) => {
      switch (typeOf(line)) {
        case "array":
          return this.implodeWithIndent(line, indent + this.args.msg.tab);
        case "string":
          return indent + line;
        default:
          return indent + String(line);
      }
    }).flat().join("\n");
  }
  /**
   * Used to map each line of a message in {@link MessageMaker.msg}.
   *
   * Does not wrap or split it (assumes this has already been done).  Applies
   * {@link MessageMaker.painter} and {@link MessageMaker.Args.depth} indent.
   *
   * @param line    String to map. Already wrapped to line width, if applicable.
   * @param args    Message arguments that apply to this line. Also passed to {@link MessageMaker.painter}.
   * @param prefix  Optional. Unpainted string added before the line. Helpful for hanging indents. Default ''.
   */
  lineMapper(line, args, prefix = "") {
    if (args.maxWidth && args.fullWidth) {
      if (line.length < args.maxWidth) {
        line = line + " ".repeat(args.maxWidth - line.length);
      }
    }
    if (args.flag && this.args.paintFormat === "node" && line.match(/^[\s\n]*$/gi) === null) {
      line = " " + line + " ";
    }
    return args.tab.repeat(args.depth) + args.indent + prefix + this.painter(line, args);
  }
  /**
   * Formats the given message according to options.
   *
   * @param msg    Message to display.  If it's an array, the strings are joined with `'\n'`.
   * @param _args  Optional.  Overrides for default arguments in {@link MessageMaker.args}.
   */
  msg(msg, _args = {}) {
    const args = this.msgArgs(_args);
    if (Array.isArray(msg)) {
      msg = msg.join("\n");
    }
    if (args.maxWidth) {
      msg = softWrapText(msg, args.maxWidth);
    }
    const lines = msg.split(/\n/g);
    return "\n".repeat(args.linesIn ?? 0) + lines.map((line, index) => {
      return this.lineMapper(line, args, index > 0 ? args.hangingIndent : "");
    }).join("\n") + "\n".repeat(args.linesOut ?? 0);
  }
  /**
   * Normalizes any input into bulk input.
   *
   * @since 2.0.0-beta.3
   */
  normalizeBulkInput(msg) {
    if (typeof msg === "string") {
      return msg ? [[msg]] : [];
    }
    return msg.map((m) => {
      if (typeof m === "string") {
        m = [m];
      }
      const m_arr = m;
      return m_arr;
    });
  }
  /**
   * Formats given messages individually and then joins them on return.
   *
   * @param messages       Messages to display, each with their own personal override arguments.  Joined with `universalArgs.joiner` (default `'\n\n'`) before return.
   * @param universalArgs  Optional.  Overrides for default arguments in {@link MessageMaker.args} for all messages.
   *
   * @since 2.0.0-beta.3 — Renamed from msgs to bulk.
   */
  bulk(messages, universalArgs = {}) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    const defaultUniversalArgs = {
      ...universalArgs,
      linesIn: 0,
      linesOut: 0
    };
    const ret = [];
    messages.forEach(([_msg, _args], index) => {
      _args = mergeArgs(defaultUniversalArgs, _args ?? {}, true);
      if (index > 0 && universalArgs.hangingIndent && defaultUniversalArgs.joiner?.match(/\n/g)) {
        _args = {
          ..._args,
          hangingIndent: "",
          indent: universalArgs.hangingIndent ?? this.ARGS_DEFAULT.msg.hangingIndent
        };
      }
      ret.push(this.msg(_msg, _args));
    });
    return "\n".repeat(universalArgs.linesIn ?? 0) + ret.join(universalArgs.joiner ?? "\n\n") + "\n".repeat(universalArgs.linesOut ?? 0);
  }
  /**
   * Applies colour and font styles to an message for output.
   */
  painter(msg, args = {}) {
    if (!this.args.paintIfEmpty) {
      if (!msg.replace(/[\n\s\r]+/gs, "").length) {
        return msg;
      }
    }
    if (this.args.painter) {
      msg = this.args.painter(msg, args);
    }
    return msg;
  }
  /**
   * Formats a timestamp according to the args.
   *
   * @since 2.0.0-beta.3
   */
  timestamp(date = null, args = {}) {
    return timestamp(date, args);
  }
  /**
   * Formats a message prepended with a timestamp.
   *
   * @param msg       Message to display. If it's an array, the strings are joined with `'\n'`.
   * @param msgArgs   Optional. Overrides for default arguments in {@link MessageMaker.msgArgs}.
   *
   * @since 2.0.0-beta.3 — Renamed from timestampMsg to timestamped. Removed `timeArgs` param and switched to a time prop in `msgArgs`.
   */
  timestamped(msg, { time: timeArgs = {}, ...msgArgs } = {}) {
    const args_full = this.msgArgs({
      joiner: "\n\n",
      ...msgArgs
    });
    msg = this.normalizeBulkInput(msg);
    const { depth, linesIn, linesOut } = args_full;
    const timePrefix = `[${this.timestamp(timeArgs.date ?? null, timeArgs.stamp)}]`;
    const args_parts = {
      ...args_full,
      depth: 0,
      linesIn: 0,
      linesOut: 0,
      hangingIndent: args_full.hangingIndent + " ".repeat(timePrefix.length + 1) + args_full.tab.repeat(depth)
    };
    const messages = msg;
    const compiledMessages = {
      message: messages.length ? (args_parts.flag ? this.msg(" ", args_parts) : " ") + this.bulk(messages, args_parts) : "",
      timestamp: this.msg(timePrefix, mergeArgs(args_parts, {
        flag: false,
        italic: false,
        ...timeArgs,
        depth,
        linesIn: 0,
        linesOut: 0
      }, false))
    };
    return "\n".repeat(linesIn ?? 0) + compiledMessages.timestamp + compiledMessages.message + "\n".repeat(linesOut ?? 0);
  }
};
/* @__PURE__ */ (function(MessageMaker2) {
  ;
  ;
  ;
  ;
  ;
  ;
})(MessageMaker || (MessageMaker = {}));

// node_modules/@maddimathon/utility-typescript/dist/classes/MiniConsole.js
var MiniConsole = class {
  constructor() {
    this.debug = this.debug.bind(this);
    this.error = this.error.bind(this);
    this.info = this.info.bind(this);
    this.log = this.log.bind(this);
    this.verbose = this.verbose.bind(this);
    this.warn = this.warn.bind(this);
  }
  debug(...params) {
    this.output("debug", ...params);
  }
  error(...params) {
    this.output("error", ...params);
  }
  /**
   * Alias for {@link MiniConsole.verbose}.
   */
  info(...params) {
    this.verbose(...params);
  }
  log(...params) {
    this.output("log", ...params);
  }
  /**
   * Generic base output method for other outputs.
   */
  output(via, msg) {
    console[via === "verbose" ? "info" : via](msg);
  }
  verbose(...params) {
    this.output("verbose", ...params);
  }
  warn(...params) {
    this.output("warn", ...params);
  }
};

// node_modules/@maddimathon/utility-typescript/dist/classes/VariableInspector.js
var VariableInspector = class _VariableInspector {
  /* STATIC METHODS
   * ====================================================================== */
  /**
   * Alias for `new VariableInspector( ...).dump()`.
   *
   * @category Static
   *
   * @see {@link VariableInspector.dump}
   */
  static dump(...params) {
    const vi = new _VariableInspector(...params);
    return vi.dump();
  }
  /**
   * Alias for `new VariableInspector( ...).toString()`.
   *
   * @category Static
   *
   * @see {@link VariableInspector.toString}
   */
  static stringify(...params) {
    const vi = new _VariableInspector(...params);
    return vi.toString();
  }
  /** Testing ==================================== **/
  /**
   * Used for testing.
   *
   * @category Static
   *
   * @internal
   */
  static get sampleComplexObject() {
    const { undefined: undefined2, null: null_val, true: true_val, false: false_val, bigint, number, NaN, string, stringMultiline, array, set, objectEmpty, objectSimple, map, date, regex, functionParams } = _VariableInspector.Samples.getVars(true);
    return {
      undefined: undefined2,
      null: null_val,
      true: true_val,
      false: false_val,
      bigint,
      number,
      NaN,
      string,
      stringMultiline,
      array,
      set,
      objectEmpty,
      objectSimple,
      map,
      date,
      regex,
      functionParams
    };
  }
  /**
   * Prints sample output to the console via VariableInspector.dump().
   *
   * @category Static
   *
   * @returns  An example, constructed instance for a sample object.
   */
  static sample(_args, _console) {
    const console2 = _console ?? new MiniConsole();
    console2.log("\nVariableInspector.sample() @ " + timestamp(null, { date: true, time: true }));
    console2.log("\n");
    const args = {
      ..._VariableInspector.prototype.ARGS_DEFAULT,
      debug: true,
      ..._args,
      console: console2
    };
    const varDump = (variable) => {
      _VariableInspector.dump(variable, args);
      console2.log("\n");
    };
    const t = _VariableInspector.Samples.getVars(!!args.debug);
    for (const key in t) {
      varDump({ [key]: t[key] });
    }
    const complexVarInspect = new _VariableInspector({ complexObject: _VariableInspector.sampleComplexObject }, args);
    complexVarInspect.dump();
    console2.log("\n");
    return complexVarInspect;
  }
  /* LOCAL PROPERTIES
   * ====================================================================== */
  /**
   * A completed args object.
   *
   * @category Args
   */
  args;
  /**
   * @category Args
   *
   * @source
   */
  get ARGS_DEFAULT() {
    return {
      childArgs: {
        includeValue: true
      },
      /**
       * @since 2.0.0-beta.3
       */
      console: new MiniConsole(),
      debug: false,
      equalString: " =",
      fallbackToJSON: true,
      /**
       * @since 2.0.0-beta.3
       */
      formatKeys: true,
      formatter: null,
      includePrefix: true,
      includeType: true,
      includeValue: true,
      indent: "    ",
      inspectClasses: false,
      inspectFunctions: false,
      locale: "en-CA",
      localizeDates: true,
      localizeDateOptions: {},
      localizeNumbers: false,
      localizeNumberOptions: {},
      stringQuoteCharacter: '"'
    };
  }
  /**
   * @since 2.0.0-beta.3
   */
  console;
  /**
   * Default name for unnamed variables passed for inspection.
   *
   * @since 2.0.0-beta.3
   */
  _defaultName = "variable";
  /**
   * Value to inspect.
   *
   * @category Inputs
   *
   * @expandType T_InspectionType
   *
   * @since 2.0.0-beta.3
   */
  _inspectionValue;
  /**
   * Value’s name, used in output.
   *
   * @category Inputs
   */
  _name;
  /**
   * Value to inspect as passed to the constructor.
   *
   * @category Inputs
   */
  _rawValue;
  /**
   * Alias for this.typeOf( this._rawValue ).
   *
   * @category Inputs
   *
   * @expandType typeOf.Return
   */
  _typeOf;
  /**
   * These are the properties of the input object, if any.
   *
   * @category Inputs
   */
  _properties;
  /**
   * @since 2.0.0-beta.3
   */
  get properties() {
    return this._properties;
  }
  /* CONSTRUCTOR
   * ====================================================================== */
  /**
   * @category Constructor
   *
   * @param variable  Passing the variable to inspect within an single-prop object
   */
  constructor(variable, args = {}, console2) {
    this.args = {
      ...this.ARGS_DEFAULT,
      ...args
    };
    this.console = console2 ?? new MiniConsole();
    const params = this._parseInputParams(this._validateInputVariable(variable));
    this._name = params.name;
    this._rawValue = params.rawValue;
    this._inspectionValue = params.inspectionValue;
    this._typeOf = params.typeOf;
    this._properties = this._indexProperties();
  }
  /**
   * @category Inputs
   *
   * @see {@link VariableInspector.constructor}
   *
   * @since 2.0.0-beta.3
   */
  _parseInputParams(validVar) {
    const name = Object.keys(validVar)[0] ?? this._defaultName;
    const rawValue = validVar[name];
    const rawOrObject = typeof rawValue === "object" ? rawValue : false;
    const inspectionValue = rawOrObject && typeof rawOrObject.toVariableInspection === "function" ? rawOrObject.toVariableInspection() : rawValue;
    return {
      name,
      rawValue,
      inspectionValue,
      typeOf: typeOf(inspectionValue)
    };
  }
  /**
   * Validates the first input parameter to ensure it is an object with a
   * single string key.
   *
   * @category Inputs
   *
   * @see {@link VariableInspector.constructor}
   *
   * @since 2.0.0-beta.3 — Renamed from validateInput to _validateInputVariable.
   * Changed from static to local.
   */
  _validateInputVariable(variable) {
    const inputKeys = Object.keys(variable);
    const inputHasOneStringKey = inputKeys.length === 1 && typeof inputKeys[0] === "string";
    if (inputHasOneStringKey) {
      return variable;
    }
    return { [this._defaultName]: variable };
  }
  /* LOCAL METHODS
   * ====================================================================== */
  /**
   * Formats an object property name into a string for display.
   *
   * @category Formatters
   *
   * @since 2.0.0-beta.3 — Renamed from keyFormatter to _keyFormatter.
   */
  _keyFormatter(key) {
    if (!this.args.formatKeys) {
      return String(key);
    }
    switch (typeof key) {
      case "number":
        return key.toString();
      case "string":
        return `"${key}"`;
    }
    return `{${String(key)}}`;
  }
  /**
   * Builds an array of the property names.  Used by
   * {@link VariableInspector._indexProperties}
   *
   * @category Inputs
   *
   * @since 2.0.0-beta.3 — Renamed from getPropertyNames to _getPropertyNames.
   */
  _getPropertyNames() {
    switch (this._typeOf) {
      case "array":
        const indices = [];
        for (let index = 0; index < this._inspectionValue.length; index++) {
          indices.push(index);
        }
        indices.push("length");
        return indices;
      case "object":
        break;
      default:
        return [];
    }
    const propertyNames = [
      Object.keys(this._inspectionValue),
      Object.getOwnPropertyNames(this._inspectionValue),
      Object.getOwnPropertySymbols(this._inspectionValue)
      // Object.getOwnPropertyDescriptors( this._inspectionValue as object ),
    ].flat().filter((name) => name !== "_getSet");
    return arrayUnique(propertyNames);
  }
  /**
   * Builds an array of the properties for the current
   * {@link VariableInspector._inspectionValue| this._inspectionValue}.
   *
   * @category Inputs
   *
   * @since 2.0.0-beta.3 — Renamed from indexProperties to _indexProperties.
   */
  _indexProperties() {
    const properties = [];
    if (!this._inspectionValue) {
      return properties;
    }
    switch (this._typeOf) {
      case "array":
      case "object":
        const value = this._inspectionValue;
        if (value instanceof Date || value instanceof RegExp) {
          return properties;
        }
        if (value instanceof Map) {
          return Array.from(this._inspectionValue.entries(), ([key, value2]) => ({
            key: {
              name: key,
              type: typeof key
            },
            vi: this._new({ [this._keyFormatter(key)]: value2 }, {
              equalString: ":",
              includePrefix: true
            })
          }));
        }
        if (value instanceof Set) {
          return Array.from(this._inspectionValue.values(), (value2, index) => ({
            key: {
              name: index,
              type: "number"
            },
            vi: this._new({ [this._keyFormatter(index)]: value2 }, {
              equalString: ":",
              includePrefix: true
            })
          }));
        }
        break;
      default:
        return properties;
    }
    const propertyNames = this._getPropertyNames();
    propertyNames.forEach((name) => {
      const value = this._inspectionValue[name];
      properties.push({
        key: {
          name,
          type: typeof name
        },
        vi: this._new({ [this._keyFormatter(name)]: value }, {
          equalString: ":",
          includePrefix: true
        })
      });
    });
    return properties;
  }
  /* Compilers ===================================== */
  /**
   * Filters for the ouput of different inspection parts.
   *
   * @since 2.0.0-beta.3
   */
  get _filter() {
    const valueVia = (viaMethod, skipFormatting) => {
      const str = `<via ${viaMethod}>`;
      return skipFormatting ? str : this._formatter("via", str);
    };
    return {
      /**
       * Filters the value's type for output.
       *
       * @since 2.0.0-beta.3
       */
      type: (type, skipFormatting) => {
        type = type.replace(/(^[\n\s]+|[\n\s]+$)/gi, "");
        if (skipFormatting) {
          return type;
        }
        return this._formatter("type", `<${type}>`);
      },
      /**
       * Filters the value for output.
       *
       * @since 2.0.0-beta.3
       */
      value: (str, viaMethod, skipFormatting) => {
        const ret = [];
        if (viaMethod) {
          ret.push(valueVia(viaMethod, skipFormatting));
        }
        if (!this.args.includeType) {
          if (typeof str === "undefined") {
            str = "undefined";
          } else if (str === null) {
            str = "NULL";
          }
        }
        if (skipFormatting) {
          ret.push(str ?? "");
        } else {
          ret.push(this._formatter("value", str ?? ""));
        }
        return ret.join(" ");
      },
      /**
       * Add 'via' info to value filter.
       *
       * @since 2.0.0-beta.3
       */
      valueVia
    };
  }
  /**
   * Applies any formatting functions as defined in the args.
   *
   * @category Formatters
   *
   * @see {@link VariableInspector.Formatter}
   * @see {@link VariableInspector.Args['formatter']}
   *
   * @param stage  The stage being formatted.
   * @param str    Value to format.
   *
   * @return  Formatted value.
   *
   * @since 2.0.0-beta.3 — Renamed from formatter to _formatter.
   */
  _formatter(stage, str) {
    if (!this.args.formatter) {
      return str;
    }
    if (typeof this.args.formatter[stage] === "function") {
      return this.args.formatter[stage](str);
    }
    if (stage === "_") {
      return str;
    }
    if (stage === "via") {
      if (typeof this.args.formatter.type === "function") {
        return this.args.formatter.type(str);
      }
    }
    if (typeof this.args.formatter._ === "function") {
      return this.args.formatter._(str);
    }
    return str;
  }
  /**
   * Prefix to print, not including the {@link VariableInspector.type}.
   *
   * @category Compilers
   *
   * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
   */
  prefix(skipFormatting = false) {
    const str = this._name + this.args.equalString;
    if (skipFormatting) {
      return str;
    }
    return this._formatter("prefix", str);
  }
  /**
   * String to print for variable type.
   *
   * In the case of non-Object objects with a constructor, the class name is
   * displayed.
   *
   * @category Compilers
   *
   * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
   */
  type(skipFormatting = false) {
    switch (this._typeOf) {
      case "NaN":
        return this._filter.type(typeof Number.NaN, skipFormatting);
      case "object":
        const constructorName = this._inspectionValue.constructor?.name ?? "Object";
        return this._filter.type(constructorName === "Object" ? "object" : constructorName, skipFormatting);
    }
    return this._filter.type(this._typeOf, skipFormatting);
  }
  /**
   * Representation of the variable’s value to print, not including the
   * {@link VariableInspector.type} or {@link VariableInspector.prefix}.
   *
   * @category Compilers
   *
   * @param skipFormatting  Optional. Whether to skip the _formatter functions. Default false.
   */
  value(skipFormatting = false) {
    const via = (viaMethod) => this._filter.valueVia(viaMethod, skipFormatting);
    const valueFilter = (str, viaMethod) => this._filter.value(str, viaMethod, skipFormatting);
    switch (this._typeOf) {
      case "null":
      case "undefined":
        return valueFilter(this._inspectionValue);
      case "bigint":
      case "number":
        return valueFilter(this.args.localizeNumbers ? this._inspectionValue.toLocaleString(this.args.locale, this.args.localizeNumberOptions) : this._inspectionValue.toString());
      case "boolean":
        return valueFilter(this._inspectionValue.toString().toUpperCase());
      case "class":
        let classValue = this._inspectionValue.prototype.constructor.name + " {}";
        if (this.args.inspectClasses) {
          classValue = this._inspectionValue.toString();
        }
        return valueFilter(classValue);
      case "function":
        let functionValue = this._inspectionValue.toString();
        const paramRegex = /^\s*\(([^\(|\)]*)\)\s*(\=\>|\{).*$/gs;
        if (!this.args.inspectFunctions) {
          if (!functionValue.match(paramRegex)) {
            functionValue = "";
          } else {
            functionValue = functionValue.replace(paramRegex, "( $1 )").replace(/\s*\b\s*,\s*\b\s*/gs, ", ").replace(/^\s*\(\s+\)\s*$/gs, "()");
          }
        }
        return valueFilter(functionValue);
      case "NaN":
        return valueFilter(this._inspectionValue.toString());
      case "array":
      case "object":
        const value = this._inspectionValue;
        if (value instanceof Date) {
          return valueFilter(this.args.localizeDates ? value.toLocaleString(this.args.locale, this.args.localizeDateOptions) : value.toString());
        }
        if (value instanceof RegExp) {
          return valueFilter(this._inspectionValue.toString().replace(/\\/g, "\\\\"));
        }
        return valueFilter(this._valueAsObject());
      case "string":
        return valueFilter(this.args.stringQuoteCharacter + this._inspectionValue + this.args.stringQuoteCharacter);
    }
    if (this.args.fallbackToJSON) {
      for (const fn of [
        "toJSON"
        // 'valueOf',
      ]) {
        if (typeof this._inspectionValue[fn] === "function") {
          const fnReturn = this._inspectionValue[fn]();
          if (fnReturn) {
            return `${via(`.${fn}()`)} ${JSON.stringify(fnReturn, null, 4)}`;
          }
        }
      }
    }
    for (const fn of [
      "toString",
      "stringify"
    ]) {
      if (typeof this._inspectionValue[fn] === "function") {
        const fnReturn = this._inspectionValue[fn]();
        if (typeof fnReturn === "string") {
          return `${via(`.${fn}()`)} ${fnReturn}`;
        }
      }
    }
    return `${via("interpolation")} ${String(this._inspectionValue)}`;
  }
  /* Exporters ===================================== */
  /**
   * Print the contents to the console.
   *
   * @category Exporters
   */
  dump() {
    return this.console.log(this.toString());
  }
  /**
   * The object shape used when converting to JSON.
   *
   * @category Exporters
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description | JSON.stringify}
   */
  toJSON() {
    const json = {
      name: this._name,
      type: this._typeOf,
      inspection: this.value(true)
    };
    const properties = {};
    this._properties.forEach((property) => {
      properties[property.key.name] = {
        key: property.key,
        value: property.vi.toJSON()
      };
    });
    json.properties = properties;
    return json;
  }
  /**
   * Overrides the default function to return a string representation of the
   * inspected variable’s value.
   *
   * @category Exporters
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString | Object.prototype.toString()}
   */
  toString() {
    const strs = [
      this.args.includePrefix && this.prefix(),
      this.args.includeType && this.type(),
      this.args.includeValue && this.value()
    ];
    return strs.filter((v) => v).join(" ");
  }
  /* Recursion ===================================== */
  /**
   * Returns an instance of this class that inherits this instances’s args.
   *
   * Meant for children/recursion of this inspection.
   *
   * @category Recursion
   */
  _new(variable, args = {}) {
    const fullArgs = {
      ...this.args,
      ...this.args.childArgs,
      ...args
    };
    fullArgs.formatter = {
      ...this.args.formatter ?? {},
      ...this.args.childArgs.formatter ?? {},
      ...args.formatter ?? {}
    };
    return new _VariableInspector(variable, fullArgs);
  }
  /* Translators ===================================== */
  /**
   * Creates a readable representation of {@link VariableInspector._inspectionValue}
   * as if its type is object (including arrays).
   *
   * @category Translators
   */
  _valueAsObject() {
    const openBrace = this._typeOf === "array" ? "[" : "{";
    const closeBrace = this._typeOf === "array" ? "]" : "}";
    if (!this._properties.length) {
      return openBrace + closeBrace;
    }
    const propStrs = this._properties.map((prop) => prop.vi.toString());
    const lineMapper = (line) => this.args.indent + line;
    const propPrefix = propStrs.length > 2 ? "\n" : "";
    const propMapper = (str) => propPrefix + str.split(/\n/g).map(lineMapper).join("\n");
    return [
      openBrace,
      ...propStrs.map(propMapper),
      closeBrace
    ].join("\n");
  }
};
(function(VariableInspector2) {
  ;
  ;
  ;
  let Samples;
  (function(Samples2) {
    class TestClass {
      undefinedProperty;
      property = "property sample value";
      static methodName(param) {
        return param;
      }
      _getSet = "_getSet sample value";
      get getSetProp() {
        return this._getSet;
      }
      set getSetProp(param) {
        this._getSet = param;
      }
    }
    ;
    function getVars(verbose) {
      const classInstance = new TestClass();
      const vars = {
        undefined: void 0,
        null: null,
        true: true,
        false: false,
        bigint: BigInt(9007199254740991),
        number: Number(207),
        "NaN": Number.NaN,
        string: "string sample value",
        stringMultiline: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec bibendum in",
          "justo vulputate euismod.Vivamus vel lectus dolor.Curabitur ullamcorper",
          "interdum diam, sit amet pulvinar odio tristique eget.Pellentesque sodales",
          "aliquam ex in convallis.Morbi tristique, risus et imperdiet aliquam, libero",
          "dolor faucibus lacus, in tempus metus elit non ante."
        ].join("\n"),
        array: ["string sample value", Number(207), {}],
        set: /* @__PURE__ */ new Set(["string sample value", Number(207), {}]),
        objectEmpty: {},
        objectSimple: {
          one: 1,
          two: 2
        },
        map: /* @__PURE__ */ new Map([["one", 1], ["two", 2]]),
        date: /* @__PURE__ */ new Date("2024-02-08"),
        regex: /^regex$/g,
        functionSimple: () => {
          return "hello";
        },
        functionParams: (value1, value2) => {
          const test = value2;
          return test + value1;
        },
        "class": TestClass,
        classInstance
      };
      if (!verbose) {
        delete vars["undefined"];
        delete vars["true"];
        delete vars["bigint"];
        delete vars["stringMultiline"];
        delete vars["array"];
        delete vars["objectEmpty"];
        delete vars["objectSimple"];
        delete vars["date"];
        delete vars["regex"];
        delete vars["functionSimple"];
        delete vars["functionParams"];
        delete vars["class"];
        delete vars["classInstance"];
      }
      return vars;
    }
    Samples2.getVars = getVars;
  })(Samples = VariableInspector2.Samples || (VariableInspector2.Samples = {}));
})(VariableInspector || (VariableInspector = {}));

// src/ts/classes/JsCookie.ts
var JsCookie = class {
  constructor(name, path, expireDaysOrOpts, dep_defaultValue = null, dep_copyToLocalStorage = false) {
    this.name = name;
    this.path = path;
    const maxAge = 60 * 60 * 24 * 365 * 5;
    this.opts = typeof expireDaysOrOpts !== "object" ? {
      copyToLocalStorage: dep_copyToLocalStorage,
      fallbackValue: dep_defaultValue ?? null,
      expireDays: expireDaysOrOpts ?? null,
      maxAge
    } : {
      copyToLocalStorage: expireDaysOrOpts?.copyToLocalStorage ?? false,
      fallbackValue: expireDaysOrOpts?.fallbackValue ?? null,
      expireDays: expireDaysOrOpts?.expireDays ?? null,
      maxAge: expireDaysOrOpts?.maxAge ?? maxAge
    };
  }
  /**
   * Empties the contents of this cookie.
   */
  delete() {
    this.set("", -1);
    if (this.opts.copyToLocalStorage) {
      window.localStorage.removeItem(this.name);
    }
  }
  /**
   * Gets the current value of this cookie.
   */
  get() {
    const decodedCookie = decodeURIComponent(document.cookie).split(";").map((str) => str.trim());
    const cookieRegex = new RegExp(`^${this.name}=`, "g");
    for (const pair of decodedCookie) {
      if (pair.match(cookieRegex) !== null) {
        return pair.replace(cookieRegex, "");
      }
    }
    return this.opts.fallbackValue;
  }
  /**
   * Sets this browser cookie.
   */
  set(value, expireDays = this.opts.expireDays) {
    if (this.opts.copyToLocalStorage) {
      window.localStorage.setItem(this.name, value);
    }
    const expiry = typeof expireDays === "number" ? (() => {
      const d = /* @__PURE__ */ new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1e3);
      return {
        date: d.toUTCString(),
        expireDays
      };
    })() : null;
    const cookie = {
      [this.name]: value,
      expires: expiry?.date?.length ? expiry.date : null,
      "max-age": expiry?.date?.length ? expiry.expireDays <= 0 ? 0 : null : String(this.opts.maxAge),
      path: this.path
    };
    const cookieString = [];
    for (const key in cookie) {
      if (cookie[key] !== null) {
        cookieString.push(`${key}=${cookie[key]}`);
      }
    }
    document.cookie = cookieString.join("; ");
  }
};

// src/ts/classes/SettingsMenu.ts
var SettingsMenu = class _SettingsMenu {
  /**
   * Not to be used directly. Use {@link SettingsMenu.new} instead.
   */
  constructor(elements, cookieNamer, opts) {
    this.cookieNamer = cookieNamer;
    this.opts = opts;
    this.#inputs = elements.inputs;
    this.menu = elements.menu;
    this.#resetButton = elements.resetButton;
    this.#targetElement = elements.target;
    this.resetButtonClicked = this.resetButtonClicked.bind(this);
    this.settingSelected = this.settingSelected.bind(this);
    this.update_allInputs = this.update_allInputs.bind(this);
    this._update_input = this._update_input.bind(this);
  }
  /**
   * Sets up a new instance.
   */
  static async new(target, menu, {
    scrollBehaviour = "auto",
    cookieNamer,
    ...opts
  } = {}) {
    const inputs = Array.from(menu.querySelectorAll(
      opts.selectors?.inputs || "input[data-settings-input]"
    ) ?? []);
    if (!inputs.length) {
      if (opts.debug) {
        console.debug("SettingsMenu.new() - failed, no inputs", { inputs, menu });
      }
      return void 0;
    }
    const optsComplete = {
      ...opts,
      cookieCacheExpireDays: opts.cookieCacheExpireDays ?? 7,
      cookiePrefix: opts.cookiePrefix ?? "",
      defaultCookieCache: opts.defaultCookieCache ?? false,
      path: menu.getAttribute(
        opts.selectors?.pathAttr || "data-settings-path"
      ) || "/"
    };
    const resetButton = menu.querySelector(
      optsComplete.selectors?.resetButton || "button[data-settings-reset]"
    );
    cookieNamer = cookieNamer ?? ((attr) => optsComplete.cookiePrefix + attr);
    const instance = new _SettingsMenu(
      { inputs, menu, resetButton, target },
      cookieNamer,
      optsComplete
    );
    if (optsComplete.debug) {
      console.debug("SettingsMenu.new() - constructed", { menu, instance });
    } else if (optsComplete.logResults) {
      console.info(
        `[SettingsMenu] new: ${menu.id ?? ""}`,
        "\nmenu: ",
        instance?.menu,
        "\nopts: ",
        instance?.opts
      );
    }
    return Promise.all(
      instance.#inputs.map(
        async (input) => {
          const attr = input.getAttribute("name");
          if (!attr) {
            if (instance.opts.debug) {
              console.debug("SettingsMenu.new() setupInput - returning early", {
                input,
                attr,
                menu: instance.menu.id
              });
            }
            return;
          }
          return instance._setup_attr_key(attr);
        }
      )
    ).then(
      () => {
        instance.update_allInputs();
        instance.#inputs?.forEach(
          (input) => input.addEventListener(
            "change",
            () => instance.settingSelected(input)
          )
        );
        instance.#resetButton?.addEventListener(
          "click",
          instance.resetButtonClicked
        );
        const scrollToMenu = () => menu.scrollIntoView({
          behavior: scrollBehaviour ?? "auto",
          block: "start",
          inline: "nearest"
        });
        menu.addEventListener("toggle-open", scrollToMenu);
        menu.addEventListener("toggle-close", scrollToMenu);
        return instance;
      }
    );
  }
  /**
   * @since 0.1.0-alpha
   */
  #attributeKeys = [];
  /**
   * For storing the cookies made to deal with each option.
   * 
   * @since 0.1.0-alpha
   */
  #cookies = {};
  /**
   * For storing the default value (if any) for each option.
   * 
   * @since 0.1.0-alpha
   */
  #defaults = {};
  /**
   * @since 0.1.0-alpha
   */
  #inputs;
  /**
   * @since 0.1.0-alpha
   */
  #resetButton;
  /**
   * @since 0.1.0-alpha
   */
  #targetElement;
  /**
   * Caches attr keys that have been succesfully set up.
   * 
   * @since 0.1.0-beta.0.draft
   */
  #set_default_listeners = {};
  /**
   * @since 0.1.0-beta.0.draft
   */
  async _set_default(attr) {
    const _defaultCookie = this.#cookies[attr + "-default"];
    const _update_allInputs = this.update_allInputs.bind(this);
    let defaultValue = null;
    switch (attr) {
      case "brightness-mode":
        const getBrightnessMode = () => {
          for (const value of ["light", "dark"]) {
            if (window.matchMedia(`( prefers-color-scheme: ${value} )`).matches) {
              return value;
            }
          }
          return null;
        };
        if (!this.#set_default_listeners[attr]) {
          window.matchMedia(`( prefers-color-scheme: no-preference )`).addEventListener("change", () => {
            const value = getBrightnessMode();
            value && _defaultCookie?.set(value);
            _update_allInputs();
          });
          this.#set_default_listeners[attr] = true;
        }
        defaultValue = getBrightnessMode();
        break;
      case "contrast-mode":
        const getContrastMode = () => {
          if (window.matchMedia(`( forced-colors: active )`).matches || window.matchMedia(`( prefers-contrast: custom )`).matches) {
            return "forced-colors";
          }
          if (window.matchMedia(`( prefers-contrast: less )`).matches) {
            return "low";
          }
          if (window.matchMedia(`( prefers-contrast: more )`).matches) {
            return "high";
          }
          return "average";
        };
        if (!this.#set_default_listeners[attr]) {
          window.matchMedia(`( prefers-contrast: no-preference )`).addEventListener("change", () => {
            const value = getContrastMode();
            value && _defaultCookie?.set(value);
            _update_allInputs();
          });
          this.#set_default_listeners[attr] = true;
        }
        defaultValue = getContrastMode();
        break;
      case "motion":
        const getMotion = () => {
          if (window.matchMedia("( prefers-reduced-motion: reduce )").matches) {
            defaultValue = "reduce";
          }
          return "no-preference";
        };
        if (!this.#set_default_listeners[attr]) {
          window.matchMedia(`( prefers-reduced-motion: no-preference )`).addEventListener("change", () => {
            const value = getMotion();
            value && _defaultCookie?.set(value);
            _update_allInputs();
          });
          this.#set_default_listeners[attr] = true;
        }
        defaultValue = getMotion();
        break;
      default:
        this.opts.defaultCookieCache = false;
        const fieldset = this.menu.querySelector(`[data-settings-menu-custom-setting=${attr}]`);
        if (!fieldset) {
          break;
        }
        defaultValue = fieldset.getAttribute("data-settings-menu-custom-setting-default");
        break;
    }
    if (this.opts.defaultCookieCache && !this.#cookies[attr + "-default"]) {
      this.#cookies[attr + "-default"] = new JsCookie(
        this.cookieNamer(attr + "-default"),
        this.opts.path,
        {
          copyToLocalStorage: true
        }
      );
    }
    this.#defaults[attr] = defaultValue;
    if (this.#defaults[attr]) {
      this.#cookies[attr + "-default"]?.set(this.#defaults[attr], this.opts.cookieCacheExpireDays);
    }
    if (this.opts.debug) {
      console.debug("SettingsMenu._set_default()", {
        attr,
        defaultValue,
        menu: this.menu.id
      });
    }
    return this.#defaults[attr];
  }
  /**
   * Caches attr keys that have been succesfully set up.
   * 
   * @since 0.1.0-beta.0.draft
   */
  #setup_attr_keys = {};
  /**
   * @since 0.1.0-alpha
   * @since 0.1.0-beta.0.draft — Made async.
   */
  async _setup_attr_key(attr, alwaysSetDefault = false) {
    if (this.#setup_attr_keys[attr] === true) {
      if (alwaysSetDefault) {
        return this._set_default(attr).then(() => {
        });
      }
      return;
    }
    this.#setup_attr_keys[attr] = true;
    if (!this.#attributeKeys.includes(attr)) {
      this.#attributeKeys.push(attr);
    }
    if (!this.#cookies[attr]) {
      this.#cookies[attr] = new JsCookie(
        this.cookieNamer(attr),
        this.opts.path,
        {
          copyToLocalStorage: true
        }
      );
    }
    const defaultValue = await this._set_default(attr);
    if (this.opts.debug) {
      console.debug("SettingsMenu._setup_attr_key()", {
        attr,
        defaultValue,
        menu: this.menu.id
      });
    }
  }
  /**
   * Triggered by a click lisetener.
   * 
   * @since 0.1.0-alpha
   */
  resetButtonClicked() {
    this.#attributeKeys.forEach((attr) => {
      const startingCookie = document.cookie;
      this.#cookies[attr]?.delete();
      this.#cookies[attr + "-default"]?.delete();
      if (this.opts.debug) {
        console.debug("SettingsMenu.resetButtonClicked() - forEach", {
          attr,
          cookie_get: this.#cookies[attr]?.get(),
          defaultCookieCache_get: this.#cookies[attr + "-default"]?.get(),
          cookie: this.#cookies[attr],
          defaultCookieCache: this.#cookies[attr + "-default"],
          "START - document.cookie": startingCookie,
          "END - document.cookie": document.cookie
        });
      }
    });
    if (this.opts.debug) {
      console.debug("SettingsMenu.resetButtonClicked() - before update_allInputs", {
        attributeKeys: this.#attributeKeys.map(
          (attr) => ({
            attr,
            cookie: this.#cookies[attr]?.get(),
            defaultCookieCache: this.#cookies[attr + "-default"]?.get()
          })
        )
      });
    }
    this.update_allInputs().then(
      () => this.opts.debug && console.debug("SettingsMenu.resetButtonClicked() - after update_allInputs")
    );
  }
  /**
   * A callback for when an input is selected.
   * 
   * @since 0.1.0-alpha
   */
  settingSelected(input) {
    const attr = input.getAttribute("name");
    if (!attr) {
      return;
    }
    const value = input.getAttribute("value");
    if (!value) {
      return;
    }
    this.#targetElement.setAttribute(`data-${attr}`, value);
    this.#cookies[attr]?.set(value);
    if (this.opts.debug) {
      console.debug("SettingsMenu.settingSelected()", {
        input,
        attr,
        value,
        attribute: this.#targetElement.getAttribute(`data-${attr}`),
        cookie_get: this.#cookies[attr]?.get(),
        defaultCookieCache_get: this.#cookies[attr + "-default"]?.get(),
        menu: this.menu.id
      });
    }
  }
  /**
   * @since 0.1.0-beta.0.draft
   */
  #update_allInputs_running = false;
  /**
   * @since 0.1.0-alpha
   */
  #update_allInputs_timeout = null;
  /**
   * @since 0.1.0-alpha
   */
  async update_allInputs() {
    if (this.#update_allInputs_running) {
      this.opts.debug && console.debug("SettingsMenu.update_allInputs() already running");
      return;
    }
    this.#update_allInputs_running = true;
    return new Promise(
      (resolve) => {
        this.#inputs?.forEach((input) => {
          input.checked = false;
        });
        const setDefaults = Promise.all(
          this.#attributeKeys.map((key) => this._set_default(key))
        );
        this.#update_allInputs_timeout && clearTimeout(this.#update_allInputs_timeout);
        this.#update_allInputs_timeout = setTimeout(
          () => setDefaults.then(
            () => Promise.all(
              this.#inputs?.map((i) => this._update_input(i))
            ).then(() => resolve())
          ),
          80
        );
      }
    ).then(() => {
      this.#update_allInputs_running = false;
    });
  }
  /**
   * Prepares single inputs and sets its current values.
   * 
   * @since 0.1.0-beta.0.draft
   */
  async _update_input(input) {
    const attr = input.getAttribute("name");
    if (!attr) {
      if (this.opts.debug) {
        console.debug("SettingsMenu._update_input()", {
          input,
          attr,
          menu: this.menu.id
        });
      }
      return;
    }
    return this._setup_attr_key(attr).then(
      () => {
        const value = input.getAttribute("value");
        if (!value) {
          if (this.opts.debug) {
            console.debug("SettingsMenu._update_input()", {
              input,
              attr,
              value,
              menu: this.menu.id
            });
          }
          return;
        }
        const current = this.#cookies[attr]?.get() ?? this.#defaults[attr] ?? null;
        if (this.opts.debug) {
          console.debug("SettingsMenu._update_input()", {
            input,
            attr,
            value,
            current,
            checked: `${value}` == `${current}`,
            localStorage: window.localStorage.getItem(this.cookieNamer(attr)),
            cookie: this.#cookies[attr]?.get(),
            default: this.#defaults[attr],
            menu: this.menu.id
          });
        }
        if (!current) {
          return;
        }
        input.checked = `${value}` == `${current}`;
        if (input.checked) {
          this.#targetElement.setAttribute(`data-${attr}`, current);
        }
      }
    );
  }
};
((SettingsMenu2) => {
  async function run_mapper(target, menu, {
    selectors = {},
    ...opts
  }) {
    const resetSelector = typeof selectors?.reset === "function" ? menu.id ? selectors.reset(menu.id) : "[data-settings-reset]" : selectors.reset ?? "[data-settings-reset]";
    return SettingsMenu2.new(target, menu, {
      ...opts,
      selectors: {
        inputs: selectors.inputs,
        pathAttr: selectors.pathAttr,
        resetButton: resetSelector
      }
    });
  }
  async function run(settingsMenus, scrollBehaviour = "auto", {
    targetElement,
    ...opts
  } = {}) {
    targetElement = targetElement ?? document.querySelector(opts.selectors?.target || ":root") ?? void 0;
    if (!targetElement) {
      return [];
    }
    const menuArray = hasIterator(settingsMenus) ? Array.from(settingsMenus) : [settingsMenus];
    return Promise.all(menuArray.map(
      (menu) => run_mapper(targetElement, menu, {
        ...opts,
        scrollBehaviour
      })
    )).then(
      (arr) => arr.filter((i) => !!i)
    );
  }
  SettingsMenu2.run = run;
  async function runOnLoad(opts = {}, attrsToSet = []) {
    const cookieNamer = (attr) => (opts.cookiePrefix ?? "") + attr;
    const targetElement = document.querySelector(opts.selectors?.target || ":root");
    window.addEventListener("load", async () => {
      const settingsMenus = document.querySelectorAll("[data-settings-menu]");
      const scrollBehaviour = window.getComputedStyle(document.documentElement).scrollBehavior || void 0;
      await SettingsMenu2.run(settingsMenus, scrollBehaviour, {
        ...opts,
        cookieNamer,
        targetElement
      });
    }, { once: true });
    if (opts.debug) {
      console.debug("SettingsMenu.runOnLoad()", {
        attrsToSet,
        targetElement
      });
    }
    if (attrsToSet.length && targetElement) {
      attrsToSet.forEach(
        (attr) => {
          let value = window.localStorage.getItem(cookieNamer(attr));
          if (!value && opts.defaultCookieCache) {
            value = window.localStorage.getItem(cookieNamer(attr + "-default"));
          }
          if (value) {
            targetElement.setAttribute(`data-${attr}`, value);
          }
          if (opts.debug) {
            console.debug("SettingsMenu.runOnLoad() attrsToSet", {
              attr,
              value,
              [`data-${attr}`]: targetElement.getAttribute(`data-${attr}`)
            });
          }
        }
      );
    }
  }
  SettingsMenu2.runOnLoad = runOnLoad;
  let Selectors;
  ((Selectors2) => {
    ;
    ;
  })(Selectors = SettingsMenu2.Selectors || (SettingsMenu2.Selectors = {}));
})(SettingsMenu || (SettingsMenu = {}));
export {
  SettingsMenu
};
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
/*! Bundled license information:

@maddimathon/utility-typescript/dist/functions/objects/objectKeySort.js:
@maddimathon/utility-typescript/dist/functions/arrays/arrayUnique.js:
@maddimathon/utility-typescript/dist/functions/arrays/hasIterator.js:
@maddimathon/utility-typescript/dist/functions/objects/deleteUndefinedProps.js:
@maddimathon/utility-typescript/dist/functions/maps/mapFlatten.js:
@maddimathon/utility-typescript/dist/functions/maps/mapFlattenAsync.js:
@maddimathon/utility-typescript/dist/functions/maps/mapToObject.js:
@maddimathon/utility-typescript/dist/functions/maps/mapToObjectAsync.js:
@maddimathon/utility-typescript/dist/functions/numbers/toValidNumber.js:
@maddimathon/utility-typescript/dist/functions/numbers/validNumber.js:
@maddimathon/utility-typescript/dist/functions/objects/isObjectEmpty.js:
@maddimathon/utility-typescript/dist/functions/objects/mergeArgs.js:
@maddimathon/utility-typescript/dist/functions/objects/mergeArgsAsync.js:
@maddimathon/utility-typescript/dist/functions/objects/objectEntries.js:
@maddimathon/utility-typescript/dist/functions/objects/objectFlatten.js:
@maddimathon/utility-typescript/dist/functions/objects/objectFlattenAsync.js:
@maddimathon/utility-typescript/dist/functions/objects/objectFromEntries.js:
@maddimathon/utility-typescript/dist/functions/objects/objectMap.js:
@maddimathon/utility-typescript/dist/functions/objects/objectMapAsync.js:
@maddimathon/utility-typescript/dist/functions/regex/escRegExp.js:
@maddimathon/utility-typescript/dist/functions/regex/escRegExpReplace.js:
@maddimathon/utility-typescript/dist/functions/numbers/makeNumber.js:
@maddimathon/utility-typescript/dist/functions/numbers/makeNumberAsync.js:
@maddimathon/utility-typescript/dist/functions/strings/slugify.js:
@maddimathon/utility-typescript/dist/functions/strings/softWrapText.js:
@maddimathon/utility-typescript/dist/functions/strings/timestamp.js:
@maddimathon/utility-typescript/dist/functions/strings/toTitleCase.js:
@maddimathon/utility-typescript/dist/functions/typeOf.js:
@maddimathon/utility-typescript/dist/classes/MessageMaker.js:
@maddimathon/utility-typescript/dist/classes/MiniConsole.js:
@maddimathon/utility-typescript/dist/classes/VariableInspector.js:
@maddimathon/utility-typescript/dist/index.js:
  (*!
   * @maddimathon/utility-typescript@2.0.0-beta.5.draft
   * @license MIT
   *)

@maddimathon/utility-typescript/dist/functions/objects/objectKeySortAsync.js:
  (*!
   * @maddimathon/design-system-utilities@2.0.0-beta.5.draft
   * @license MIT
   *)
*/
