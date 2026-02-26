/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.18
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
    #attributeKeys = [];
    #rootElement;
    /**
     * For storing the cookies made to deal with each option.
     */
    #cookies = {};
    /**
     * For storing the default value (if any) for each option.
     */
    #defaults = {};
    #inputs;
    #path;
    #resetButton;
    #timeout = null;
    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    constructor(menu, selectors) {
        this.menu = menu;
        this.#rootElement = document.querySelector(selectors?.root || ':root');
        this.#resetButton = this.menu.querySelector(selectors?.resetButton || '[data-settings-reset]');
        this.#path = this.menu.getAttribute(selectors?.pathAttr || 'data-settings-path') || '/';
        this.#inputs = this.menu.querySelectorAll(selectors?.inputs || 'input[data-settings-input]');
        if (!this.#resetButton || !this.#inputs) {
            return;
        }
        this.resetButtonClicked = this.resetButtonClicked.bind(this);
        this.settingSelected = this.settingSelected.bind(this);
        this.update_allInputs = this.update_allInputs.bind(this);
        this._update_allInputs = this._update_allInputs.bind(this);
        /*
         * Adding change event listener and collecting attribute names.
         */
        this.update_allInputs();
        this.#inputs.forEach((input) => {
            input.addEventListener('change', () => this.settingSelected(input));
        });
        /*
         * Add reset button listener.
         */
        this.#resetButton.addEventListener('click', this.resetButtonClicked);
    }
    _setup_attr_key(attr) {
        let defaultValue = null;
        switch (attr) {
            case 'brightness-mode':
                window
                    .matchMedia(`( prefers-color-scheme: light )`)
                    .addEventListener('change', this.update_allInputs);
                ['light', 'dark'].forEach((value) => {
                    if (window.matchMedia(`( prefers-color-scheme: ${value} )`).matches) {
                        defaultValue = value;
                    }
                });
                break;
            case 'contrast-mode':
                window
                    .matchMedia(`( prefers-contrast: more )`)
                    .addEventListener('change', this.update_allInputs);
                defaultValue = 'average';
                if (window.matchMedia(`( prefers-contrast: less )`).matches) {
                    defaultValue = 'low';
                }
                else if (window.matchMedia(`( prefers-contrast: more )`).matches) {
                    defaultValue = 'high';
                }
                if (window.matchMedia(`( forced-colors: active )`)
                    .matches ||
                    window.matchMedia(`( prefers-contrast: custom )`)
                        .matches) {
                    defaultValue = 'forced-colors';
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
        if (this.#attributeKeys.includes(attr) || this.#cookies[attr]) {
            return;
        }
        this.#attributeKeys.push(attr);
        this.#cookies[attr] = new JsCookie(attr, this.#path, null, null);
    }
    /**
     * Triggered by a click lisetener.
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
    update_allInputs() {
        this.#inputs?.forEach((input) => {
            input.checked = false;
        });
        // fixes issues about reselecting updated values after settings
        // reset and quick-triggered event listeners
        this.#timeout && clearTimeout(this.#timeout);
        this.#timeout = setTimeout(this._update_allInputs, 100);
    }
    /**
     * Inner logic for SettingsMenu.update_allInputs (so it can be passed to a
     * timeout).
     */
    _update_allInputs() {
        for (const input of Array.from(this.#inputs ?? [])) {
            const attr = input.getAttribute('name');
            if (!attr) {
                continue;
            }
            this._setup_attr_key(attr);
            const value = input.getAttribute('value');
            if (!value) {
                continue;
            }
            const current = this.#cookies[attr]?.get() ?? this.#defaults[attr] ?? null;
            if (!current) {
                continue;
            }
            if (`${value}` == `${current}`) {
                input.checked = true;
                this.#rootElement.setAttribute(`data-${attr}`, current);
            }
            else {
                input.checked = false;
            }
        }
    }
}
/**
 * Utilities for the {@link SettingsMenu} class.
 *
 * @since 0.1.0-alpha
 */
(function (SettingsMenu) {
    /**
     * Initializes the given settings menu(s).
     *
     * @since 0.1.0-alpha
     */
    async function init(settingsMenus, scrollBehaviour = 'auto', selectors) {
        const mapper = async (menu) => {
            new SettingsMenu(menu);
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
                reset: selectors?.reset
                    ? (typeof selectors.reset === 'function'
                        ? selectors.reset(menuID)
                        : selectors.reset)
                    : '[data-settings-reset]',
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
        };
        const menuArray = typeof settingsMenus.forEach === 'function'
            ? Array.from(settingsMenus)
            : [settingsMenus];
        return Promise.all(menuArray.map(mapper));
    }
    SettingsMenu.init = init;
})(SettingsMenu || (SettingsMenu = {}));
//# sourceMappingURL=SettingsMenu.js.map