/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
import { JsCookie } from './JsCookie.js';
/**
 * Sets up and manages the SettingsMenu component's js.
 *
 * @since 0.1.0-alpha
 */
export class SettingsMenu {
    menu;
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
    #path;
    /**
     * @since 0.1.0-alpha
     */
    #resetButton;
    /**
     * @since 0.1.0-alpha
     */
    #rootElement;
    /**
     * @since 0.1.0-alpha
     */
    #timeout = null;
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
        this.#rootElement = root;
        this.#inputs = this.menu.querySelectorAll(selectors?.inputs || 'input[data-settings-input]');
        this.#path = this.menu.getAttribute(selectors?.pathAttr || 'data-settings-path') || '/';
        this.#resetButton = this.menu.querySelector(selectors?.resetButton || '[data-settings-reset]');
        this.resetButtonClicked = this.resetButtonClicked.bind(this);
        this.settingSelected = this.settingSelected.bind(this);
        this.update_allInputs = this.update_allInputs.bind(this);
        this._update_input = this._update_input.bind(this);
        // set values from localStorage if they exist
        Promise.all(Array.from(this.#inputs).map((input) => {
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
                    this.#rootElement.setAttribute(`data-${attr}`, current);
                }
                else {
                    input.checked = false;
                }
            });
        })).then(() => {
            // returns
            if (!this.#resetButton) {
                return;
            }
            /*
             * Adding change event listener and collecting attribute names.
             */
            this.update_allInputs();
            this.#inputs?.forEach((input) => {
                input.addEventListener('change', () => this.settingSelected(input));
            });
            /*
             * Add reset button listener.
             */
            this.#resetButton.addEventListener('click', this.resetButtonClicked);
        });
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
    async _setup_attr_key(attr) {
        // returns
        if (this.#setup_attr_keys[attr] === true) {
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
        this.#defaults[attr] = defaultValue;
        // returns
        if (this.#attributeKeys.includes(attr) || this.#cookies[attr]) {
            return;
        }
        this.#attributeKeys.push(attr);
        this.#cookies[attr] = new JsCookie(attr, this.#path, null, null, true);
        this.#setup_attr_keys[attr] = true;
    }
    /**
     * Triggered by a click lisetener.
     *
     * @since 0.1.0-alpha
     */
    resetButtonClicked() {
        this.#attributeKeys.forEach((attr) => {
            this.#rootElement.removeAttribute(attr);
            this.#cookies[attr]?.delete();
        });
        this.update_allInputs();
    }
    /**
     * A callback for when an input is selected.
     *
     * @since 0.1.0-alpha
     */
    settingSelected(input) {
        const attr = input.getAttribute('name');
        if (!attr) {
            return;
        }
        const value = input.getAttribute('value');
        if (!value) {
            return;
        }
        this.#rootElement.setAttribute(`data-${attr}`, value);
        this.#cookies[attr]?.set(value);
    }
    /**
     * @since 0.1.0-alpha
     */
    update_allInputs() {
        this.#inputs?.forEach((input) => {
            input.checked = false;
        });
        // fixes issues about reselecting updated values after settings
        // reset and quick-triggered event listeners
        this.#timeout && clearTimeout(this.#timeout);
        this.#timeout = setTimeout(() => Promise.all(Array.from(this.#inputs ?? []).map(this._update_input)), 100);
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
            const value = input.getAttribute('value');
            // returns
            if (!value) {
                return;
            }
            const current = this.#cookies[attr]?.get() ?? this.#defaults[attr] ?? null;
            // returns
            if (!current) {
                return;
            }
            if (`${value}` == `${current}`) {
                input.checked = true;
                this.#rootElement.setAttribute(`data-${attr}`, current);
            }
            else {
                input.checked = false;
            }
        });
    }
}
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
        const resetSelector = typeof selectors?.reset === 'function'
            ? menu.id ? selectors.reset(menu.id) : '[data-settings-reset]'
            : selectors.reset ?? '[data-settings-reset]';
        new SettingsMenu(root, menu, {
            inputs: selectors.inputs,
            pathAttr: selectors.pathAttr,
            resetButton: resetSelector,
        });
        const scrollToMenu = () => menu.scrollIntoView({
            behavior: scrollBehaviour ?? 'auto',
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
            toggle: selectors?.toggle
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
            if (event?.relatedTarget &&
                !menu.contains(event.relatedTarget)) {
                resetButton.focus();
            }
        };
        const resetBlur = (event) => {
            if (event?.relatedTarget &&
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
        const rootElement = document.querySelector(selectors?.root || ':root');
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
