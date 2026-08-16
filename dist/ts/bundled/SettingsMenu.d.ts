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
    readonly cookieNamer: (attr: string) => string;
    /**
     * @since 0.1.0-beta.0.draft
     */
    readonly opts: SettingsMenu.Opts<SettingsMenu.Selectors.Constructor> & {
        path: string;
    };
    /**
     * Sets up a new instance.
     */
    static new(
    /**
     * The element on which to update data attributes to reflect settings values.
     */
    target: HTMLHtmlElement | HTMLBodyElement, 
    /**
     * The container containing all fieldsets in inputs for this menu.
     */
    menu: HTMLElement, { scrollBehaviour, cookieNamer, ...opts }?: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Constructor>> & {
        cookieNamer?: (attr: string) => string;
        scrollBehaviour?: ScrollBehavior;
    }): Promise<undefined | SettingsMenu>;
    /**
     * @since 0.1.0-alpha
     */
    readonly menu: HTMLElement;
    /**
     * Not to be used directly. Use {@link SettingsMenu.new} instead.
     */
    protected constructor(
    /**
     * @since 0.1.0-alpha
     * @since 0.1.0-beta.0.draft — Is now an object accepting many elements.
     */
    elements: {
        inputs: HTMLInputElement[];
        menu: HTMLElement;
        resetButton: HTMLButtonElement | null;
        target: HTMLHtmlElement | HTMLBodyElement;
    }, cookieNamer: (attr: string) => string, 
    /**
     * @since 0.1.0-beta.0.draft
     */
    opts: SettingsMenu.Opts<SettingsMenu.Selectors.Constructor> & {
        path: string;
    });
    /**
     * @since 0.1.0-beta.0.draft
     */
    private _set_default;
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
    update_allInputs(): Promise<void>;
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
     * @since 0.1.0-beta.0.draft — Renamed from init to run. Changed third param from selector to opts (which contains selectors).
     */
    function run(settingsMenus: HTMLElement | NodeListOf<HTMLElement>, scrollBehaviour?: ScrollBehavior, { targetElement, ...opts }?: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Mapper>> & {
        cookieNamer?: (attr: string) => string;
        targetElement?: HTMLHtmlElement | HTMLBodyElement | null;
    }): Promise<SettingsMenu[]>;
    /**
     * Adds a 'load' event listener that then {@link SettingsMenu.run}, querying
     * the document for settings menu containers to set them up as instances of
     * this class.
     *
     * @since 0.1.0-beta.0.draft
     */
    function runOnLoad(opts?: Partial<SettingsMenu.Opts<SettingsMenu.Selectors.Mapper>>, attrsToSet?: string[]): Promise<void>;
    /**
     * Options for the configuration of {@link SettingsMenu} instances.
     *
     * @since 0.1.0-beta.0.draft
     */
    interface Opts<T_Selectors extends SettingsMenu.Selectors.Constructor | SettingsMenu.Selectors.Mapper> {
        /**
         * Whether to create a cookie that caches the detected default value.
         *
         * @default 7
         *
         * @since 0.1.0-beta.0.draft
         */
        cookieCacheExpireDays: number;
        /**
         * A prefix to use before cookie names when storing the settings values.
         *
         * @since 0.1.0-beta.0.draft
         */
        cookiePrefix: string;
        /**
         * Outputs information to the console.
         *
         * @since 0.1.0-beta.0.draft
         */
        debug?: undefined | boolean;
        /**
         * Whether to create a cookie that caches the detected default value.
         *
         * @since 0.1.0-beta.0.draft
         */
        defaultCookieCache: boolean;
        /**
         * Whether to output the results of constructing each toggle element as
         * it is made.
         *
         * @since 0.1.0-beta.0.draft
         */
        logResults?: undefined | boolean;
        selectors?: undefined | T_Selectors;
    }
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
