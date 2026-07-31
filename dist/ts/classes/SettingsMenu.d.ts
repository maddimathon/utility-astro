/**
 * @since 0.1.0-alpha
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-astro@0.1.0-beta.0.draft
 * @license MIT
 */
/**
 * Sets up and manages the SettingsMenu component's js.
 *
 * @since 0.1.0-alpha
 */
export declare class SettingsMenu {
    #private;
    /**
     * @since 0.1.0-alpha
     */
    readonly menu: HTMLElement;
    /**
     * @param menu  The website settings menu wrapper to set up.
     */
    constructor(
    /**
     * @since 0.1.0-beta.0.draft
     */
    target: HTMLHtmlElement | HTMLBodyElement, 
    /**
     * @since 0.1.0-alpha
     */
    menu: HTMLElement, 
    /**
     * @since 0.1.0-alpha
     */
    selectors?: SettingsMenu.Selectors.Constructor);
    /**
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Made async.
     */
    private _setup_attr_key;
    /**
     * Triggered by a click lisetener.
     *
     * @since 0.1.0-alpha
     */
    resetButtonClicked(): void;
    /**
     * A callback for when an input is selected.
     *
     * @since 0.1.0-alpha
     */
    settingSelected(input: HTMLInputElement): void;
    /**
     * @since 0.1.0-alpha
     */
    update_allInputs(): void;
    /**
     * Prepares single inputs and sets its current values.
     *
     * @since 0.1.0-beta.0.draft
     */
    protected _update_input(input: HTMLInputElement): Promise<void>;
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
    function init(settingsMenus: HTMLElement | NodeListOf<HTMLElement>, scrollBehaviour?: ScrollBehavior, selectors?: SettingsMenu.Selectors.Mapper): Promise<void | void[]>;
    /**
     * @since 0.1.0-beta.0.draft
     */
    namespace Selectors {
        /**
         * @since 0.1.0-beta.0.draft
         */
        interface Constructor {
            inputs?: undefined | string;
            pathAttr?: undefined | string;
            resetButton?: undefined | string;
        }
        /**
         * @since 0.1.0-alpha
         * @since 0.1.0-beta.0.draft — Moved out of constructor to separate definition.
         */
        interface Mapper extends Omit<Constructor, 'resetButton'> {
            /**
             * @default
             * '[data-settings-reset]'
             *
             * @since 0.1.0-alpha
             */
            reset?: undefined | string | ((menuID?: string) => string);
            /**
             * The element on which to set settings attributes. Probably ':root' or 'body'.
             *
             * @default ':root'
             *
             * @since 0.1.0-beta.0.draft
             */
            target?: undefined | string;
            /**
             * @default
             * `button[data-toggle-control=${ menuID }]`
             *
             * @since 0.1.0-alpha
             */
            toggle?: undefined | string | ((menuID?: string) => string);
        }
    }
}
