/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _SettingsMenu_attributeKeys, _SettingsMenu_cookies, _SettingsMenu_defaults, _SettingsMenu_inputs, _SettingsMenu_resetButton, _SettingsMenu_targetElement, _SettingsMenu_set_default_listeners, _SettingsMenu_setup_attr_keys, _SettingsMenu_update_allInputs_running, _SettingsMenu_update_allInputs_timeout;
import { hasIterator } from '@maddimathon/utility-typescript';
import { JsCookie } from './JsCookie.js';
/**
 * Sets up and manages the SettingsMenu component's js.
 *
 * @since 0.1.0-alpha
 */
export class SettingsMenu {
    /**
     * Sets up a new instance.
     */
    static async new(
    /**
     * The element on which to update data attributes to reflect settings values.
     */
    target, 
    /**
     * The container containing all fieldsets in inputs for this menu.
     */
    menu, _a = {}) {
        var _b, _c, _d, _e, _f, _g, _h, _j;
        var { scrollBehaviour = 'auto', cookieNamer } = _a, opts = __rest(_a, ["scrollBehaviour", "cookieNamer"]);
        const inputs = Array.from((_c = menu.querySelectorAll(((_b = opts.selectors) === null || _b === void 0 ? void 0 : _b.inputs) || 'input[data-settings-input]')) !== null && _c !== void 0 ? _c : []);
        // returns
        if (!inputs.length) {
            if (opts.debug) {
                console.debug('SettingsMenu.new() - failed, no inputs', { inputs, menu });
            }
            return undefined;
        }
        const optsComplete = Object.assign(Object.assign({}, opts), { cookieCacheExpireDays: (_d = opts.cookieCacheExpireDays) !== null && _d !== void 0 ? _d : 7, cookiePrefix: (_e = opts.cookiePrefix) !== null && _e !== void 0 ? _e : '', defaultCookieCache: (_f = opts.defaultCookieCache) !== null && _f !== void 0 ? _f : false, path: menu.getAttribute(((_g = opts.selectors) === null || _g === void 0 ? void 0 : _g.pathAttr) || 'data-settings-path') || '/' });
        const resetButton = menu.querySelector(((_h = optsComplete.selectors) === null || _h === void 0 ? void 0 : _h.resetButton) || 'button[data-settings-reset]');
        cookieNamer = cookieNamer !== null && cookieNamer !== void 0 ? cookieNamer : ((attr) => optsComplete.cookiePrefix + attr);
        const instance = new SettingsMenu({ inputs, menu, resetButton, target }, cookieNamer, optsComplete);
        if (optsComplete.debug) {
            console.debug('SettingsMenu.new() - constructed', { menu, instance });
        }
        else if (optsComplete.logResults) {
            console.info(`[SettingsMenu] new: ${(_j = menu.id) !== null && _j !== void 0 ? _j : ''}`, '\nmenu: ', instance === null || instance === void 0 ? void 0 : instance.menu, '\nopts: ', instance === null || instance === void 0 ? void 0 : instance.opts);
        }
        return Promise.all(__classPrivateFieldGet(instance, _SettingsMenu_inputs, "f").map(async (input) => {
            const attr = input.getAttribute('name');
            // returns
            if (!attr) {
                if (instance.opts.debug) {
                    console.debug('SettingsMenu.new() setupInput - returning early', {
                        input,
                        attr,
                        menu: instance.menu.id,
                    });
                }
                return;
            }
            return instance._setup_attr_key(attr);
        })).then(() => {
            var _a, _b;
            /*
             * Adding change event listener and collecting attribute names.
             */
            instance.update_allInputs();
            (_a = __classPrivateFieldGet(instance, _SettingsMenu_inputs, "f")) === null || _a === void 0 ? void 0 : _a.forEach(input => input.addEventListener('change', () => instance.settingSelected(input)));
            /*
             * Add reset button listener.
             */
            (_b = __classPrivateFieldGet(instance, _SettingsMenu_resetButton, "f")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', instance.resetButtonClicked);
            const scrollToMenu = () => menu.scrollIntoView({
                behavior: scrollBehaviour !== null && scrollBehaviour !== void 0 ? scrollBehaviour : 'auto',
                block: 'start',
                inline: 'nearest',
            });
            menu.addEventListener('toggle-open', scrollToMenu);
            menu.addEventListener('toggle-close', scrollToMenu);
            return instance;
        });
    }
    /**
     * Not to be used directly. Use {@link SettingsMenu.new} instead.
     */
    constructor(
    /**
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Is now an object accepting many elements.
     */
    elements, cookieNamer, 
    /**
     * @since 0.1.0-beta.0.draft
     */
    opts) {
        this.cookieNamer = cookieNamer;
        this.opts = opts;
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_attributeKeys.set(this, []);
        /**
         * For storing the cookies made to deal with each option.
         *
         * @since 0.1.0-alpha
         */
        _SettingsMenu_cookies.set(this, {});
        /**
         * For storing the default value (if any) for each option.
         *
         * @since 0.1.0-alpha
         */
        _SettingsMenu_defaults.set(this, {});
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_inputs.set(this, void 0);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_resetButton.set(this, void 0);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_targetElement.set(this, void 0);
        /**
         * Caches attr keys that have been succesfully set up.
         *
         * @since 0.1.0-beta.0.draft
         */
        _SettingsMenu_set_default_listeners.set(this, {});
        /**
         * Caches attr keys that have been succesfully set up.
         *
         * @since 0.1.0-beta.0.draft
         */
        _SettingsMenu_setup_attr_keys.set(this, {});
        /**
         * @since 0.1.0-beta.0.draft
         */
        _SettingsMenu_update_allInputs_running.set(this, false);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_update_allInputs_timeout.set(this, null);
        __classPrivateFieldSet(this, _SettingsMenu_inputs, elements.inputs, "f");
        this.menu = elements.menu;
        __classPrivateFieldSet(this, _SettingsMenu_resetButton, elements.resetButton, "f");
        __classPrivateFieldSet(this, _SettingsMenu_targetElement, elements.target, "f");
        this.resetButtonClicked = this.resetButtonClicked.bind(this);
        this.settingSelected = this.settingSelected.bind(this);
        this.update_allInputs = this.update_allInputs.bind(this);
        this._update_input = this._update_input.bind(this);
    }
    /**
     * @since 0.1.0-beta.0.draft
     */
    async _set_default(attr) {
        var _a;
        const _defaultCookie = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default'];
        const _update_allInputs = this.update_allInputs.bind(this);
        let defaultValue = null;
        switch (attr) {
            case 'brightness-mode':
                const getBrightnessMode = () => {
                    // returns on success
                    for (const value of ['light', 'dark']) {
                        if (window.matchMedia(`( prefers-color-scheme: ${value} )`).matches) {
                            return value;
                        }
                    }
                    return null;
                };
                if (!__classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr]) {
                    window
                        .matchMedia(`( prefers-color-scheme: no-preference )`)
                        .addEventListener('change', () => {
                        const value = getBrightnessMode();
                        value && (_defaultCookie === null || _defaultCookie === void 0 ? void 0 : _defaultCookie.set(value));
                        _update_allInputs();
                    });
                    __classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr] = true;
                }
                defaultValue = getBrightnessMode();
                break;
            case 'contrast-mode':
                const getContrastMode = () => {
                    // returns
                    if (window.matchMedia(`( forced-colors: active )`).matches
                        || window.matchMedia(`( prefers-contrast: custom )`).matches) {
                        return 'forced-colors';
                    }
                    // returns
                    if (window.matchMedia(`( prefers-contrast: less )`).matches) {
                        return 'low';
                    }
                    // returns
                    if (window.matchMedia(`( prefers-contrast: more )`).matches) {
                        return 'high';
                    }
                    return 'average';
                };
                if (!__classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr]) {
                    window
                        .matchMedia(`( prefers-contrast: no-preference )`)
                        .addEventListener('change', () => {
                        const value = getContrastMode();
                        value && (_defaultCookie === null || _defaultCookie === void 0 ? void 0 : _defaultCookie.set(value));
                        _update_allInputs();
                    });
                    __classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr] = true;
                }
                defaultValue = getContrastMode();
                break;
            case 'motion':
                const getMotion = () => {
                    // returns
                    if (window.matchMedia('( prefers-reduced-motion: reduce )').matches) {
                        defaultValue = 'reduce';
                    }
                    return 'no-preference';
                };
                if (!__classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr]) {
                    window
                        .matchMedia(`( prefers-reduced-motion: no-preference )`)
                        .addEventListener('change', () => {
                        const value = getMotion();
                        value && (_defaultCookie === null || _defaultCookie === void 0 ? void 0 : _defaultCookie.set(value));
                        _update_allInputs();
                    });
                    __classPrivateFieldGet(this, _SettingsMenu_set_default_listeners, "f")[attr] = true;
                }
                defaultValue = getMotion();
                break;
            default:
                this.opts.defaultCookieCache = false;
                const fieldset = this.menu.querySelector(`[data-settings-menu-custom-setting=${attr}]`);
                // breaks
                if (!fieldset) {
                    break;
                }
                defaultValue = fieldset.getAttribute('data-settings-menu-custom-setting-default');
                break;
        }
        if (this.opts.defaultCookieCache && !__classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) {
            __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default'] = new JsCookie(this.cookieNamer(attr + '-default'), this.opts.path, {
                copyToLocalStorage: true,
            });
        }
        __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr] = defaultValue;
        if (__classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr]) {
            (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) === null || _a === void 0 ? void 0 : _a.set(__classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr], this.opts.cookieCacheExpireDays);
        }
        if (this.opts.debug) {
            console.debug('SettingsMenu._set_default()', {
                attr,
                defaultValue,
                menu: this.menu.id,
            });
        }
        return __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr];
    }
    /**
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Made async.
     */
    async _setup_attr_key(attr, alwaysSetDefault = false) {
        // returns
        if (__classPrivateFieldGet(this, _SettingsMenu_setup_attr_keys, "f")[attr] === true) {
            // returns
            if (alwaysSetDefault) {
                return this._set_default(attr).then(() => { });
            }
            return;
        }
        __classPrivateFieldGet(this, _SettingsMenu_setup_attr_keys, "f")[attr] = true;
        if (!__classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").includes(attr)) {
            __classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").push(attr);
        }
        if (!__classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) {
            __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr] = new JsCookie(this.cookieNamer(attr), this.opts.path, {
                copyToLocalStorage: true,
            });
        }
        const defaultValue = await this._set_default(attr);
        if (this.opts.debug) {
            console.debug('SettingsMenu._setup_attr_key()', {
                attr,
                defaultValue,
                menu: this.menu.id,
            });
        }
    }
    /**
     * Triggered by a click lisetener.
     *
     * @since 0.1.0-alpha
     */
    resetButtonClicked() {
        __classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").forEach((attr) => {
            var _a, _b, _c, _d;
            const startingCookie = document.cookie;
            (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.delete();
            (_b = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) === null || _b === void 0 ? void 0 : _b.delete();
            if (this.opts.debug) {
                console.debug('SettingsMenu.resetButtonClicked() - forEach', {
                    attr,
                    cookie_get: (_c = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _c === void 0 ? void 0 : _c.get(),
                    defaultCookieCache_get: (_d = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) === null || _d === void 0 ? void 0 : _d.get(),
                    cookie: __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr],
                    defaultCookieCache: __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default'],
                    'START - document.cookie': startingCookie,
                    'END - document.cookie': document.cookie,
                });
            }
        });
        if (this.opts.debug) {
            console.debug('SettingsMenu.resetButtonClicked() - before update_allInputs', {
                attributeKeys: __classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").map(attr => {
                    var _a, _b;
                    return ({
                        attr,
                        cookie: (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.get(),
                        defaultCookieCache: (_b = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) === null || _b === void 0 ? void 0 : _b.get(),
                    });
                })
            });
        }
        this.update_allInputs().then(() => this.opts.debug && console.debug('SettingsMenu.resetButtonClicked() - after update_allInputs'));
    }
    /**
     * A callback for when an input is selected.
     *
     * @since 0.1.0-alpha
     */
    settingSelected(input) {
        var _a, _b, _c;
        const attr = input.getAttribute('name');
        // returns
        if (!attr) {
            return;
        }
        const value = input.getAttribute('value');
        // returns
        if (!value) {
            return;
        }
        __classPrivateFieldGet(this, _SettingsMenu_targetElement, "f").setAttribute(`data-${attr}`, value);
        (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.set(value);
        if (this.opts.debug) {
            console.debug('SettingsMenu.settingSelected()', {
                input,
                attr,
                value,
                attribute: __classPrivateFieldGet(this, _SettingsMenu_targetElement, "f").getAttribute(`data-${attr}`),
                cookie_get: (_b = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _b === void 0 ? void 0 : _b.get(),
                defaultCookieCache_get: (_c = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr + '-default']) === null || _c === void 0 ? void 0 : _c.get(),
                menu: this.menu.id,
            });
        }
    }
    /**
     * @since 0.1.0-alpha
     */
    async update_allInputs() {
        // returns
        if (__classPrivateFieldGet(this, _SettingsMenu_update_allInputs_running, "f")) {
            this.opts.debug && console.debug('SettingsMenu.update_allInputs() already running');
            return;
        }
        __classPrivateFieldSet(this, _SettingsMenu_update_allInputs_running, true, "f");
        return new Promise((resolve) => {
            var _a;
            (_a = __classPrivateFieldGet(this, _SettingsMenu_inputs, "f")) === null || _a === void 0 ? void 0 : _a.forEach((input) => {
                input.checked = false;
            });
            // we can start this before the timeout
            const setDefaults = Promise.all(__classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").map(key => this._set_default(key)));
            // the timeout/delay fixes issues about reselecting updated values
            // quickly after reset and quick-triggered event listeners
            __classPrivateFieldGet(this, _SettingsMenu_update_allInputs_timeout, "f") && clearTimeout(__classPrivateFieldGet(this, _SettingsMenu_update_allInputs_timeout, "f"));
            __classPrivateFieldSet(this, _SettingsMenu_update_allInputs_timeout, setTimeout(() => setDefaults.then(() => {
                var _a;
                return Promise.all((_a = __classPrivateFieldGet(this, _SettingsMenu_inputs, "f")) === null || _a === void 0 ? void 0 : _a.map(i => this._update_input(i))).then(() => resolve());
            }), 80), "f");
        }).then(() => {
            __classPrivateFieldSet(this, _SettingsMenu_update_allInputs_running, false, "f");
        });
    }
    /**
     * Prepares single inputs and sets its current values.
     *
     * @since 0.1.0-beta.0.draft
     */
    async _update_input(input) {
        const attr = input.getAttribute('name');
        // returns
        if (!attr) {
            if (this.opts.debug) {
                console.debug('SettingsMenu._update_input()', {
                    input,
                    attr,
                    menu: this.menu.id,
                });
            }
            return;
        }
        return this._setup_attr_key(attr).then(() => {
            var _a, _b, _c, _d;
            const value = input.getAttribute('value');
            // returns
            if (!value) {
                if (this.opts.debug) {
                    console.debug('SettingsMenu._update_input()', {
                        input,
                        attr,
                        value,
                        menu: this.menu.id,
                    });
                }
                return;
            }
            const current = (_c = (_b = (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.get()) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr]) !== null && _c !== void 0 ? _c : null;
            if (this.opts.debug) {
                console.debug('SettingsMenu._update_input()', {
                    input,
                    attr,
                    value,
                    current,
                    checked: `${value}` == `${current}`,
                    localStorage: window.localStorage.getItem(this.cookieNamer(attr)),
                    cookie: (_d = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _d === void 0 ? void 0 : _d.get(),
                    default: __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr],
                    menu: this.menu.id,
                });
            }
            // returns
            if (!current) {
                return;
            }
            input.checked = `${value}` == `${current}`;
            if (input.checked) {
                __classPrivateFieldGet(this, _SettingsMenu_targetElement, "f").setAttribute(`data-${attr}`, current);
            }
        });
    }
}
_SettingsMenu_attributeKeys = new WeakMap(), _SettingsMenu_cookies = new WeakMap(), _SettingsMenu_defaults = new WeakMap(), _SettingsMenu_inputs = new WeakMap(), _SettingsMenu_resetButton = new WeakMap(), _SettingsMenu_targetElement = new WeakMap(), _SettingsMenu_set_default_listeners = new WeakMap(), _SettingsMenu_setup_attr_keys = new WeakMap(), _SettingsMenu_update_allInputs_running = new WeakMap(), _SettingsMenu_update_allInputs_timeout = new WeakMap();
/**
 * Utilities for the {@link SettingsMenu} class.
 *
 * @since 0.1.0-alpha
 */
(function (SettingsMenu) {
    /**
     * @since 0.1.0-beta.0.draft
     */
    async function run_mapper(target, menu, _a) {
        var _b;
        var { selectors = {} } = _a, opts = __rest(_a, ["selectors"]);
        const resetSelector = typeof (selectors === null || selectors === void 0 ? void 0 : selectors.reset) === 'function'
            ? menu.id ? selectors.reset(menu.id) : '[data-settings-reset]'
            : (_b = selectors.reset) !== null && _b !== void 0 ? _b : '[data-settings-reset]';
        return SettingsMenu.new(target, menu, Object.assign(Object.assign({}, opts), { selectors: {
                inputs: selectors.inputs,
                pathAttr: selectors.pathAttr,
                resetButton: resetSelector,
            } }));
    }
    /**
     * Initializes the given settings menu(s).
     *
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Renamed from init to run. Changed third param from selector to opts (which contains selectors).
     */
    async function run(settingsMenus, scrollBehaviour = 'auto', _a = {}) {
        var _b, _c;
        var { targetElement } = _a, opts = __rest(_a, ["targetElement"]);
        targetElement = (_c = targetElement !== null && targetElement !== void 0 ? targetElement : document.querySelector(((_b = opts.selectors) === null || _b === void 0 ? void 0 : _b.target) || ':root')) !== null && _c !== void 0 ? _c : undefined;
        // returns
        if (!targetElement) {
            return [];
        }
        const menuArray = hasIterator(settingsMenus)
            ? Array.from(settingsMenus)
            : [settingsMenus];
        return Promise.all(menuArray.map(menu => run_mapper(targetElement, menu, Object.assign(Object.assign({}, opts), { scrollBehaviour })))).then(arr => arr.filter(i => !!i));
    }
    SettingsMenu.run = run;
    /**
     * Adds a 'load' event listener that then {@link SettingsMenu.run}, querying
     * the document for settings menu containers to set them up as instances of
     * this class.
     *
     * @since 0.1.0-beta.0.draft
     */
    async function runOnLoad(opts = {}, attrsToSet = []) {
        var _a;
        const cookieNamer = (attr) => { var _a; return ((_a = opts.cookiePrefix) !== null && _a !== void 0 ? _a : '') + attr; };
        const targetElement = document.querySelector(((_a = opts.selectors) === null || _a === void 0 ? void 0 : _a.target) || ':root');
        window.addEventListener('load', async () => {
            const settingsMenus = document.querySelectorAll('[data-settings-menu]');
            const scrollBehaviour = window.getComputedStyle(document.documentElement).scrollBehavior || undefined;
            /*
             * Setting up each found menu.
             */
            await SettingsMenu.run(settingsMenus, scrollBehaviour, Object.assign(Object.assign({}, opts), { cookieNamer,
                targetElement }));
        }, { once: true });
        if (opts.debug) {
            console.debug('SettingsMenu.runOnLoad()', {
                attrsToSet,
                targetElement,
            });
        }
        if (attrsToSet.length && targetElement) {
            attrsToSet.forEach(attr => {
                let value = window.localStorage.getItem(cookieNamer(attr));
                if (!value && opts.defaultCookieCache) {
                    value = window.localStorage.getItem(cookieNamer(attr + '-default'));
                }
                if (value) {
                    targetElement.setAttribute(`data-${attr}`, value);
                }
                if (opts.debug) {
                    console.debug('SettingsMenu.runOnLoad() attrsToSet', {
                        attr,
                        value,
                        [`data-${attr}`]: targetElement.getAttribute(`data-${attr}`),
                    });
                }
            });
        }
    }
    SettingsMenu.runOnLoad = runOnLoad;
    /**
     * @since 0.1.0-beta.0.draft
     */
    let Selectors;
    (function (Selectors) {
        ;
        ;
    })(Selectors = SettingsMenu.Selectors || (SettingsMenu.Selectors = {}));
})(SettingsMenu || (SettingsMenu = {}));
