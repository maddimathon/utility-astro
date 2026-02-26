/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-alpha.19
 * @license MIT
 */
/**
 * Sets up and manages the SettingsMenu component's js.
 *
 * @since 0.1.0-alpha
 */
export declare class SettingsMenu {
    #private;
    readonly menu: HTMLElement;
    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    constructor(menu: HTMLElement, selectors?: {
        root?: string;
        resetButton?: string;
        pathAttr?: string;
        inputs?: string;
    });
    private _setup_attr_key;
    /**
     * Triggered by a click lisetener.
     */
    resetButtonClicked(): void;
    /**
     * A callback for when an input is selected.
     */
    settingSelected(input: HTMLInputElement): void;
    update_allInputs(): void;
    /**
     * Inner logic for SettingsMenu.update_allInputs (so it can be passed to a
     * timeout).
     */
    _update_allInputs(): void;
}
/**
 * Utilities for the {@link SettingsMenu} class.
 *
 * @since 0.1.0-alpha
 */
export declare namespace SettingsMenu {
    /**
     * Initializes the given settings menu(s).
     *
     * @since 0.1.0-alpha
     */
    function init(settingsMenus: HTMLElement | NodeListOf<HTMLElement>, scrollBehaviour?: ScrollBehavior, selectors?: {
        /**
         * @default
         * '[data-settings-reset]'
         */
        reset?: string | ((menuID?: string) => string);
        /**
         * @default
         * `button[data-toggle-control=${ menuID }]`
         */
        toggle?: string | ((menuID?: string) => string);
    }): Promise<void[]>;
}
//# sourceMappingURL=SettingsMenu.d.ts.map