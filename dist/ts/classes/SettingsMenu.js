/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SettingsMenu_attributeKeys, _SettingsMenu_cookies, _SettingsMenu_defaults, _SettingsMenu_inputs, _SettingsMenu_path, _SettingsMenu_resetButton, _SettingsMenu_rootElement, _SettingsMenu_timeout, _SettingsMenu_setup_attr_keys;
import { JsCookie } from './JsCookie.js';
/**
 * Sets up and manages the SettingsMenu component's js.
 *
 * @since 0.1.0-alpha
 */
export class SettingsMenu {
    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    constructor(
    /**
     * @since 0.1.0-beta.0.draft
     */
    root, 
    /**
     * @since 0.1.0-alpha
     */
    menu, 
    /**
     * @since 0.1.0-alpha
     */
    selectors) {
        this.menu = menu;
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
        _SettingsMenu_path.set(this, void 0);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_resetButton.set(this, void 0);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_rootElement.set(this, void 0);
        /**
         * @since 0.1.0-alpha
         */
        _SettingsMenu_timeout.set(this, null);
        /**
         * Caches attr keys that have been succesfully set up.
         *
         * @since 0.1.0-beta.0.draft
         */
        _SettingsMenu_setup_attr_keys.set(this, {});
        __classPrivateFieldSet(this, _SettingsMenu_rootElement, root, "f");
        __classPrivateFieldSet(this, _SettingsMenu_inputs, this.menu.querySelectorAll((selectors === null || selectors === void 0 ? void 0 : selectors.inputs) || 'input[data-settings-input]'), "f");
        __classPrivateFieldSet(this, _SettingsMenu_path, this.menu.getAttribute((selectors === null || selectors === void 0 ? void 0 : selectors.pathAttr) || 'data-settings-path') || '/', "f");
        __classPrivateFieldSet(this, _SettingsMenu_resetButton, this.menu.querySelector((selectors === null || selectors === void 0 ? void 0 : selectors.resetButton) || '[data-settings-reset]'), "f");
        this.resetButtonClicked = this.resetButtonClicked.bind(this);
        this.settingSelected = this.settingSelected.bind(this);
        this.update_allInputs = this.update_allInputs.bind(this);
        this._update_input = this._update_input.bind(this);
        // set values from localStorage if they exist
        Promise.all(Array.from(__classPrivateFieldGet(this, _SettingsMenu_inputs, "f")).map((input) => {
            const attr = input.getAttribute('name');
            // returns
            if (!attr) {
                return;
            }
            this._setup_attr_key(attr).then(() => {
                const value = input.getAttribute('value');
                // returns
                if (!value) {
                    return;
                }
                const current = window.localStorage.getItem(attr);
                // returns
                if (!current) {
                    return;
                }
                if (`${value}` == `${current}`) {
                    input.checked = true;
                    __classPrivateFieldGet(this, _SettingsMenu_rootElement, "f").setAttribute(`data-${attr}`, current);
                }
                else {
                    input.checked = false;
                }
            });
        })).then(() => {
            var _a;
            // returns
            if (!__classPrivateFieldGet(this, _SettingsMenu_resetButton, "f")) {
                return;
            }
            /*
             * Adding change event listener and collecting attribute names.
             */
            this.update_allInputs();
            (_a = __classPrivateFieldGet(this, _SettingsMenu_inputs, "f")) === null || _a === void 0 ? void 0 : _a.forEach((input) => {
                input.addEventListener('change', () => this.settingSelected(input));
            });
            /*
             * Add reset button listener.
             */
            __classPrivateFieldGet(this, _SettingsMenu_resetButton, "f").addEventListener('click', this.resetButtonClicked);
        });
    }
    /**
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Made async.
     */
    async _setup_attr_key(attr) {
        // returns
        if (__classPrivateFieldGet(this, _SettingsMenu_setup_attr_keys, "f")[attr] === true) {
            return;
        }
        let defaultValue = null;
        switch (attr) {
            case 'brightness-mode':
                window
                    .matchMedia(`( prefers-color-scheme: no-preference )`)
                    .addEventListener('change', this.update_allInputs);
                ['light', 'dark'].forEach((value) => {
                    if (window.matchMedia(`( prefers-color-scheme: ${value} )`).matches) {
                        defaultValue = value;
                    }
                });
                break;
            case 'contrast-mode':
                window
                    .matchMedia(`( prefers-contrast: no-preference )`)
                    .addEventListener('change', this.update_allInputs);
                defaultValue = 'average';
                if (window.matchMedia(`( forced-colors: active )`).matches
                    || window.matchMedia(`( prefers-contrast: custom )`).matches) {
                    defaultValue = 'forced-colors';
                }
                else if (window.matchMedia(`( prefers-contrast: less )`).matches) {
                    defaultValue = 'low';
                }
                else if (window.matchMedia(`( prefers-contrast: more )`).matches) {
                    defaultValue = 'high';
                }
                break;
            case 'motion':
                window
                    .matchMedia(`( prefers-reduced-motion: reduce )`)
                    .addEventListener('change', this.update_allInputs);
                defaultValue = 'reduce';
                if (window.matchMedia('( prefers-reduced-motion: no-preference )').matches) {
                    defaultValue = 'no-preference';
                }
                break;
            default:
                const fieldset = this.menu.querySelector(`[data-settings-menu-custom-setting=${attr}]`);
                // breaks
                if (!fieldset) {
                    break;
                }
                defaultValue = fieldset.getAttribute('data-settings-menu-custom-setting-default');
                break;
        }
        __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr] = defaultValue;
        // returns
        if (__classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").includes(attr) || __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) {
            return;
        }
        __classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").push(attr);
        __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr] = new JsCookie(attr, __classPrivateFieldGet(this, _SettingsMenu_path, "f"), null, null, true);
        __classPrivateFieldGet(this, _SettingsMenu_setup_attr_keys, "f")[attr] = true;
    }
    /**
     * Triggered by a click lisetener.
     *
     * @since 0.1.0-alpha
     */
    resetButtonClicked() {
        __classPrivateFieldGet(this, _SettingsMenu_attributeKeys, "f").forEach((attr) => {
            var _a;
            __classPrivateFieldGet(this, _SettingsMenu_rootElement, "f").removeAttribute(attr);
            (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.delete();
        });
        this.update_allInputs();
    }
    /**
     * A callback for when an input is selected.
     *
     * @since 0.1.0-alpha
     */
    settingSelected(input) {
        var _a;
        const attr = input.getAttribute('name');
        if (!attr) {
            return;
        }
        const value = input.getAttribute('value');
        if (!value) {
            return;
        }
        __classPrivateFieldGet(this, _SettingsMenu_rootElement, "f").setAttribute(`data-${attr}`, value);
        (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.set(value);
    }
    /**
     * @since 0.1.0-alpha
     */
    update_allInputs() {
        var _a;
        (_a = __classPrivateFieldGet(this, _SettingsMenu_inputs, "f")) === null || _a === void 0 ? void 0 : _a.forEach((input) => {
            input.checked = false;
        });
        // fixes issues about reselecting updated values after settings
        // reset and quick-triggered event listeners
        __classPrivateFieldGet(this, _SettingsMenu_timeout, "f") && clearTimeout(__classPrivateFieldGet(this, _SettingsMenu_timeout, "f"));
        __classPrivateFieldSet(this, _SettingsMenu_timeout, setTimeout(() => { var _a; return Promise.all(Array.from((_a = __classPrivateFieldGet(this, _SettingsMenu_inputs, "f")) !== null && _a !== void 0 ? _a : []).map(this._update_input)); }, 100), "f");
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
            return;
        }
        return this._setup_attr_key(attr).then(() => {
            var _a, _b, _c;
            const value = input.getAttribute('value');
            // returns
            if (!value) {
                return;
            }
            const current = (_c = (_b = (_a = __classPrivateFieldGet(this, _SettingsMenu_cookies, "f")[attr]) === null || _a === void 0 ? void 0 : _a.get()) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _SettingsMenu_defaults, "f")[attr]) !== null && _c !== void 0 ? _c : null;
            // returns
            if (!current) {
                return;
            }
            if (`${value}` == `${current}`) {
                input.checked = true;
                __classPrivateFieldGet(this, _SettingsMenu_rootElement, "f").setAttribute(`data-${attr}`, current);
            }
            else {
                input.checked = false;
            }
        });
    }
}
_SettingsMenu_attributeKeys = new WeakMap(), _SettingsMenu_cookies = new WeakMap(), _SettingsMenu_defaults = new WeakMap(), _SettingsMenu_inputs = new WeakMap(), _SettingsMenu_path = new WeakMap(), _SettingsMenu_resetButton = new WeakMap(), _SettingsMenu_rootElement = new WeakMap(), _SettingsMenu_timeout = new WeakMap(), _SettingsMenu_setup_attr_keys = new WeakMap();
/**
 * Utilities for the {@link SettingsMenu} class.
 *
 * @since 0.1.0-alpha
 */
(function (SettingsMenu) {
    /**
     * @since 0.1.0-beta.0.draft
     */
    async function init_mapper(root, menu, scrollBehaviour, selectors) {
        var _a;
        const resetSelector = typeof (selectors === null || selectors === void 0 ? void 0 : selectors.reset) === 'function'
            ? menu.id ? selectors.reset(menu.id) : '[data-settings-reset]'
            : (_a = selectors.reset) !== null && _a !== void 0 ? _a : '[data-settings-reset]';
        new SettingsMenu(root, menu, {
            inputs: selectors.inputs,
            pathAttr: selectors.pathAttr,
            resetButton: resetSelector,
        });
        const scrollToMenu = () => menu.scrollIntoView({
            behavior: scrollBehaviour !== null && scrollBehaviour !== void 0 ? scrollBehaviour : 'auto',
            block: 'start',
            inline: 'nearest',
        });
        menu.addEventListener('toggle-open', scrollToMenu);
        menu.addEventListener('toggle-close', scrollToMenu);
        // trap the focus order in the menu
        const menuID = menu.id;
        if (!menuID) {
            return;
        }
        const sels = {
            reset: resetSelector,
            toggle: (selectors === null || selectors === void 0 ? void 0 : selectors.toggle)
                ? (typeof selectors.toggle === 'function'
                    ? selectors.toggle(menuID)
                    : selectors.toggle)
                : `button[data-toggle-control=${menuID}]`,
        };
        const toggleButton = document.querySelector(sels.toggle);
        if (!toggleButton) {
            return;
        }
        const resetButton = menu.querySelector(sels.reset);
        if (!resetButton) {
            return;
        }
        const toggleBlur = (event) => {
            if ((event === null || event === void 0 ? void 0 : event.relatedTarget) &&
                !menu.contains(event.relatedTarget)) {
                resetButton.focus();
            }
        };
        const resetBlur = (event) => {
            if ((event === null || event === void 0 ? void 0 : event.relatedTarget) &&
                !menu.contains(event.relatedTarget)) {
                toggleButton.focus();
            }
        };
        menu.addEventListener('toggle-open', () => {
            toggleButton.addEventListener('blur', toggleBlur);
            resetButton.addEventListener('blur', resetBlur);
        });
        menu.addEventListener('toggle-close', () => {
            toggleButton.removeEventListener('blur', toggleBlur);
            resetButton.removeEventListener('blur', resetBlur);
            toggleButton.focus();
        });
    }
    /**
     * Initializes the given settings menu(s).
     *
     * @since 0.1.0-alpha
     */
    async function init(settingsMenus, scrollBehaviour = 'auto', selectors = {}) {
        const rootElement = document.querySelector((selectors === null || selectors === void 0 ? void 0 : selectors.root) || ':root');
        const menuArray = typeof settingsMenus.forEach === 'function'
            ? Array.from(settingsMenus)
            : [settingsMenus];
        return Promise.all(menuArray.map(menu => init_mapper(rootElement, menu, scrollBehaviour, selectors)));
    }
    SettingsMenu.init = init;
    /**
     * @since 0.1.0-beta.0.draft
     */
    let Selectors;
    (function (Selectors) {
        ;
        ;
    })(Selectors = SettingsMenu.Selectors || (SettingsMenu.Selectors = {}));
})(SettingsMenu || (SettingsMenu = {}));
